import { SettingsIcon } from "./icons";

// 메인 헤더 (sticky) — 좌: 로고 / 우: 설정 아이콘
export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-line bg-white px-[34px]">
      <span className="text-[20px] font-extrabold tracking-tight text-ink">트렌딧</span>
      <button
        type="button"
        aria-label="설정"
        className="-mr-4 flex h-9 w-9 items-center justify-center text-ink"
      >
        <SettingsIcon size={22} />
      </button>
    </header>
  );
}
