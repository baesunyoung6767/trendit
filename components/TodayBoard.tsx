"use client";

import { useState } from "react";
import type { Category, Trend } from "@/lib/types";
import { SearchIcon } from "./icons";
import TrendFeed from "./TrendFeed";

// 오늘의 여우 히어로 카드(한줄평 + 마스코트 + 검색창) + 트렌드 피드.
// 검색어(query) 상태를 히어로 카드의 검색창과 카드 피드가 함께 공유한다.
export default function TodayBoard({
  summary,
  categories,
  trends,
}: {
  summary: string;
  categories: Category[];
  trends: Trend[];
}) {
  const [query, setQuery] = useState("");

  return (
    <>
      <section className="px-5 pt-3 pb-6">
        <div className="relative flex min-h-[184px] flex-col overflow-hidden rounded-3xl bg-coral-tint p-4">
          {/* 마스코트 여우 — 원형 없이 오른쪽에 자연스럽게 (가장자리에서 크롭) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/character.png"
            alt="트렌딧 마스코트 여우"
            className="pointer-events-none absolute -right-3 bottom-0 w-32 select-none"
          />

          {/* 라벨 + 한줄평 (오른쪽 캐릭터와 안 겹치게 폭 제한) */}
          <div className="relative z-10 max-w-[60%]">
            <p className="mb-1 text-[11px] font-medium text-coral">
              오늘의 여우 한마디
            </p>
            <p className="text-[16px] font-bold leading-snug text-ink">
              {summary}
            </p>
          </div>

          {/* 검색창 — 카드 하단 */}
          <div className="relative z-10 mt-auto w-[62%] pt-4">
            <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-sm">
              <SearchIcon size={16} className="shrink-0 text-coral" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="오늘의 트렌드 검색"
                aria-label="오늘의 트렌드 검색"
                className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-sub"
              />
            </div>
          </div>
        </div>
      </section>

      <TrendFeed categories={categories} trends={trends} query={query} />
    </>
  );
}
