const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];

/** ISO 날짜 → "2026.08.02 (일)" (메인 화면 날짜 표기) */
export function formatMainDate(iso: string): string {
  // 날짜만 있는 문자열은 로컬 자정으로 파싱해 요일이 밀리지 않도록 처리
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00` : iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day} (${WEEKDAYS_KO[d.getDay()]})`;
}
