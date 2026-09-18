import type { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme";
import { config } from "../config";

// Flutter SafeArea + SingleChildScrollView에 해당하는 재사용 레이아웃입니다.
export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
export function Title({ children }: PropsWithChildren) {
  return <Text style={styles.title}>{children}</Text>;
}
export function Body({ children }: PropsWithChildren) {
  return <Text style={styles.body}>{children}</Text>;
}
export function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}
export function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  secondary = false,
}: {
  title: string;
  onPress(): void;
  disabled?: boolean;
  loading?: boolean;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        (disabled || loading) && { opacity: 0.45 },
        pressed && { opacity: 0.7 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? colors.primary : "white"} />
      ) : (
        <Text
          style={[styles.buttonText, secondary && { color: colors.primary }]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
export function ResourceState({
  loading,
  error,
  retry,
}: {
  loading: boolean;
  error?: string;
  retry(): void;
}) {
  if (loading)
    return (
      <ActivityIndicator
        accessibilityLabel="불러오는 중"
        style={{ padding: 24 }}
        color={colors.primary}
      />
    );
  if (error)
    return (
      <Card>
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
        <Button title="다시 시도" onPress={retry} secondary />
      </Card>
    );
  return null;
}
export function DemoNotice() {
  return config.demo ? (
    <Text style={styles.notice}>
      UI 데모 · 실제 예약이나 병원 접수가 이루어지지 않습니다.
    </Text>
  ) : null;
}
export function BookingHeader({
  step,
  title,
}: {
  step: number;
  title: string;
}) {
  return (
    <View style={styles.bookingHeader}>
      <Text style={styles.bookingTitle}>{title}</Text>
      <View style={styles.track}>
        <View style={[styles.progress, { width: `${step * 25}%` }]} />
      </View>
      <Text style={{ color: "white", fontWeight: "700" }}>{step} / 4</Text>
    </View>
  );
}
export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    padding: 16,
    paddingBottom: 36,
    gap: 16,
  },
  title: { fontSize: 22, fontWeight: "700", color: colors.brown },
  body: { fontSize: 15, lineHeight: 24, color: colors.text },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    minHeight: 50,
    borderRadius: 14,
    padding: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: { backgroundColor: colors.softGreen },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  error: { color: colors.error, lineHeight: 23 },
  notice: { color: colors.brown, fontSize: 12, lineHeight: 19 },
  bookingHeader: {
    padding: 24,
    gap: 16,
    backgroundColor: colors.primary,
    borderRadius: 20,
    minHeight: 170,
    justifyContent: "center",
  },
  bookingTitle: { color: "white", fontSize: 28, fontWeight: "700" },
  track: {
    width: 150,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF44",
  },
  progress: { height: 4, borderRadius: 2, backgroundColor: "white" },
});
