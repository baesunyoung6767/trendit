"use client";

import Image from "next/image";
import { useState } from "react";
import type { Category, Trend } from "@/lib/types";
import DateHeader from "./DateHeader";
import { SearchIcon } from "./icons";
import TrendFeed from "./TrendFeed";

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
      <section className="relative h-[309px] overflow-hidden bg-brand px-[34px] pt-[20px]">
        <Image
          src="/character-v2.png"
          alt="트렌딧 마스코트"
          width={1320}
          height={1191}
          priority
          className="pointer-events-none absolute -right-[88px] -bottom-[18px] w-[340px] max-w-none select-none max-[359px]:-right-[75px] max-[359px]:-bottom-[8px] max-[359px]:w-[260px]"
        />

        <div className="relative z-10 max-w-[64%] max-[359px]:max-w-[68%]">
          <h1 className="text-[22px] font-bold leading-tight tracking-tight text-ink">
            오늘의 트렌드
          </h1>
          <p className="mt-3 text-[12px] font-medium text-ink/80">
            지금 뜨는 이야기를 만나보세요
          </p>
          <p className="mt-4 break-keep text-[15px] font-bold leading-[1.45] text-ink max-[359px]:text-[14px]">
            {summary}
          </p>
        </div>

        <div className="absolute bottom-[57px] left-[34px] z-10 w-[190px] max-w-[51%] max-[359px]:bottom-9">
          <div className="flex h-10 items-center gap-2 rounded-full bg-surface px-3 shadow-sm focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink">
            <SearchIcon size={16} className="shrink-0 text-ink" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="트렌드 검색"
              aria-label="오늘의 트렌드 검색"
              className="min-w-0 w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-sub"
            />
          </div>
        </div>
      </section>

      <div className="relative -mt-8 min-h-[calc(100vh-333px)] rounded-t-[32px] bg-surface pt-1">
        <DateHeader />
        <TrendFeed categories={categories} trends={trends} query={query} />
      </div>
    </>
  );
}
