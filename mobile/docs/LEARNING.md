# Flutter를 알고 있는 개발자를 위한 코드 읽기

## 1. React Native와 Expo의 역할

React Native는 `View`, `Text`, `Pressable`로 네이티브 UI를 구성합니다. Expo는 그 앱의 실행·라우팅·기기 기능·빌드 도구를 제공합니다. NestJS는 별도 서버이며 React Native 앱은 HTTP로 서버를 호출합니다. Next.js는 이 앱을 실행하는 데 필요하지 않습니다.

| Flutter                    | 이 프로젝트의 대응                            | 의미                         |
| -------------------------- | --------------------------------------------- | ---------------------------- |
| `main.dart`                | `expo-router/entry` → `app/_layout.tsx`       | 앱 시작과 전체 화면 구조     |
| StatelessWidget / build    | 함수 컴포넌트 / return JSX                    | props를 받아 UI 반환         |
| StatefulWidget / setState  | `useState`                                    | 값 변경 시 화면 갱신         |
| Column / Row               | `View`, `flexDirection: 'column' / 'row'`     | RN 기본 방향은 column        |
| Text                       | `Text`                                        | 글자는 반드시 Text 안에 넣기 |
| Container / BoxDecoration  | `View` / `StyleSheet.create`                  | 크기·여백·배경·테두리        |
| InkWell / onTap            | `Pressable` / `onPress`                       | 누르기 이벤트                |
| Image.asset / BoxFit.cover | `Image`, `require(...)`, `resizeMode="cover"` | 앱에 포함된 이미지           |
| GoRouter / context.push    | Expo Router / `router.push`                   | 다음 화면 쌓기               |
| context.go                 | `router.replace` 등                           | 이동 목적에 따라 스택 변경   |
| Riverpod provider          | Context + `useState`                          | 작은 예약 상태 공유          |
| FutureProvider             | `useResource`                                 | 로딩/실패/데이터와 취소 처리 |
| initState / dispose        | `useEffect` / cleanup 함수                    | 타이머·요청 정리             |
| Dio                        | 기본 `fetch`를 감싼 `request`                 | JSON 요청, JWT, 오류 처리    |
| abstract TimeRepository    | `ClinicRepository` interface                  | 화면과 데이터 구현 분리      |

## 2. 가장 먼저 이해할 코드

아래는 예약 카드에서 실행되는 코드를 학습용으로 줄인 예입니다. 실제 코드는 `app/(tabs)/reservation/index.tsx`에 있습니다.

```tsx
// React Native의 터치 가능한 요소와 글자 요소를 가져옵니다.
import { Pressable, Text } from "react-native";
// Expo가 제공하는 화면 이동 객체입니다.
import { router } from "expo-router";
// 여러 예약 화면이 같은 선택값을 읽을 수 있게 만든 hook입니다.
import { useBooking } from "../../../src/state/BookingContext";
// 서버 데이터의 타입이며 실행 시 생성되는 클래스는 아닙니다.
import type { ClinicCategory } from "../../../src/domain/models";

// props를 구조 분해하여 category만 꺼냅니다. : 뒤는 TypeScript 타입입니다.
export function CategoryCard({ category }: { category: ClinicCategory }) {
  // 객체가 제공하는 함수 중 selectCategory만 꺼냅니다.
  const { selectCategory } = useBooking();
  // JSX는 화면의 구조를 표현합니다. HTML과 비슷하지만 네이티브 컴포넌트입니다.
  return (
    // onPress에는 실행 결과가 아니라 나중에 실행할 함수를 전달합니다.
    <Pressable
      onPress={() => {
        // 현재 진료를 공유 상태에 저장하고 이전 날짜/시간을 초기화합니다.
        selectCategory(category);
        // 다음 화면을 쌓아 뒤로 가기가 가능하도록 이동합니다.
        router.push("/reservation/date");
      }}
    >
      {/* 중괄호는 JSX 안에 JavaScript 값을 넣는 문법입니다. */}
      <Text>{category.name}</Text>
    </Pressable>
  );
}
```

`selectCategory(category)`를 누르기 전에 직접 실행해버리면 안 됩니다. 그래서 `onPress={() => ...}`라는 함수를 넘깁니다. `map`은 Dart의 `List.generate`처럼 여러 카드를 만들며 `key`는 React가 각 항목을 구분하는 ID입니다.

## 3. 상태를 어디에 두었나요?

**그 화면에서만 필요한 값**(로그인 입력, 달력 표시 월, 버튼 로딩)은 `useState`입니다. **여러 단계가 공유하는 값**(진료, 날짜, 시간)은 `BookingContext`입니다. 모든 값을 전역 상태로 만들면 수정 영향이 커집니다.

`setDraft(v => ({ ...v, date, appointmentAt: null }))`의 뜻:

1. `v`는 직전 상태입니다. 이전 값에 의존하므로 함수 형태를 씁니다.
2. `...v`는 기존 필드를 복사합니다. 상태 객체를 직접 수정하지 않습니다.
3. `date`는 `date: date`의 축약입니다.
4. 날짜가 바뀌면 `appointmentAt`을 지웁니다. 이전 날짜의 시간이 남으면 잘못 예약됩니다.

`useRef`는 값이 바뀌어도 화면을 다시 그리지 않는 보관함입니다. 신청 버튼에서는 연속 클릭 방지용 잠금으로 사용합니다. `useState`만으로 막으면 다음 렌더링 전에 두 번 눌릴 수 있습니다.

## 4. 비동기 조회

`useResource`는 로딩, 데이터, 오류를 관리합니다. `useEffect`는 해당 화면이 활성화되거나 조회 조건이 바뀔 때 조회합니다. cleanup에서 `AbortController.abort()`를 호출하여 이전 날짜의 늦은 응답을 무시합니다.

조회 함수를 `useCallback`으로 감싼 이유는 함수가 렌더링마다 새로 만들어지면서 effect가 반복 호출되는 것을 막기 위해서입니다. 여기서 메모이제이션은 무조건 속도를 높이는 장식이 아니라 **effect의 실행 조건을 유지하는 목적**입니다.

소규모 화면이므로 Redux, Zustand, TanStack Query를 전부 넣지 않았습니다. 향후 예약 목록 캐싱·갱신·무한 스크롤이 커지면 TanStack Query 도입을 검토할 수 있습니다. 지금은 의존성을 늘리지 않고 흐름을 읽을 수 있는 구조를 택했습니다.

## 5. API가 바뀌면 어디를 수정하나요?

화면은 `clinicRepository.getCategories()`, `getSlots()`, `createAppointment()`를 호출합니다. 실제 주소와 JSON 변환은 `src/api/repository.ts`에만 있습니다. 서버가 `{ data: [...] }`를 반환한다면 해당 파일에서 배열을 꺼내 `parseCategories`에 전달하면 됩니다. 화면 전체를 고칠 필요가 없습니다.

`interface`는 컴파일 단계의 약속입니다. 서버가 이상한 JSON을 보내도 런타임에는 자동 검사되지 않습니다. 그래서 `src/domain/validation.ts`에서 필수 필드를 확인합니다. API가 커지면 OpenAPI 기반 타입 생성과 런타임 스키마 도입을 검토하세요.

## 6. 학습 실습 순서

1. 홈 문구 하나와 `theme.ts` 색상 하나 변경 → 저장 → 화면 확인.
2. 진료 카드를 눌러 Context의 category가 어떻게 바뀌는지 읽기.
3. 날짜 선택 시 시간 선택이 초기화되는 이유 확인.
4. 데모 예약 1건을 끝까지 실행하고 새로고침하면 상태가 사라지는 점 확인.
5. NestJS `/clinic-categories` 하나만 계약대로 만들고 API 모드에서 조회.
6. 로그인 연결 후 신청 요청을 서버에서 JWT 사용자로 저장.
7. DB 동시성 제어와 e2e 검증 후 실제 서비스 기능을 확장.

처음부터 Expo 전체를 암기할 필요는 없습니다. 이 앱에서 `props → state → event → API → response` 한 흐름씩 추적하세요.
