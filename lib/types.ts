// 트렌딧 도메인 타입.
// docs/ERD/data_design.md 의 DB 스키마와 1:1로 맞춰 정의한다.
// → 나중에 Supabase 쿼리로 갈아끼울 때 이 타입 그대로 쓰면 화면 수정이 필요 없다.

/** trend_category.cat_code — 현재 v1은 음식/패션 2종 */
export type CatCode = "food" | "fashion";

/** trend_category 테이블 */
export interface Category {
  cat_code: CatCode;
  cat_name: string; // 표시명 (예: "음식")
  color: string; // #RRGGBB (카드 태그/배지 색)
}

/** trend 테이블 (카드 한 장 = 1 row) */
export interface Trend {
  trend_id: string;
  cat_code: CatCode;
  title: string; // 카드/상세 제목
  content: string; // 카드 부제 (한 줄 요약)
  image_url: string | null; // 카드/상세 이미지 (목업 단계에선 null → 단색 플레이스홀더)
  detail_content: string; // 상세 본문 (상세 화면에서 사용)
  rec_comment_title: string; // 여우 말풍선 소제목
  rec_comment: string; // 여우 말풍선 본문
  created_at: string; // ISO 문자열
  /** 화면 표현용 파생값 (DB의 trend_liked 여부). 목업에선 임의 지정 */
  liked?: boolean;
}

/** daily_trend 1건 + 그에 속한 trend N개 (화면이 실제로 소비하는 형태) */
export interface DailyTrend {
  daily_trend_id: string;
  summary: string; // 메인 화면 여우 말풍선 멘트
  trend_date: string; // ISO 문자열 (하루 1 row)
  trends: Trend[];
}

/** external_link 테이블 */
export interface ExternalLink {
  link_id: string;
  trend_id: string;
  title: string;
  link_name: string;
  created_at: string;
}

/** trend_search 테이블 */
export interface TrendSearch {
  search_id: string;
  trend_id: string;
  content: string;
  created_at: string;
}

/** 상세 조회 결과: trend와 연결된 외부 링크·검색어 */
export interface TrendDetail extends Trend {
  external_link: ExternalLink[];
  trend_search: TrendSearch[];
}
