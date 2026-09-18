import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput } from "react-native";
import { router } from "expo-router";
import { request } from "../src/api/client";
import { tokenStore } from "../src/api/token-store";
import {
  Body,
  Button,
  Card,
  Screen,
  Title,
  styles,
} from "../src/components/ui";
import { config } from "../src/config";

// 이 화면은 제안 API 계약 POST /auth/login -> { accessToken }에 맞춘 연결 예제입니다.
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);
  async function login() {
    if (lock.current || config.demo) return;
    lock.current = true;
    setBusy(true);
    setError("");
    try {
      const data = await request<{ accessToken?: unknown }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (typeof data.accessToken !== "string" || !data.accessToken)
        throw new Error("서버 로그인 응답을 확인해주세요.");
      await tokenStore.set(data.accessToken); // 비밀번호는 저장하지 않습니다.
      setPassword("");
      if (router.canGoBack()) router.back();
      else router.replace("/mypage");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "로그인에 실패했습니다.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Screen>
        <Title>나을한의원 로그인</Title>
        <Body>서버에 가입된 계정으로 로그인해주세요.</Body>
        <Card>
          <Text>이메일</Text>
          <TextInput
            accessibilityLabel="이메일"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            placeholder="name@example.com"
            style={{
              minHeight: 48,
              padding: 12,
              borderWidth: 1,
              borderColor: "#DDD",
              borderRadius: 10,
            }}
          />
          <Text>비밀번호</Text>
          <TextInput
            accessibilityLabel="비밀번호"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="current-password"
            style={{
              minHeight: 48,
              padding: 12,
              borderWidth: 1,
              borderColor: "#DDD",
              borderRadius: 10,
            }}
          />
          {!!error && (
            <Text accessibilityRole="alert" style={styles.error}>
              {error}
            </Text>
          )}
          {config.demo && (
            <Body>데모 모드에서는 로그인 서버를 호출하지 않습니다.</Body>
          )}
          <Button
            title="로그인"
            loading={busy}
            disabled={config.demo || !email.trim() || !password}
            onPress={login}
          />
        </Card>
      </Screen>
    </KeyboardAvoidingView>
  );
}
