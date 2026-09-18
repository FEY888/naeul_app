import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { clinicRepository } from "../../../src/api/repository";
import { useResource } from "../../../src/hooks/useResource";
import { useBooking } from "../../../src/state/BookingContext";
import { BookingCalendar } from "../../../src/components/BookingCalendar";
import {
  BookingHeader,
  Body,
  Button,
  DemoNotice,
  ResourceState,
  Screen,
  Title,
} from "../../../src/components/ui";
import { formatTime, isBookingDate } from "../../../src/domain/dates";
import { colors } from "../../../src/theme";

export default function DateScreen() {
  const { draft, selectDate, selectTime } = useBooking();
  const { conflict } = useLocalSearchParams<{ conflict?: string }>();
  // 카테고리 또는 날짜가 바뀌면 이전 조회를 취소하고 해당 날짜만 다시 조회합니다.
  const resource = useResource(
    useCallback(
      (signal: AbortSignal) =>
        draft.category && draft.date
          ? clinicRepository.getSlots(draft.category.id, draft.date, signal)
          : Promise.resolve([]),
      [draft.category?.id, draft.date],
    ),
  );
  if (!draft.category) return <Redirect href="/reservation" />; // 직접 URL 접근·앱 재시작에도 안전하게 복귀합니다.
  const valid =
    draft.date &&
    isBookingDate(draft.date) &&
    resource.data?.some(
      (slot) =>
        slot.appointmentAt === draft.appointmentAt &&
        slot.isAvailable &&
        Date.parse(slot.appointmentAt) > Date.now(),
    );
  return (
    <Screen>
      <BookingHeader step={2} title="날짜 · 시간 예약" />
      <DemoNotice />
      <Body>{draft.category.name} · 한국 시간 기준</Body>
      {conflict === "1" && (
        <Body>선택한 시간에 예약할 수 없습니다. 새 시간을 선택해주세요.</Body>
      )}
      <BookingCalendar selected={draft.date} onSelect={selectDate} />
      <Title>예약 시간</Title>
      {!draft.date ? (
        <Body>달력에서 날짜를 먼저 선택해주세요.</Body>
      ) : (
        <>
          <ResourceState {...resource} />
          {resource.data?.length === 0 && (
            <Body>선택한 날짜에 예약 가능한 시간이 없습니다.</Body>
          )}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {resource.data?.map((slot) => {
              const disabled =
                !slot.isAvailable ||
                Date.parse(slot.appointmentAt) <= Date.now();
              const selected = draft.appointmentAt === slot.appointmentAt;
              return (
                <Pressable
                  key={slot.appointmentAt}
                  accessibilityRole="button"
                  accessibilityLabel={`${formatTime(slot.appointmentAt)}${disabled ? " 예약 불가" : " 시간 선택"}`}
                  accessibilityState={{ disabled, selected }}
                  disabled={disabled}
                  onPress={() => selectTime(slot.appointmentAt)}
                  style={{
                    width: "30%",
                    padding: 15,
                    borderRadius: 12,
                    alignItems: "center",
                    backgroundColor: selected ? colors.primary : "white",
                    opacity: disabled ? 0.35 : 1,
                  }}
                >
                  <Text style={{ color: selected ? "white" : colors.text }}>
                    {formatTime(slot.appointmentAt)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </>
      )}
      <Button
        title="선택한 예약 확인"
        disabled={!valid || resource.loading}
        onPress={() => router.push("/reservation/confirm")}
      />
      <Button
        title="진료 다시 선택"
        secondary
        onPress={() => router.replace("/reservation")}
      />
    </Screen>
  );
}
