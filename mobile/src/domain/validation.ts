import type { Appointment, ClinicCategory, TimeSlot } from "./models";

function invalidResponse(): never {
  throw new Error("서버 응답 형식이 앱의 API 계약과 다릅니다.");
}
function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
// TypeScript 타입만으로 서버 JSON을 검증할 수 없으므로 경계에서 필수 필드를 확인합니다.
export function parseCategories(value: unknown): ClinicCategory[] {
  if (
    !Array.isArray(value) ||
    !value.every(
      (v) =>
        object(v) &&
        Number.isInteger(v.id) &&
        Number(v.id) > 0 &&
        typeof v.name === "string" &&
        typeof v.description === "string",
    )
  )
    invalidResponse();
  return value as ClinicCategory[];
}
export function parseSlots(value: unknown): TimeSlot[] {
  if (
    !Array.isArray(value) ||
    !value.every(
      (v) =>
        object(v) &&
        typeof v.appointmentAt === "string" &&
        /(Z|[+-]\d{2}:\d{2})$/.test(v.appointmentAt) &&
        Number.isFinite(Date.parse(v.appointmentAt)) &&
        typeof v.isAvailable === "boolean",
    )
  )
    invalidResponse();
  return value as TimeSlot[];
}
export function parseAppointment(value: unknown): Appointment {
  if (
    !object(value) ||
    !["string", "number"].includes(typeof value.id) ||
    !Number.isInteger(value.clinicCategoryId) ||
    typeof value.appointmentAt !== "string" ||
    !Number.isFinite(Date.parse(value.appointmentAt)) ||
    !["PENDING", "CONFIRMED", "REJECTED", "CANCELLED"].includes(
      String(value.status),
    )
  )
    invalidResponse();
  return value as unknown as Appointment;
}
