import assert from "node:assert/strict";
import test from "node:test";
import {
  addDays,
  isBookingDate,
  koreaToday,
  formatTime,
} from "../src/domain/dates";
import {
  parseCategories,
  parseSlots,
  parseAppointment,
} from "../src/domain/validation";

test("UTC 오후 3시부터 한국 날짜는 다음 날이다", () => {
  assert.equal(koreaToday(new Date("2026-09-18T14:59:59Z")), "2026-09-18");
  assert.equal(koreaToday(new Date("2026-09-18T15:00:00Z")), "2026-09-19");
});
test("예약은 한국 오늘부터 60일 후까지이며 연말도 처리한다", () => {
  const now = new Date("2026-12-31T01:00:00Z");
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(isBookingDate("2026-12-30", now), false);
  assert.equal(isBookingDate("2026-12-31", now), true);
  assert.equal(isBookingDate(addDays("2026-12-31", 60), now), true);
  assert.equal(isBookingDate(addDays("2026-12-31", 61), now), false);
  assert.equal(isBookingDate("2027-02-30", now), false);
});
test("서버 UTC 시간은 한국 시간으로 표시한다", () => {
  assert.equal(formatTime("2026-09-19T01:30:00Z"), "10:30");
});
test("실제 서버 ID를 보존하고 잘못된 카테고리 응답은 거부한다", () => {
  assert.equal(
    parseCategories([{ id: 82, name: "통증", description: "상담" }])[0].id,
    82,
  );
  assert.throws(() => parseCategories({ data: [] }));
  assert.throws(() => parseCategories([{ id: "82", name: "통증" }]));
});
test("시간대 없는 슬롯과 잘못된 시간 문자열을 거부한다", () => {
  assert.throws(() =>
    parseSlots([{ appointmentAt: "2026-09-19T10:00:00", isAvailable: true }]),
  );
  assert.throws(() =>
    parseSlots([{ appointmentAt: "잘못된값Z", isAvailable: true }]),
  );
  assert.equal(
    parseSlots([
      { appointmentAt: "2026-09-19T10:00:00+09:00", isAvailable: false },
    ])[0].isAvailable,
    false,
  );
});
test("예약 결과는 정의된 상태와 필수 필드를 가진다", () => {
  const receipt = {
    id: 1,
    clinicCategoryId: 82,
    appointmentAt: "2026-09-19T10:00:00+09:00",
    status: "PENDING",
  };
  assert.equal(parseAppointment(receipt).status, "PENDING");
  assert.throws(() => parseAppointment({ ...receipt, status: "SUCCESS" }));
  assert.throws(() => parseAppointment({ message: "ok" }));
});
