import Link from "next/link";

export default function TrendNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-20 text-center">
      <p className="text-4xl" aria-hidden="true">🦊</p>
      <h1 className="text-xl font-bold text-ink">트렌드를 찾을 수 없어요</h1>
      <p className="text-sm text-sub">주소를 확인하거나 다른 트렌드를 둘러보세요.</p>
      <Link href="/" className="rounded-full bg-coral px-5 py-3 text-sm font-bold text-white">오늘의 트렌드 보기</Link>
    </main>
  );
}
