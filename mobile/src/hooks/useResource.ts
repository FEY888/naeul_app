import { useEffect, useState } from "react";

// Flutter FutureProvider에 대응하는 작은 조회 hook입니다. 서버 캐시가 필요해질 때 확장합니다.
export function useResource<T>(loader: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<{
    data?: T;
    error?: string;
    loading: boolean;
  }>({ loading: true });
  const [version, setVersion] = useState(0); // 재시도 버튼이 이 값을 변경하면 effect가 다시 실행됩니다.
  useEffect(() => {
    const controller = new AbortController();
    setState({ loading: true }); // 이전 날짜의 시간 목록을 새 날짜에 노출하지 않습니다.
    loader(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setState({ data, loading: false });
      },
      (error) => {
        if (!controller.signal.aborted)
          setState({
            error:
              error instanceof Error ? error.message : "조회에 실패했습니다.",
            loading: false,
          });
      },
    );
    return () => controller.abort(); // 늦게 도착한 이전 요청이 최신 화면을 덮어쓰지 못하게 합니다.
  }, [loader, version]); // 호출하는 화면에서 useCallback으로 loader의 참조를 유지해야 합니다.
  return { ...state, retry: () => setVersion((v) => v + 1) };
}
