import { useState } from "react";
import {
  ImageBackground,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons"; // 사용하는 아이콘 세트만 가져와 번들 크기를 줄입니다.
import { Screen, Title, Body, DemoNotice } from "../../src/components/ui";
import { BlogCarousel } from "../../src/components/BlogCarousel";
import { clinicCards } from "../../src/data/content";
import { config } from "../../src/config";
import { colors } from "../../src/theme";

export default function HomeScreen() {
  const [notice, setNotice] = useState("");
  async function callClinic() {
    if (!config.phone) {
      setNotice("전화 문의 번호는 준비 중입니다.");
      return;
    }
    try {
      await Linking.openURL(`tel:${config.phone.replace(/[^+\d]/g, "")}`);
    } catch {
      setNotice("이 기기에서 전화 앱을 열 수 없습니다.");
    }
  }
  const menus = [
    {
      title: "진료 예약",
      icon: "calendar-outline" as const,
      action: () => router.push("/reservation"),
    },
    {
      title: "AI 문진",
      icon: "clipboard-outline" as const,
      action: () => setNotice("AI 문진은 준비 중입니다."),
    },
    {
      title: "치료 후기",
      icon: "chatbubbles-outline" as const,
      action: () => setNotice("치료 후기는 준비 중입니다."),
    },
    { title: "전화 문의", icon: "call-outline" as const, action: callClinic },
  ];
  // Flutter masonry grid의 높이에 맞춰 두 열로 배치합니다.
  const columns = [
    [clinicCards[0], clinicCards[3]],
    [clinicCards[1], clinicCards[2], clinicCards[4]],
  ];
  return (
    <Screen>
      <View style={s.header}>
        <Ionicons name="medical" size={29} color={colors.secondary} />
        <Text style={s.brand}>나을 한의원</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="알림"
          onPress={() => setNotice("알림 기능은 준비 중입니다.")}
          style={s.notification}
        >
          <Ionicons
            name="notifications-outline"
            size={23}
            color={colors.secondary}
          />
        </Pressable>
      </View>
      <ImageBackground
        source={require("../../assets/doctor_notext.png")}
        resizeMode="cover"
        style={s.banner}
        imageStyle={{ borderRadius: 28 }}
      >
        <Text style={s.english}>NAEUL KOREAN MEDICINE CLINIC</Text>
        <View style={{ marginTop: 68 }}>
          <Text style={s.bannerText}>편안한 진료로</Text>
          <Text
            style={[
              s.bannerText,
              { color: colors.primary, fontSize: 26, fontWeight: "700" },
            ]}
          >
            근본적인 건강을
          </Text>
          <Text style={s.bannerText}>찾으세요.</Text>
        </View>
      </ImageBackground>
      <View style={s.menus}>
        {menus.map((menu) => (
          <Pressable
            key={menu.title}
            accessibilityRole="button"
            accessibilityLabel={menu.title}
            onPress={menu.action}
            style={s.menu}
          >
            <Ionicons name={menu.icon} size={26} color={colors.primary} />
            <Text style={s.menuText}>{menu.title}</Text>
          </Pressable>
        ))}
      </View>
      {!!notice && (
        <View style={s.notice}>
          <Body>{notice}</Body>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="안내 닫기"
            onPress={() => setNotice("")}
          >
            <Ionicons name="close" size={22} color={colors.muted} />
          </Pressable>
        </View>
      )}
      <DemoNotice />
      <View style={s.sectionHeading}>
        <Title>진료 과목</Title>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/clinic")}
        >
          <Text style={{ color: colors.muted }}>전체 보기 ›</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {columns.map((column, index) => (
          <View key={index} style={{ flex: 1, gap: 12 }}>
            {column.map((card) => (
              <Pressable
                key={card.title}
                accessibilityRole="button"
                onPress={() => router.push("/clinic")}
                style={{
                  minHeight: card.height,
                  borderRadius: 24,
                  padding: 16,
                  backgroundColor: card.color,
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {card.title}
                </Text>
                <Ionicons
                  name={card.icon}
                  size={25}
                  color="white"
                  style={{
                    alignSelf: "flex-end",
                    backgroundColor: "#FFFFFF44",
                    padding: 7,
                    borderRadius: 12,
                  }}
                />
              </Pressable>
            ))}
          </View>
        ))}
      </View>
      <BlogCarousel />
    </Screen>
  );
}
const s = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  brand: { flex: 1, fontSize: 29, fontWeight: "700", color: colors.primary },
  notification: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  banner: { height: 380, width: "100%", padding: 24 },
  english: { color: "#555A50", fontSize: 12 },
  bannerText: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.text,
    lineHeight: 35,
  },
  menus: { flexDirection: "row", gap: 8 },
  menu: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 3,
    minHeight: 85,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 20,
    backgroundColor: "white",
  },
  menuText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  notice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: 12,
    backgroundColor: colors.softGreen,
    borderRadius: 12,
  },
  sectionHeading: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
