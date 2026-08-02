"use client";

import { useState } from "react";
import type { Category, Trend } from "@/lib/types";
import { HeartIcon } from "./icons";

// 트렌드 카드 (5:3 가로형, 풀이미지 + 그라디언트 + 흰 텍스트).
// 목업 단계: image_url이 없으면 카테고리 색 단색 플레이스홀더로 채운다.
// → 나중에 image_url이 채워지면 아래 배경 자리에 <img>만 끼우면 됨.
export default function TrendCard({
  trend,
  category,
}: {
  trend: Trend;
  category: Category;
}) {
  const [liked, setLiked] = useState(trend.liked ?? false);

  return (
    <article className="relative aspect-[5/3] w-full cursor-pointer overflow-hidden rounded-xl">
      {/* 이미지 자리 — 지금은 카테고리 색 단색. 실데이터 연동 시 여기에 <img> */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: category.color }}
        aria-hidden="true"
      />
      {/* 하단 가독성용 그라디언트 (transparent → rgba(0,0,0,.65)) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* 카테고리 태그 (좌상단) */}
      <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-[11px] font-medium text-ink">
        {category.cat_name}
      </span>

      {/* 하트 (우상단) */}
      <button
        type="button"
        aria-label={liked ? "좋아요 취소" : "좋아요"}
        aria-pressed={liked}
        onClick={(e) => {
          e.stopPropagation();
          setLiked((v) => !v);
        }}
        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center drop-shadow"
      >
        <HeartIcon
          size={24}
          filled={liked}
          className={liked ? "text-coral" : "text-white"}
        />
      </button>

      {/* 키워드 + 한 줄 요약 (좌하단) */}
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <h2 className="text-lg font-bold leading-tight text-white">
          {trend.title}
        </h2>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-white/90">
          {trend.content}
        </p>
      </div>
    </article>
  );
}
