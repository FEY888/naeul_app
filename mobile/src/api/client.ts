import { config } from "../config";
import { tokenStore } from "./token-store";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message); // Error의 message를 초기화합니다. 화면은 status로 401/409를 구분합니다.
  }
}
// fetch는 React Native에 기본 제공되므로 이 규모에서는 Axios를 추가하지 않습니다.
export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!config.apiUrl) throw new ApiError(0, "서버 주소가 설정되지 않았습니다.");
  const controller = new AbortController(); // 요청 제한 시간과 화면 이탈 시 취소를 처리합니다.
  const abort = () => controller.abort();
  if (options.signal?.aborted) abort();
  options.signal?.addEventListener("abort", abort);
  const timer = setTimeout(abort, 12000);
  try {
    const token = await tokenStore.get();
    const headers = new Headers(options.headers);
    headers.set("Accept", "application/json");
    if (options.body) headers.set("Content-Type", "application/json");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    const response = await fetch(`${config.apiUrl}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
    if (!response.ok) {
      if (response.status === 401) {
        await tokenStore.clear();
        throw new ApiError(
          401,
          "로그인이 필요하거나 만료되었습니다. 다시 로그인해 주세요.",
        );
      }
      if (response.status === 409)
        throw new ApiError(
          409,
          "선택한 시간에 예약할 수 없습니다. 시간을 다시 선택해 주세요.",
        );
      // 내부 SQL/스택 등 서버의 민감한 오류 원문은 화면에 그대로 노출하지 않습니다.
      throw new ApiError(
        response.status,
        response.status === 400
          ? "입력 내용을 확인해 주세요."
          : "서버 요청에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      );
    }
    return (await response.json()) as T; // 실제 응답 검증은 repository에서 수행합니다.
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (options.signal?.aborted) throw error; // 화면이 사라진 요청은 hook이 무시합니다.
    throw new ApiError(0, "네트워크 연결 또는 서버 응답을 확인해 주세요.");
  } finally {
    clearTimeout(timer); // 성공·실패와 관계없이 타이머를 정리합니다.
    options.signal?.removeEventListener("abort", abort);
  }
}
