import { config } from "../config";
import { demoCategories } from "../data/content";
import { isBookingDate } from "../domain/dates";
import type {
  Appointment,
  ClinicCategory,
  ClinicRepository,
  TimeSlot,
} from "../domain/models";
import { ApiError, request } from "./client";

import {
  parseCategories,
  parseSlots,
  parseAppointment,
} from "../domain/validation";

export const apiRepository: ClinicRepository = {
  async getCategories(signal) {
    return parseCategories(
      await request<unknown>("/clinic-categories", { signal }),
    );
  },
  async getSlots(categoryId, date, signal) {
    return parseSlots(
      await request<unknown>(
        `/appointments/available-slots?clinicCategoryId=${categoryId}&date=${encodeURIComponent(date)}`,
        { signal },
      ),
    );
  },
  async createAppointment(input, requestId) {
    return parseAppointment(
      await request<unknown>("/appointments", {
        method: "POST",
        body: JSON.stringify(input),
        headers: { "Idempotency-Key": requestId },
      }),
    ); // 서버도 이 키를 저장·재사용해야 네트워크 재시도로 인한 중복 생성을 막습니다.
  },
};
const demoRequests = new Map<string, Appointment>(); // 데모는 메모리에만 저장됩니다.
export const mockRepository: ClinicRepository = {
  async getCategories() {
    return demoCategories;
  },
  async getSlots(_categoryId, date) {
    if (!isBookingDate(date)) return [];
    // 진료시간은 실제 운영표가 아닌 UI 학습용입니다. 서버 모드에서는 서버 슬롯만 사용합니다.
    return Array.from({ length: 16 }, (_, index) => {
      const hour = 10 + Math.floor(index / 2);
      const minute = index % 2 === 0 ? "00" : "30";
      const appointmentAt = `${date}T${hour}:${minute}:00+09:00`;
      return {
        appointmentAt,
        isAvailable:
          ![5, 6, 13].includes(index) && Date.parse(appointmentAt) > Date.now(),
      };
    });
  },
  async createAppointment(input, requestId) {
    const previous = demoRequests.get(requestId);
    if (previous) return previous; // 같은 신청을 재시도하면 같은 응답을 돌려줍니다.
    const slots = await mockRepository.getSlots(
      input.clinicCategoryId,
      input.appointmentAt.slice(0, 10),
    );
    if (
      !demoCategories.some((v) => v.id === input.clinicCategoryId) ||
      !slots.some(
        (v) => v.appointmentAt === input.appointmentAt && v.isAvailable,
      )
    ) {
      throw new ApiError(409, "다른 예약 시간을 선택해 주세요.");
    }
    const appointment: Appointment = {
      ...input,
      id: `demo-${requestId}`,
      status: "PENDING",
    };
    demoRequests.set(requestId, appointment);
    return appointment;
  },
};
// 의존성 교체 지점은 한 곳입니다. 화면 컴포넌트는 mock/API 여부를 몰라도 조회할 수 있습니다.
export const clinicRepository = config.demo ? mockRepository : apiRepository;
