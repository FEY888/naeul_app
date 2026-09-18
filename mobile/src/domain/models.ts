// interface는 API와 화면 사이에서 주고받는 데이터의 모양을 정의합니다.
export interface ClinicCategory {
  id: number; // 실제 API 모드에서는 서버가 내려준 DB 식별자를 그대로 사용합니다.
  name: string;
  description: string;
}
export interface TimeSlot {
  appointmentAt: string; // 시간대가 포함된 ISO 8601 문자열: 2026-09-19T10:00:00+09:00
  isAvailable: boolean;
}
export interface CreateAppointment {
  clinicCategoryId: number;
  appointmentAt: string;
  // userId와 status는 보내지 않습니다. 서버가 JWT 사용자와 PENDING 상태를 결정합니다.
}
export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED";
export interface Appointment extends CreateAppointment {
  id: string | number;
  status: AppointmentStatus;
}
// Flutter TimeRepository처럼 UI가 구현체 대신 이 계약에 의존합니다.
export interface ClinicRepository {
  getCategories(signal?: AbortSignal): Promise<ClinicCategory[]>;
  getSlots(
    categoryId: number,
    date: string,
    signal?: AbortSignal,
  ): Promise<TimeSlot[]>;
  createAppointment(
    input: CreateAppointment,
    requestId: string,
  ): Promise<Appointment>;
}
