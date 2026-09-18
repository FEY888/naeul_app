# 검증 결과

2026-09-18 기준, 이식 작업 환경에서 확인한 결과입니다.

| 검사 | 결과 |
| --- | --- |
| TypeScript strict 검사 (`npm run typecheck`) | 통과 |
| 날짜·API 응답 경계 테스트 (`npm test`) | 6개 통과 |
| Expo SDK 의존성 검사 | 로컬 SDK 호환 목록 기준 통과. 외부 React Native Directory 조회는 네트워크 제한으로 생략 |
| 웹 production 번들 (`npm run export:web`) | 통과 |
| iOS / Android JS·Hermes 번들 (`npx expo export --platform ios --platform android`) | 통과 |
| Playwright 데모 모드 | 홈 → 진료 → 날짜/시간 → 확인 → 데모 결과, 네 탭 이동 통과 |
| Playwright 직접 URL 접근 | 선택값 없는 확인 화면에서 입력 단계 복귀 통과 |
| Playwright API 모드 | 서버 진료 ID 82 사용, 미로그인 신청 차단, 로그인, Bearer 헤더, 409 충돌 안내/선택 초기화, 재선택 후 PENDING 결과 통과 |
| 예약 JSON | clinicCategoryId/appointmentAt만 전달하고 userId/status를 전달하지 않음 확인 |
| 멱등 키 | POST 요청에 키 포함, 시간 재선택 시 키 변경 확인 |
| 화면 확인 | 휴대폰 크기의 웹 홈·시간 선택·결과 화면 확인 |

API 모드 테스트는 실제 NestJS 서버가 아니라 브라우저 HTTP 응답 대역입니다. 서버의 DB 정합성이나 동시 예약 처리를 검증한 결과가 아닙니다. 같은 키 재시도에 대한 서버 동작도 서버 구현 후 검증해야 합니다.

## 테스트 재현

```bash
npm ci
npm run check
npx playwright install chromium
npm run test:e2e
```

API 모드 테스트(macOS/Linux):

```bash
NAEUL_TEST_API=1 npm run test:e2e
```

PowerShell:

```powershell
$env:NAEUL_TEST_API = "1"
npm run test:e2e
Remove-Item Env:NAEUL_TEST_API
```

두 모드에서 각각 해당하지 않는 테스트는 의도적으로 skip됩니다. 이 작업 환경에서는 표준 Chromium 다운로드 제한으로 별도 Chromium 실행 경로를 지정해 동일 테스트를 수행했습니다. 일반 개발 환경에서는 기본 설치 명령을 사용하면 됩니다.

**미검증:** 실제 iOS/Android 기기 실행, APK/IPA 네이티브 빌드, 스토어 제출, 실제 로그인 서버·예약 DB, 외부 블로그 게시물 유효성, 실제 전화 발신. 원본 Flutter 앱의 실행 화면과 픽셀 비교도 수행하지 못했습니다.
