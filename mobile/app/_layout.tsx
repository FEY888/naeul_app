import { Stack } from "expo-router"; // 파일 경로를 기준으로 네이티브 화면 이동을 구성합니다.
import { StatusBar } from "expo-status-bar";
import { BookingProvider } from "../src/state/BookingContext";
import { colors } from "../src/theme";

export default function RootLayout() {
  return (
    <BookingProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="login"
          options={{
            headerShown: true,
            title: "로그인",
            headerBackTitle: "뒤로",
          }}
        />
      </Stack>
    </BookingProvider>
  );
}
