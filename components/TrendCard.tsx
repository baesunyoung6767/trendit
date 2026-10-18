import Link from "next/link";
import type { Category, Trend } from "@/lib/types";
import LikeButton from "./LikeButton";
import TrendImage from "./TrendImage";

export default function TrendCard({
  trend,
  category,
}: {
  trend: Trend;
  category: Category;
}) {
  return (
    <article className="relative w-full overflow-hidden rounded-lg border border-line bg-white shadow-[0_2px_8px_rgba(37,37,34,0.04)]">
      <Link
        href={`/trend/${trend.trend_id}`}
        aria-label={`${trend.title} 상세 보기`}
        className="block focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand"
      >
        <div className="relative aspect-[2.33/1] overflow-hidden">
          <TrendImage trend={trend} category={category} />
          <span className="absolute left-3 top-3 rounded-md bg-brand px-2 py-1 text-[11px] font-medium text-ink">
            {category.cat_name}
          </span>
        </div>
        <div className="min-h-[58px] bg-white px-2.5 py-2">
          <h2 className="line-clamp-1 text-[15px] font-bold leading-5 text-ink">
            {trend.title}
          </h2>
          <p className="mt-0.5 line-clamp-1 text-[12px] leading-[18px] text-sub">
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
