import { test, expect, type Page } from "@playwright/test";
import { addDays, koreaToday } from "../../src/domain/dates";

const api = process.env.NAEUL_TEST_API === "1";
const date = addDays(koreaToday(), 1); // 언제 실행하더라도 과거 날짜에 의존하지 않습니다.
async function chooseDate(page: Page, value = date) {
  // 월말에는 다음 달 버튼을 눌러야 내일 날짜가 보입니다.
  if (value.slice(0, 7) !== koreaToday().slice(0, 7))
    await page.getByRole("button", { name: "다음 달" }).click();
  await page
    .getByRole("button", { name: `${value} 날짜 선택`, exact: true })
    .click();
}
test("홈 → 진료 → 달력 → 확인 → 데모 결과, 네 탭 연결", async ({ page }) => {
  test.skip(api);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByText("나을 한의원", { exact: true })).toBeVisible();
  await page.screenshot({ path: "test-results/home.png", fullPage: true });
  await page.getByRole("button", { name: "진료 예약", exact: true }).click();
  await page.getByRole("button", { name: /교통사고 진료/ }).click();
  await expect(
    page.getByRole("button", { name: "선택한 예약 확인" }),
  ).toBeDisabled();
  await chooseDate(page);
  await expect(
    page.getByRole("button", { name: "12:30 예약 불가" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "10:00 시간 선택" }).click();
  await page.screenshot({ path: "test-results/date.png", fullPage: true });
  await page.getByRole("button", { name: "선택한 예약 확인" }).click();
  await expect(page.getByText("진료 과목: 교통사고 진료")).toBeVisible();
  await page.getByRole("button", { name: "데모 예약 신청" }).click();
  await expect(page.getByText("데모 신청 완료", { exact: true })).toBeVisible();
  await expect(page.getByText("직원 확인 대기")).toBeVisible();
  await page.screenshot({ path: "test-results/success.png", fullPage: true });
  await page.getByRole("button", { name: "홈으로" }).click();
  await page.getByRole("tab", { name: /진료 정보/ }).click();
  await expect(page.getByText("나을한의원 진료 안내")).toBeVisible();
  await page.getByRole("tab", { name: /마이페이지/ }).click();
  await expect(
    page.getByText("예약 내역과 회원정보 관리는 준비 중입니다."),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("직접 확인 URL을 열면 입력 단계로 돌아간다", async ({ page }) => {
  test.skip(api);
  await page.goto("/reservation/confirm");
  await expect(page.getByText("원하시는 진료를 선택해주세요.")).toBeVisible();
});
test("실제 모드: 서버 ID, 로그인, 409, 재선택 후 PENDING 응답", async ({
  page,
}) => {
  test.skip(!api);
  const posts: {
    data: Record<string, unknown>;
    authorization?: string;
    key?: string;
  }[] = [];
  await page.route("http://localhost:3999/**", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const headers = {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
    };
    if (request.method() === "OPTIONS") {
      await route.fulfill({ status: 204, headers });
      return;
    }
    let body: unknown;
    let status = 200;
    if (url.pathname === "/clinic-categories")
      body = [{ id: 82, name: "서버 통증 치료", description: "실제 ID 검증" }];
    else if (url.pathname === "/auth/login")
      body = { accessToken: "test-access-token" };
    else if (url.pathname === "/appointments/available-slots") {
      expect(url.searchParams.get("clinicCategoryId")).toBe("82");
      body = ["10:00", "10:30"].map((time) => ({
        appointmentAt: `${url.searchParams.get("date")}T${time}:00+09:00`,
        isAvailable: true,
      }));
    } else {
      posts.push({
        data: request.postDataJSON(),
        authorization: request.headers().authorization,
        key: request.headers()["idempotency-key"],
      });
      status = posts.length === 1 ? 409 : 201;
      body =
        status === 409
          ? { message: "conflict" }
          : { id: 123, ...request.postDataJSON(), status: "PENDING" };
    }
    await route.fulfill({
      status,
      headers,
      contentType: "application/json",
      body: JSON.stringify(body),
    });
  });
  await page.goto("/reservation");
  await page.getByRole("button", { name: /서버 통증 치료/ }).click();
  await chooseDate(page);
  await page.getByRole("button", { name: "10:00 시간 선택" }).click();
  await page.getByRole("button", { name: "선택한 예약 확인" }).click();
  await page.getByRole("button", { name: "예약 신청", exact: true }).click();
  await expect(page.getByText("예약 신청하려면 로그인해주세요.")).toBeVisible();
  expect(posts).toHaveLength(0);
  await page.getByRole("button", { name: "로그인하기" }).click();
  await page.getByRole("textbox", { name: "이메일" }).fill("test@example.com");
  await page.getByLabel("비밀번호", { exact: true }).fill("test-password");
  await page.getByRole("button", { name: "로그인", exact: true }).click();
  await page.getByRole("button", { name: "예약 신청", exact: true }).click();
  await expect(
    page.getByText("선택한 시간에 예약할 수 없습니다. 새 시간을 선택해주세요."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "선택한 예약 확인" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "10:30 시간 선택" }).click();
  await page.getByRole("button", { name: "선택한 예약 확인" }).click();
  await page.getByRole("button", { name: "예약 신청", exact: true }).click();
  await expect(page.getByText("직원 확인 대기")).toBeVisible();
  expect(posts).toHaveLength(2);
  expect(posts[1].data).toEqual({
    clinicCategoryId: 82,
    appointmentAt: `${date}T10:30:00+09:00`,
  });
  expect(posts[1].authorization).toBe("Bearer test-access-token");
  expect(posts[1].key).toBeTruthy();
  expect(posts[0].key).not.toBe(posts[1].key);
});
