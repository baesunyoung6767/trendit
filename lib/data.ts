import type { Category, DailyTrend, TrendDetail } from "./types";
import { MOCK_CATEGORIES, MOCK_DAILY_TREND, MOCK_EXTERNAL_LINKS, MOCK_TREND_SEARCHES } from "./mock-data";

// 데이터 접근 계층 (data access layer).
// 화면은 오직 이 함수들만 통해 데이터를 가져온다.
// 지금은 목업을 반환하지만, API 연동 시 함수 "내부"만 Supabase 쿼리로 교체하면
// 화면 코드는 한 줄도 바꿀 필요가 없다.
//
// 나중에 교체 예시:
//   const { data } = await supabase
//     .from("daily_trend")
//     .select("*, trend(*)")
//     .order("trend_date", { ascending: false })
//     .limit(1)
//     .single();

/** 오늘의 트렌드(daily_trend 1건 + trend N개) */
export async function getTodayTrends(): Promise<DailyTrend> {
  return MOCK_DAILY_TREND;
}

/** 활성 카테고리 목록 (use_yn='Y') */
export async function getCategories(): Promise<Category[]> {
  return MOCK_CATEGORIES;
}

/** 트렌드 상세 + 연결된 외부 링크 N개 + 연관 검색어 N개 */
export async function getTrendById(id: string): Promise<TrendDetail | null> {
  const trend = MOCK_DAILY_TREND.trends.find((item) => item.trend_id === id);
  if (!trend) return null;
  return {
    ...trend,
    external_link: MOCK_EXTERNAL_LINKS.filter((link) => link.trend_id === id),
    trend_search: MOCK_TREND_SEARCHES.filter((search) => search.trend_id === id),
  };
}
