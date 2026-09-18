import { Redirect, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons"; // 사용하는 아이콘 세트만 가져와 번들 크기를 줄입니다.
import { useBooking } from "../../../src/state/BookingContext";
import {
  BookingHeader,
  Body,
  Button,
  Card,
  DemoNotice,
  Screen,
} from "../../../src/components/ui";
import { formatAppointment } from "../../../src/domain/dates";
import { colors } from "../../../src/theme";
import { config } from "../../../src/config";

export default function SuccessScreen() {
  const { receipt, reset } = useBooking();
  if (!receipt) return <Redirect href="/reservation" />;
  const labels = {
    PENDING: "직원 확인 대기",
    CONFIRMED: "예약 확정",
    REJECTED: "예약 거절",
    CANCELLED: "예약 취소",
  };
  return (
    <Screen>
      <BookingHeader
        step={4}
        title={config.demo ? "데모 신청 완료" : "예약 신청 결과"}
      />
      <DemoNotice />
      <Card>
        <Ionicons
          name="checkmark-circle-outline"
          size={52}
          color={colors.primary}
        />
        <Body>{labels[receipt.status]}</Body>
        <Body>{formatAppointment(receipt.appointmentAt)}</Body>
        <Body>
          {config.demo
            ? "화면 흐름을 체험했습니다. 한의원에는 접수되지 않았습니다."
            : "예약 상태를 확인해 주세요. 대기 상태라면 직원 확인 후 확정됩니다."}
        </Body>
      </Card>
      <Button
        title="홈으로"
        onPress={() => {
          reset();
          router.replace("/");
        }}
      />
    </Screen>
  );
}
