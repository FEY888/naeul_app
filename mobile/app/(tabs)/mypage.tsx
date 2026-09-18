import { useCallback, useState } from "react";
import { useFocusEffect, router } from "expo-router";
import {
  Body,
  Button,
  Card,
  DemoNotice,
  Screen,
  Title,
} from "../../src/components/ui";
import { tokenStore } from "../../src/api/token-store";
import { config } from "../../src/config";

export default function MyPage() {
  const [signedIn, setSignedIn] = useState(false);
  const [message, setMessage] = useState("");
  useFocusEffect(
    useCallback(() => {
      let active = true;
      tokenStore
        .get()
        .then((value) => {
          if (active) setSignedIn(Boolean(value));
        })
        .catch(() => {
          if (active) setMessage("로그인 상태를 불러오지 못했습니다.");
        });
      return () => {
        active = false;
      };
    }, []),
  );
  return (
    <Screen>
      <Title>마이페이지</Title>
      <DemoNotice />
      <Card>
        <Body>
          {signedIn
            ? "로그인 정보가 저장되어 있습니다."
            : "로그인 후 예약을 신청할 수 있습니다."}
        </Body>
        {!signedIn ? (
          <Button
            title="로그인"
            disabled={config.demo}
            onPress={() => router.push("/login")}
          />
        ) : (
          <Button
            title="로그아웃"
            secondary
            onPress={async () => {
              try {
                await tokenStore.clear();
                setSignedIn(false);
                setMessage("로그아웃했습니다.");
              } catch {
                setMessage("로그아웃에 실패했습니다. 다시 시도해주세요.");
              }
            }}
          />
        )}
        {config.demo && (
          <Body>데모에서는 회원가입 없이 예약 화면을 체험할 수 있습니다.</Body>
        )}
      </Card>
      <Card>
        <Body>예약 내역과 회원정보 관리는 준비 중입니다.</Body>
      </Card>
      {!!message && <Body>{message}</Body>}
    </Screen>
  );
}
