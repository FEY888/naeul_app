import { Stack } from "expo-router";
// 탭 안에 Stack을 두므로 예약 단계를 이동해도 하단 탭이 유지됩니다.
export default function ReservationLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
