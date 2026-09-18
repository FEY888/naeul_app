import type { ClinicCategory } from "../domain/models";
// 원본 feature_card_data.dart의 다섯 항목입니다. 이 ID는 데모에서만 사용합니다.
export const demoCategories: ClinicCategory[] = [
  { id: 1, name: "교통사고 진료", description: "자동차보험진료, 후유증 치료" },
  { id: 2, name: "담적병 치료", description: "소화 불량, 복부 불편감" },
  {
    id: 3,
    name: "다이어트 상담",
    description: "체질 상담과 다이어트 관리 프로그램",
  },
  { id: 4, name: "통증 치료", description: "허리, 목, 어깨, 관절 집중 치료" },
  { id: 5, name: "여성질환, 갱년기", description: "갱년기 관리, 태반 약침" },
];
// 홈의 소개 카드이며 예약용 DB ID와는 별개입니다.
export const clinicCards = [
  {
    title: "교통사고 진료",
    color: "#385E30",
    height: 220,
    icon: "car-outline",
  },
  { title: "린 다이어트", color: "#5D7A56", height: 110, icon: "leaf-outline" },
  { title: "추나 치료", color: "#8BA888", height: 110, icon: "body-outline" },
  {
    title: "척추 디스크",
    color: "#4A6346",
    height: 110,
    icon: "fitness-outline",
  },
  { title: "담적증후군", color: "#2E422D", height: 220, icon: "heart-outline" },
] as const;
export const blogPosts = [
  {
    id: "1",
    title: "안산 나을한의원 담적 증후군",
    date: "2026.05.18",
    url: "https://m.blog.naver.com/naeul_hani/224238902384",
    image: "https://picsum.photos/200/160",
  },
  // 원본 /123456은 임시 주소이므로 블로그 홈으로 연결하고 UI에서 이를 명시합니다.
  {
    id: "2",
    title: "교통사고 후유증 관리법",
    date: "블로그 홈에서 확인",
    url: "https://m.blog.naver.com/naeul_hani",
    image: "https://picsum.photos/201/160",
  },
  {
    id: "3",
    title: "추나 치료",
    date: "2026.05.19",
    url: "https://m.blog.naver.com/naeul_hani/223624364606",
    image: "https://picsum.photos/202/160",
  },
];
