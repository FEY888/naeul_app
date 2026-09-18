# 나을한의원 · React Native + Expo

Flutter UI를 TypeScript로 옮긴 모바일 앱입니다. 원본은 저장소 루트의 `lib/`에 보존했습니다. Expo 앱은 **이 `mobile/` 폴더에서 실행**합니다.

## 실행

Node.js 22.13 이상 LTS를 설치한 뒤:

```bash
cd mobile
npm ci
cp .env.example .env
npm start
```

Windows PowerShell에서는 복사 명령으로 `Copy-Item .env.example .env`도 사용할 수 있습니다.
휴대폰과 PC를 같은 Wi-Fi에 연결하고, Expo Go에서 터미널의 QR을 여세요. 이 프로젝트는 SDK 57을 사용합니다. Expo Go도 해당 SDK를 지원해야 하며, 지원하지 않는 경우 대응 버전 또는 개발 빌드가 필요합니다.

- `npm run web`: 브라우저에서 UI 미리보기
- `npm run android`: Android 에뮬레이터로 실행
- `npm run ios`: macOS의 iOS 시뮬레이터로 실행
- `npm run check`: TypeScript 검사 + 날짜/API 응답 검증 테스트
- `npm run export:web`: 웹 번들 생성
- `npm run test:e2e`: 데모 화면의 예약 흐름 자동 검증(처음 `npx playwright install chromium` 필요)

기본값은 **데모 모드**입니다. 예약은 기기의 메모리에서만 처리하며 병원이나 DB에 전달하지 않습니다. 데모 시간표는 실제 진료시간이 아닙니다.

## 구현 범위

| 원본 Flutter                            | Expo 구현                                     |
| --------------------------------------- | --------------------------------------------- |
| 녹색/베이지 테마, 원장 이미지, 홈 메뉴  | 동일 자산·색상으로 이식                       |
| 진료 과목 masonry 카드, 건강소식 캐러셀 | 홈에 연결, 블로그 외부 링크, 이미지 실패 처리 |
| 진료 선택, 60일 예약 달력               | 이식, 진료/날짜/시간 상태 공유                |
| 시간 조회 repository만 존재             | 30분 간격 데모 슬롯, 실제 API 구현 분리       |
| 확인/완료 화면 Placeholder              | 신청 확인 → 직원 확인 대기 결과 화면 추가     |
| 탭 4개 중 경로 2개                      | 홈/예약 관리/진료 정보/마이페이지 연결        |
| 알림/AI 문진/치료 후기/전화 빈 콜백     | 준비 중 안내, 전화번호 설정 시 전화 앱 연결   |
| 로그인 없음                             | 제안한 NestJS 로그인 API 연결 화면 추가       |

원본 코드의 import 경로가 실제 파일 위치와 달라 Flutter 실행 화면을 직접 비교하지는 못했습니다. 코드와 이미지 자산을 기준으로 이식했습니다. Expo 예약 헤더는 기존 높이/색상/단계 표시를 유지하면서 둥근 카드 형태로 정리했습니다. 원본 홈에서 누락되어 있던 진료 카드·블로그 섹션은 함께 연결했습니다.

미구현: 회원가입, refresh token 회전, 예약 이력/취소, 알림, AI 문진, 후기, 관리자 화면, 실제 서버, 스토어 배포. 예약 관리 탭은 현재 **예약 신청 흐름**입니다.

## 어디부터 공부하나요?

1. [학습 가이드](docs/LEARNING.md): Flutter ↔ React Native 대응표와 코드 읽는 순서
2. `app/(tabs)/index.tsx`: 익숙한 홈부터 JSX와 스타일 이해
3. `app/(tabs)/reservation/index.tsx`: 진료 선택과 화면 이동
4. `src/state/BookingContext.tsx`: 여러 화면에서 선택값 공유
5. `src/api/repository.ts`: 데모 → NestJS 교체 지점
6. [API 계약](docs/API-CONTRACT.md): 서버가 구현할 요청·응답
7. [이식 결정 기록](docs/MIGRATION.md): 발견한 문제와 해결 이유, 포트폴리오 기록

화면 코드는 함수형 컴포넌트와 조합을 사용합니다. React에 맞지 않는 억지 클래스 상속은 추가하지 않았습니다. Repository 인터페이스, 공통 UI, 공통 API 클라이언트로 중복과 변경 범위를 줄였습니다.

## 실제 서버 연결

`.env`에서 `EXPO_PUBLIC_USE_MOCK=false`로 바꾸고 `EXPO_PUBLIC_API_URL`에 서버 주소를 넣습니다. 터미널을 재시작하고 앱을 다시 로드하세요. **지금은 사용자 NestJS 서버의 코드/DTO를 확인하지 않았으므로 계약을 맞추는 작업이 필요합니다.** API 모드에서 실패하면 데모 성공으로 대체하지 않습니다.

`EXPO_PUBLIC_` 변수는 앱에 공개됩니다. 서버 주소/전화번호만 넣고 JWT, DB 비밀번호, JWT 서명 비밀키를 넣지 마세요. JWT는 로그인 후 SecureStore에 저장됩니다. 웹 미리보기는 메모리에만 저장하여 새로고침하면 로그아웃됩니다.

SDK 의존성은 개별 최신 버전으로 올리지 말고 `npx expo install 패키지명`으로 맞춥니다. [Expo 공식 시작 문서](https://docs.expo.dev/get-started/create-a-project/), [SDK 57 문서](https://docs.expo.dev/versions/v57.0.0/), [환경변수](https://docs.expo.dev/guides/environment-variables/), [SecureStore](https://docs.expo.dev/versions/v57.0.0/sdk/securestore/) 참고.
