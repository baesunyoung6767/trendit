"use client";

import { useMemo, useState } from "react";
import type { Category, CatCode, Trend } from "@/lib/types";
import TrendCard from "./TrendCard";

// 카테고리 칩 필터 + 카드 피드.
// query(검색어)는 상위(TodayBoard)에서 내려받아 제목/내용으로 함께 필터링한다.
type Filter = "all" | CatCode;

export default function TrendFeed({
  categories,
  trends,
  query = "",
}: {
  categories: Category[];
  trends: Trend[];
  query?: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  // cat_code → Category 매핑 (카드에 색/이름 전달용)
  const catMap = useMemo(
    () =>
      Object.fromEntries(categories.map((c) => [c.cat_code, c])) as Record<
        CatCode,
        Category
      >,
    [categories],
  );

  const q = query.trim().toLowerCase();
  const filtered = trends.filter((t) => {
    const catOk = filter === "all" || t.cat_code === filter;
    const qOk =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.content.toLowerCase().includes(q);
    return catOk && qOk;
  });

  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "전체" },
    ...categories.map((c) => ({ key: c.cat_code, label: c.cat_name })),
  ];

  return (
    <>
      {/* 카테고리 칩 (sticky, 헤더 56px 아래) */}
      <div className="no-scrollbar sticky top-14 z-10 flex gap-2 overflow-x-auto bg-white px-5 py-2.5">
        {chips.map((chip) => {
          const active = filter === chip.key;
          return (
            <button
              key={chip.key}
              type="button"
              onClick={() => setFilter(chip.key)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-coral bg-coral text-white"
                  : "border-[#e5e5e5] bg-white text-ink"
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* 카드 피드 */}
      <div className="flex flex-col gap-4 px-5 pb-8 pt-3">
        {filtered.length > 0 ? (
          filtered.map((trend) => (
            <TrendCard
              key={trend.trend_id}
              trend={trend}
              category={catMap[trend.cat_code]}
            />
          ))
        ) : (
          <p className="py-12 text-center text-sm text-sub">
            {q ? `‘${query.trim()}’ 검색 결과가 없어요` : "표시할 트렌드가 없어요"}
          </p>
        )}
      </div>
    </>
  );
}
