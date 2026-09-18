import { useRef, useState } from "react";
import { Text } from "react-native";
import { Redirect, router } from "expo-router";
import { ApiError } from "../../../src/api/client";
import { clinicRepository } from "../../../src/api/repository";
import { tokenStore } from "../../../src/api/token-store";
import { config } from "../../../src/config";
import { useBooking } from "../../../src/state/BookingContext";
import { formatAppointment, isBookingDate } from "../../../src/domain/dates";
import {
  BookingHeader,
  Body,
  Button,
  Card,
  DemoNotice,
  Screen,
  styles,
} from "../../../src/components/ui";

export default function ConfirmScreen() {
  const { draft, complete, clearTime } = useBooking();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);
  const submitting = useRef(false); // setState의 렌더링 이전에 들어온 두 번째 클릭도 막습니다.
  if (!draft.category || !draft.date || !draft.appointmentAt)
    return <Redirect href="/reservation" />;
  async function submit() {
    if (
      submitting.current ||
      !draft.category ||
      !draft.date ||
      !draft.appointmentAt
    )
      return;
    submitting.current = true;
    setBusy(true);
    setError("");
    setNeedsLogin(false);
    try {
      if (
        !isBookingDate(draft.date) ||
        Date.parse(draft.appointmentAt) <= Date.now()
      )
        throw new ApiError(409, "예약 시간을 다시 선택해주세요.");
      if (!config.demo && !(await tokenStore.get()))
        throw new ApiError(401, "예약 신청하려면 로그인해주세요.");
      const receipt = await clinicRepository.createAppointment(
        {
          clinicCategoryId: draft.category.id,
          appointmentAt: draft.appointmentAt,
        },
        draft.requestId,
      ); // 입력이 같으면 실패 후 재시도에도 같은 멱등 키를 보냅니다.
      complete(receipt);
      router.replace("/reservation/success");
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 409) {
        clearTime();
        router.replace({
          pathname: "/reservation/date",
          params: { conflict: "1" },
        });
      } else {
        setError(
          cause instanceof Error ? cause.message : "예약 신청에 실패했습니다.",
        );
        setNeedsLogin(cause instanceof ApiError && cause.status === 401);
      }
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }
  return (
    <Screen>
      <BookingHeader step={3} title="예약 내용 확인" />
      <DemoNotice />
      <Card>
        <Body>진료 과목: {draft.category.name}</Body>
        <Body>예약 시간: {formatAppointment(draft.appointmentAt)}</Body>
      </Card>
      <Body>
        신청 후 직원이 확인하여 예약을 확정합니다. 신청만으로 진료 시간이
        확정되지는 않습니다.
      </Body>
      {!!error && (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      )}
      {needsLogin && (
        <Button
          title="로그인하기"
          secondary
          onPress={() => router.push("/login")}
        />
      )}
      <Button
        title={config.demo ? "데모 예약 신청" : "예약 신청"}
        loading={busy}
        onPress={submit}
      />
      <Button
        title="날짜 · 시간 수정"
        disabled={busy}
        secondary
        onPress={() => router.replace("/reservation/date")}
      />
    </Screen>
  );
}
