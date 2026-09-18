import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { addDays, koreaToday } from "../domain/dates";
import { colors } from "../theme";

// 단일 날짜 선택만 필요하므로 무거운 달력 라이브러리 대신 작은 월간 달력을 사용합니다.
export function BookingCalendar({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect(date: string): void;
}) {
  const today = koreaToday();
  const last = addDays(today, 60);
  const [month, setMonth] = useState((selected ?? today).slice(0, 7));
  const first = new Date(`${month}-01T00:00:00Z`);
  const offset = first.getUTCDay(); // 일요일을 첫 번째 열로 표시합니다.
  const days = new Date(
    Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0),
  ).getUTCDate();
  const cells = Array.from(
    { length: Math.ceil((offset + days) / 7) * 7 },
    (_, i) => i - offset + 1,
  );
  function changeMonth(amount: number) {
    const next = new Date(
      Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + amount, 1),
    );
    setMonth(next.toISOString().slice(0, 7));
  }
  return (
    <View style={s.calendar}>
      <View style={s.heading}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="이전 달"
          disabled={month <= today.slice(0, 7)}
          onPress={() => changeMonth(-1)}
          style={s.arrow}
        >
          <Text style={{ opacity: month <= today.slice(0, 7) ? 0.2 : 1 }}>
            ‹
          </Text>
        </Pressable>
        <Text style={s.month}>
          {first.getUTCFullYear()}년 {first.getUTCMonth() + 1}월
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="다음 달"
          disabled={month >= last.slice(0, 7)}
          onPress={() => changeMonth(1)}
          style={s.arrow}
        >
          <Text style={{ opacity: month >= last.slice(0, 7) ? 0.2 : 1 }}>
            ›
          </Text>
        </Pressable>
      </View>
      <View style={s.grid}>
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <Text key={day} style={s.weekday}>
            {day}
          </Text>
        ))}
        {cells.map((day, index) => {
          if (day < 1 || day > days)
            return <View key={`blank-${index}`} style={s.cell} />;
          const date = `${month}-${String(day).padStart(2, "0")}`;
          const disabled = date < today || date > last;
          return (
            <Pressable
              key={date}
              accessibilityRole="button"
              accessibilityLabel={`${date} 날짜 선택`}
              accessibilityState={{ selected: date === selected, disabled }}
              disabled={disabled}
              onPress={() => onSelect(date)}
              style={[s.cell, date === selected && s.selected]}
            >
              <Text
                style={{
                  color:
                    date === selected
                      ? "white"
                      : disabled
                        ? "#BDBDBD"
                        : colors.text,
                }}
              >
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  calendar: { backgroundColor: "white", borderRadius: 20, padding: 12 },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  month: { fontSize: 18, fontWeight: "700", color: colors.text },
  arrow: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  weekday: {
    width: "14.285714%",
    textAlign: "center",
    paddingVertical: 12,
    color: colors.muted,
  },
  cell: {
    width: "14.285714%",
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
  },
  selected: { backgroundColor: colors.primary },
});
