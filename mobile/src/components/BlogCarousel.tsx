import { useCallback, useEffect, useRef, useState } from "react";
import {
  AppState,
  FlatList,
  Image,
  Linking,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { blogPosts } from "../data/content";
import { colors } from "../theme";
import { Title } from "./ui";

export function BlogCarousel() {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - 32, 568) * 0.85; // 원본 viewportFraction: 0.85를 유지합니다.
  const list = useRef<FlatList>(null);
  const page = useRef(0);
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [failedImages, setFailedImages] = useState<string[]>([]);
  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );
  useEffect(() => {
    if (!focused) return; // 다른 탭에 있을 때 불필요한 자동 스크롤을 중지합니다.
    const timer = setInterval(() => {
      if (AppState.currentState !== "active") return; // 앱이 백그라운드일 때도 중지합니다.
      page.current = (page.current + 1) % blogPosts.length;
      list.current?.scrollToOffset({
        offset: page.current * cardWidth,
        animated: true,
      });
      setActive(page.current);
    }, 3000);
    return () => clearInterval(timer); // Flutter dispose()의 Timer.cancel()과 같습니다.
  }, [focused, cardWidth]);
  return (
    <View style={{ gap: 14 }}>
      <Title>나을한의원 건강 소식</Title>
      <FlatList
        ref={list}
        horizontal
        data={blogPosts}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          page.current = Math.max(
            0,
            Math.min(
              blogPosts.length - 1,
              Math.round(event.nativeEvent.contentOffset.x / cardWidth),
            ),
          );
          setActive(page.current);
        }}
        contentContainerStyle={{
          paddingRight: Math.min(width - 32, 568) - cardWidth,
        }}
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`${item.title} 블로그 열기`}
            onPress={async () => {
              try {
                setError("");
                await Linking.openURL(item.url);
              } catch {
                setError("블로그를 열 수 없습니다. 잠시 후 다시 시도해주세요.");
              }
            }}
            style={{
              width: cardWidth - 12,
              marginRight: 12,
              backgroundColor: "white",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            {failedImages.includes(item.id) ? (
              <View
                style={{
                  height: 145,
                  backgroundColor: colors.softGreen,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>나을 건강 소식</Text>
              </View>
            ) : (
              <Image
                source={{ uri: item.image }}
                style={{ height: 145, width: "100%" }}
                onError={() => setFailedImages((v) => [...v, item.id])}
              />
            )}
            <View style={{ padding: 14, gap: 6 }}>
              <Text
                numberOfLines={1}
                style={{ color: colors.text, fontWeight: "700", fontSize: 16 }}
              >
                {item.title}
              </Text>
              <Text style={{ color: colors.muted, fontSize: 12 }}>
                {item.date}
              </Text>
            </View>
          </Pressable>
        )}
      />
      <Text
        accessibilityLiveRegion="none"
        style={{ textAlign: "center", color: colors.muted }}
      >
        {active + 1} / {blogPosts.length}
      </Text>
      {!!error && (
        <Text accessibilityRole="alert" style={{ color: colors.error }}>
          {error}
        </Text>
      )}
    </View>
  );
}
