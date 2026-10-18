import Header from "@/components/Header";
import TodayBoard from "@/components/TodayBoard";
import { getCategories, getTodayTrends } from "@/lib/data";

// 메인 화면 (오늘의 트렌드).
// Server Component에서 데이터 계층(getTodayTrends/getCategories)만 호출하고,
// 상호작용(날짜 선택·칩 필터·하트)은 각 클라이언트 컴포넌트에 위임한다.
export default async function Home() {
  const [daily, categories] = await Promise.all([
    getTodayTrends(),
    getCategories(),
  ]);

  return (
    <>
      <Header />

      <main className="relative z-0 isolate flex-1">
        {/* 오늘의 트렌드 히어로, 날짜 선택기와 카드 피드 */}
        <TodayBoard
          summary={daily.summary}
          categories={categories}
          trends={daily.trends}
        />
      </main>
    </>
  );
}
