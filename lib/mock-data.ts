import type { Category, DailyTrend, ExternalLink, TrendSearch } from "./types";

// ⚠️ 목업 데이터 — 실제 API 연동 전까지 화면 개발용.
// 모양은 DB 스키마(data_design.md)와 동일하게 유지한다.
// 나중에 lib/data.ts 안에서 Supabase 쿼리 결과로 교체하면 이 파일은 삭제 가능.

export const MOCK_CATEGORIES: Category[] = [
  { cat_code: "food", cat_name: "음식", color: "#FF6B4A" },
  { cat_code: "fashion", cat_name: "패션", color: "#EC5B8E" },
  // 카테고리 복수 선택 확인용 임시 항목.
  { cat_code: "economy", cat_name: "경제", color: "#F2C94C" },
];

export const MOCK_DAILY_TREND: DailyTrend = {
  daily_trend_id: "mock-daily-0001",
  summary: "오늘은 늦여름 입맛과 간절기 무드가 가득해요 🍑",
  trend_date: "2026-08-02",
  trends: [
    {
      trend_id: "mock-trend-01",
      cat_code: "food",
      title: "복숭아 하이볼, 여름의 끝을 붙잡다",
      content: "제철 복숭아를 통째로 갈아 넣은 논알콜 하이볼이 카페마다 등장",
      image_url: null,
      detail_content:
        "8월 들어 카페·바를 중심으로 '복숭아 하이볼'이 빠르게 번지고 있어요. 제철 백도를 통째로 갈아 탄산과 섞어내는 게 핵심입니다.\n\n논알콜 버전으로 내놓는 곳이 많아 낮에도 부담 없이 즐길 수 있고, 유리잔 가득 담긴 비주얼 덕에 SNS 인증도 활발합니다.\n\n집에서도 복숭아 1개, 탄산수, 얼음만 있으면 3분이면 완성돼요. 🍑",
      rec_comment_title: "🍹 한 번 만들어볼까",
      rec_comment: "트렌딧과 함께 복숭아 하이볼 만들어볼까요?",
      created_at: "2026-08-02T06:00:00+09:00",
      liked: false,
    },
    {
      trend_id: "mock-trend-02",
      cat_code: "fashion",
      title: "셔켓, 지금 가장 잘 팔리는 간절기 아우터",
      content: "셔츠와 재킷 사이 — 아침저녁 쌀쌀할 때 걸치기 딱 좋은 한 벌",
      image_url: null,
      detail_content:
        "낮과 밤 기온차가 커지는 8월 말, '셔켓(셔츠+재킷)'이 간절기 아우터로 다시 떠올랐어요.\n\n얇은 코튼 소재라 실내에선 셔츠처럼, 밖에선 가벼운 재킷처럼 활용돼요. 무채색 톤을 고르면 어떤 하의와도 무난하게 어울립니다.\n\n오버핏으로 한 치수 크게 입고 소매를 살짝 걷어주는 게 올해 무드예요. 👔",
      rec_comment_title: "👗 한 번 입어볼까",
      rec_comment: "트렌딧과 함께 셔켓 코디 찾아볼까요?",
      created_at: "2026-08-02T06:00:00+09:00",
      liked: true,
    },
    {
      trend_id: "mock-trend-03",
      cat_code: "food",
      title: "마라 크림 파스타, 매운맛 다음 스텝",
      content: "얼얼한 마라와 고소한 크림의 조합 — 배달앱 검색량 급상승",
      image_url: null,
      detail_content:
        "마라탕·마라샹궈에 이어 '마라 크림 파스타'가 배달앱을 중심으로 검색량이 크게 늘었어요.\n\n크림소스의 고소함이 마라의 얼얼함을 감싸줘 매운맛 입문자도 도전하기 좋습니다. 베이컨이나 새우를 더하면 한 끼로도 든든해요.\n\n마라 소스 한 스푼만 있으면 기존 크림파스타 레시피에 그대로 응용할 수 있어요. 🌶️",
      rec_comment_title: "🍝 한 번 먹어볼까",
      rec_comment: "트렌딧이 골라본 마라 크림 파스타 어때요?",
      created_at: "2026-08-02T06:00:00+09:00",
      liked: false,
    },
    {
      trend_id: "mock-trend-04",
      cat_code: "fashion",
      title: "발레코어, 리본 슈즈로 완성하는 무드",
      content: "발레리나 감성의 리본·메리제인 슈즈가 데일리룩으로",
      image_url: null,
      detail_content:
        "올여름 내내 화제였던 '발레코어'가 신발로 옮겨붙었어요. 리본 장식 플랫이나 메리제인 슈즈가 데일리룩의 포인트로 인기예요.\n\n청바지처럼 캐주얼한 하의에 매치하면 힘을 뺀 러블리함이 살아납니다. 발등을 감싸는 스트랩이 활동성도 좋아요.\n\n무채색 옷차림에 슈즈 하나만 바꿔도 분위기가 확 달라져요. 🎀",
      rec_comment_title: "🎀 한 번 사볼까",
      rec_comment: "트렌딧이 찜한 리본 슈즈 구경해볼까요?",
      created_at: "2026-08-02T06:00:00+09:00",
      liked: false,
    },
    {
      trend_id: "mock-trend-05",
      cat_code: "food",
      title: "옥수수 아이스크림, 편의점 신상 대란",
      content: "구운 옥수수 풍미를 살린 아이스크림이 품절 행렬",
      image_url: null,
      detail_content:
        "오늘부터 전국 편의점에서 만날 수 있는 '구운 옥수수 아이스크림'이 출시와 동시에 화제예요.\n\n달큰하면서도 고소한 옥수수 풍미를 그대로 살린 게 특징입니다. 알갱이가 씹히는 식감을 넣어 호불호가 갈리지만 그만큼 리뷰가 뜨거워요.\n\n인기 매장은 이미 품절이라, 보이면 바로 집는 걸 추천해요. 🌽",
      rec_comment_title: "🍦 한 번 먹어볼까",
      rec_comment: "트렌딧이 골라본 옥수수 아이스크림 어때요?",
      created_at: "2026-08-02T06:00:00+09:00",
      liked: false,
    },
    {
      trend_id: "mock-trend-06",
      cat_code: "fashion",
      title: "청청패션, 다시 돌아온 데님 온 데님",
      content: "위아래 데님으로 맞춰 입는 '청청' 스타일이 재유행",
      image_url: null,
      detail_content:
        "한동안 촌스럽다 여겨졌던 '청청패션(데님 온 데님)'이 뉴트로 무드를 타고 다시 돌아왔어요.\n\n포인트는 위아래 톤을 살짝 다르게 주는 것. 연한 데님 셔츠에 진한 청바지를 매치하면 세련되게 정리됩니다.\n\n벨트나 흰 티 한 장으로 사이를 끊어주면 답답함 없이 완성돼요. 👖",
      rec_comment_title: "👖 한 번 입어볼까",
      rec_comment: "트렌딧과 함께 청청 코디 찾아볼까요?",
      created_at: "2026-08-02T06:00:00+09:00",
      liked: false,
    },
  ],
};

// 관계 테이블도 trend_id로 연결해 실제 DB 조회와 같은 형태로 사용한다.
const DETAIL_EXTRAS = [
  {
    trend_id: "mock-trend-01",
    links: [
      { title: "논알콜 레시피 찾아보기", url: `https://www.youtube.com/results?search_query=${encodeURIComponent("복숭아 논알콜 하이볼 레시피")}` },
      { title: "복숭아 음료 더 알아보기", url: `https://search.naver.com/search.naver?query=${encodeURIComponent("복숭아 탄산 음료 만들기")}` },
    ],
    keywords: ["복숭아 하이볼", "논알콜 칵테일", "복숭아 레시피", "홈카페"],
  },
  {
    trend_id: "mock-trend-02",
    links: [{ title: "셔켓 코디 찾아보기", url: `https://search.naver.com/search.naver?query=${encodeURIComponent("셔켓 간절기 코디")}` }],
    keywords: ["셔켓", "간절기 아우터", "오버핏 셔츠", "가을 코디"],
  },
  {
    trend_id: "mock-trend-03",
    links: [{ title: "마라 크림 파스타 레시피", url: `https://www.youtube.com/results?search_query=${encodeURIComponent("마라 크림 파스타 레시피")}` }],
    keywords: ["마라 크림 파스타", "마라 소스", "크림 파스타", "홈쿡"],
  },
  {
    trend_id: "mock-trend-04",
    links: [{ title: "리본 슈즈 구경하기", url: `https://search.naver.com/search.naver?query=${encodeURIComponent("리본 메리제인 슈즈")}` }],
    keywords: ["발레코어", "리본 슈즈", "메리제인", "플랫슈즈"],
  },
  {
    trend_id: "mock-trend-05",
    links: [{ title: "옥수수 아이스크림 찾아보기", url: `https://search.naver.com/search.naver?query=${encodeURIComponent("옥수수 아이스크림")}` }],
    keywords: ["옥수수 아이스크림", "편의점 디저트", "구운 옥수수", "아이스크림"],
  },
  {
    trend_id: "mock-trend-06",
    links: [{ title: "데님 온 데님 코디 보기", url: `https://search.naver.com/search.naver?query=${encodeURIComponent("데님 온 데님 코디")}` }],
    keywords: ["청청패션", "데님 온 데님", "데님 셔츠", "뉴트로 코디"],
  },
];

export const MOCK_EXTERNAL_LINKS: ExternalLink[] = DETAIL_EXTRAS.flatMap(
  ({ trend_id, links }) => links.map((link, index) => ({
    link_id: `${trend_id}-link-${index + 1}`,
    trend_id,
    title: link.title,
    link_name: link.url,
    created_at: "2026-08-02T06:00:00+09:00",
  })),
);

export const MOCK_TREND_SEARCHES: TrendSearch[] = DETAIL_EXTRAS.flatMap(
  ({ trend_id, keywords }) => keywords.map((content, index) => ({
    search_id: `${trend_id}-search-${index + 1}`,
    trend_id,
    content,
    created_at: "2026-08-02T06:00:00+09:00",
  })),
);
