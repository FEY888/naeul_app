import { Image } from "react-native";
import { router } from "expo-router";
import { useCallback } from "react";
import {
  Body,
  Button,
  Card,
  ResourceState,
  Screen,
  Title,
} from "../../src/components/ui";
import { clinicRepository } from "../../src/api/repository";
import { useResource } from "../../src/hooks/useResource";

export default function ClinicScreen() {
  const resource = useResource(
    useCallback(
      (signal: AbortSignal) => clinicRepository.getCategories(signal),
      [],
    ),
  );
  return (
    <Screen>
      <Title>나을한의원 진료 안내</Title>
      <Image
        source={require("../../assets/doc.jpeg")}
        resizeMode="contain"
        style={{ width: "100%", height: 260, borderRadius: 20 }}
        accessibilityLabel="나을한의원 원장 소개 이미지"
      />
      <Body>원하시는 진료를 선택하고 예약을 신청해주세요.</Body>
      <ResourceState {...resource} />
      {resource.data?.map((category) => (
        <Card key={category.id}>
          <Title>{category.name}</Title>
          <Body>{category.description}</Body>
        </Card>
      ))}
      {resource.data?.length === 0 && <Body>등록된 진료 안내가 없습니다.</Body>}
      <Button
        title="진료 예약하기"
        onPress={() => router.push("/reservation")}
      />
    </Screen>
  );
}
