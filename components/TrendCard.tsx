import Link from "next/link";
import type { Category, Trend } from "@/lib/types";
import LikeButton from "./LikeButton";
import TrendImage from "./TrendImage";

// 트렌드 카드 (5:3 가로형, 풀이미지 + 그라디언트 + 흰 텍스트).
// 목업 단계: image_url이 없으면 카테고리 색 단색 플레이스홀더로 채운다.
// 카드 링크와 좋아요 버튼은 형제 요소로 분리한다.
export default function TrendCard({
  trend,
  category,
}: {
  trend: Trend;
  category: Category;
}) {
  return (
    <article className="relative aspect-[5/3] w-full overflow-hidden rounded-xl">
      <Link
        href={`/trend/${trend.trend_id}`}
        aria-label={`${trend.title} 상세 보기`}
        className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
      >
        <TrendImage trend={trend} category={category} />
        {/* 하단 가독성용 그라디언트 (transparent → rgba(0,0,0,.65)) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* 카테고리 태그 (좌상단) */}
        <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2 py-1 text-[11px] font-medium text-ink">
          {category.cat_name}
        </span>

        {/* 키워드 + 한 줄 요약 (좌하단) */}
        <div className="absolute inset-x-0 bottom-0 p-3.5">
          <h2 className="text-lg font-bold leading-tight text-white">
            {trend.title}
          </h2>
          <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-white/90">
            {trend.content}
          </p>
        </div>
      </Link>
      <div className="absolute right-1 top-1">
        <LikeButton trendId={trend.trend_id} initialLiked={trend.liked} onImage />
      </div>
    </article>
  );
}
