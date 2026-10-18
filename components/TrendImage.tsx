import Image from "next/image";
import type { Category, Trend } from "@/lib/types";

export default function TrendImage({ trend, category }: { trend: Trend; category: Category }) {
  return (
    <div className="absolute inset-0" style={{ backgroundColor: trend.image_url ? category.color : "#d9d9d9" }}>
      {trend.image_url ? (
        <Image src={trend.image_url} alt={trend.title} fill sizes="(max-width: 480px) 100vw, 480px" className="object-cover" unoptimized />
      ) : (
        <span className="sr-only">{trend.title} 이미지 준비 중</span>
      )}
    </div>
  );
}
