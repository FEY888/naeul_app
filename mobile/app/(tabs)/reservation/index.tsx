import { useCallback } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons"; // 사용하는 아이콘 세트만 가져와 번들 크기를 줄입니다.
import { clinicRepository } from "../../../src/api/repository";
import { useResource } from "../../../src/hooks/useResource";
import { useBooking } from "../../../src/state/BookingContext";
import {
  BookingHeader,
  Body,
  DemoNotice,
  ResourceState,
  Screen,
  styles,
} from "../../../src/components/ui";
import { colors } from "../../../src/theme";

export default function ReservationScreen() {
  const { selectCategory } = useBooking();
  const resource = useResource(
    useCallback(
      (signal: AbortSignal) => clinicRepository.getCategories(signal),
      [],
    ),
  );
  return (
    <Screen>
      <BookingHeader step={1} title="진료 예약" />
      <DemoNotice />
      <Body>원하시는 진료를 선택해주세요.</Body>
      <ResourceState {...resource} />
      {resource.data?.length === 0 && (
        <Body>현재 예약 가능한 진료가 없습니다.</Body>
      )}
      {resource.data?.map((category) => (
        <Pressable
          key={category.id}
          accessibilityRole="button"
          onPress={() => {
            selectCategory(category);
            router.push("/reservation/date");
          }}
          style={[styles.card, { flexDirection: "row", alignItems: "center" }]}
        >
          <Ionicons name="medical-outline" size={27} color={colors.primary} />
          <View style={{ flex: 1, gap: 6 }}>
            <Text
              style={{ fontSize: 17, fontWeight: "700", color: colors.text }}
            >
              {category.name}
            </Text>
            <Text style={{ color: colors.muted, lineHeight: 20 }}>
              {category.description}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.muted} />
        </Pressable>
      ))}
    </Screen>
  );
}
