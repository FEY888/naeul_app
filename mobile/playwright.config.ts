import { defineConfig, devices } from "@playwright/test";

// NAEUL_TEST_API=1이면 HTTP 대역을 사용하는 서버 모드를 검증합니다.
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45000,
  workers: 1,
  use: {
    ...devices["iPhone 13"],
    defaultBrowserType: "chromium",
    baseURL: "http://localhost:8081",
    trace: "retain-on-failure",
    // 제한된 CI에서는 이미 설치된 Chromium 경로를 지정할 수 있습니다.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, args: ["--no-sandbox", "--disable-dev-shm-usage"] }
      : {},
  },
  webServer: {
    command: "npx expo start --web --offline --port 8081",
    url: "http://localhost:8081",
    timeout: 120000,
    reuseExistingServer: false,
    env: {
      CI: "1",
      EXPO_PUBLIC_USE_MOCK:
        process.env.NAEUL_TEST_API === "1" ? "false" : "true",
      EXPO_PUBLIC_API_URL: "http://localhost:3999",
    },
  },
});
