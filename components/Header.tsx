import { SettingsIcon } from "./icons";

// 메인 헤더 (sticky) — 좌: 로고 / 우: 설정 아이콘
export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-line bg-white px-5">
      <span className="text-xl font-bold tracking-tight text-coral">트렌딧</span>
      <button
        type="button"
        aria-label="설정"
        className="-mr-1 flex h-9 w-9 items-center justify-center text-ink"
      >
        <SettingsIcon size={22} />
      </button>
    </header>
  );
}
