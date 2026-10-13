const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];

/** 상세 날짜는 서버·브라우저의 지역과 무관하게 한국 시간으로 표시한다. */
export function formatDetailDate(iso: string): string {
  const date = new Date(iso.length <= 10 ? `${iso}T00:00:00+09:00` : iso);
  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul", year: "2-digit", month: "numeric", day: "2-digit", weekday: "short",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}.${part("month")}.${part("day")} ${part("weekday")}`;
}

/** ISO 날짜 → "2026.08.02 (일)" (메인 화면 날짜 표기) */
export function formatMainDate(iso: string): string {
  // 날짜만 있는 문자열은 로컬 자정으로 파싱해 요일이 밀리지 않도록 처리
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day} (${WEEKDAYS_KO[d.getDay()]})`;
}
