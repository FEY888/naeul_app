import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { randomUUID } from "expo-crypto";
import type { Appointment, ClinicCategory } from "../domain/models";

interface Draft {
  category: ClinicCategory | null;
  date: string | null;
  appointmentAt: string | null;
  requestId: string;
}
const emptyDraft = (): Draft => ({
  category: null,
  date: null,
  appointmentAt: null,
  requestId: randomUUID(),
});
interface BookingState {
  draft: Draft;
  receipt: Appointment | null;
  selectCategory(category: ClinicCategory): void;
  selectDate(date: string): void;
  selectTime(appointmentAt: string): void;
  clearTime(): void;
  complete(receipt: Appointment): void;
  reset(): void;
}
const BookingContext = createContext<BookingState | null>(null);
export function BookingProvider({ children }: PropsWithChildren) {
  const [draft, setDraft] = useState<Draft>(emptyDraft); // 여러 예약 화면이 공유할 입력값입니다.
  const [receipt, setReceipt] = useState<Appointment | null>(null);
  return (
    <BookingContext.Provider
      value={{
        draft,
        receipt,
        selectCategory: (category) => {
          setReceipt(null);
          setDraft({ ...emptyDraft(), category });
        },
        selectDate: (date) =>
          setDraft((v) => ({
            ...v,
            date,
            appointmentAt: null,
            requestId: randomUUID(),
          })),
        selectTime: (appointmentAt) =>
          setDraft((v) => ({ ...v, appointmentAt, requestId: randomUUID() })),
        clearTime: () =>
          setDraft((v) => ({
            ...v,
            appointmentAt: null,
            requestId: randomUUID(),
          })),
        complete: (value) => {
          setReceipt(value);
          setDraft(emptyDraft());
        }, // 완료 후 뒤로 가서 재전송할 수 없게 합니다.
        reset: () => {
          setDraft(emptyDraft());
          setReceipt(null);
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
export function useBooking(): BookingState {
  const value = useContext(BookingContext);
  if (!value) throw new Error("BookingProvider 안에서 사용해야 합니다.");
  return value;
}
