// Expo는 EXPO_PUBLIC_ 값을 앱에 포함합니다. URL은 괜찮지만 JWT/DB 비밀번호는 넣지 않습니다.
export const config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "") ?? "",
  // 서버 연결은 명시적으로 false를 설정했을 때만 활성화됩니다.
  demo: process.env.EXPO_PUBLIC_USE_MOCK !== "false",
  phone: process.env.EXPO_PUBLIC_CLINIC_PHONE ?? "", // 실제 번호를 확인하고 설정합니다.
};
