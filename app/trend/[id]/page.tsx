import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LikeButton from "@/components/LikeButton";
import TrendImage from "@/components/TrendImage";
import { getCategories, getTrendById } from "@/lib/data";
import { formatDetailDate } from "@/lib/format";

export default async function TrendDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [trend, categories] = await Promise.all([getTrendById(id), getCategories()]);
  if (!trend) notFound();
  const category = categories.find((item) => item.cat_code === trend.cat_code);
  if (!category) notFound();

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-white pt-[env(safe-area-inset-top)]">
        <div className="flex h-14 items-center justify-between px-5">
          <Link href="/" className="rounded text-xl font-bold tracking-tight text-coral focus-visible:outline-2 focus-visible:outline-coral" aria-label="트렌딧 홈">트렌딧</Link>
          <div className="-mr-2 flex items-center gap-4">
            <LikeButton trendId={trend.trend_id} initialLiked={trend.liked} />
            <Link href="/" aria-label="상세 화면 닫기" className="flex h-11 w-11 items-center justify-center rounded-full text-sub hover:bg-bubble focus-visible:outline-2 focus-visible:outline-coral">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 pb-[env(safe-area-inset-bottom)]">
        <article>
          <div className="relative aspect-video w-full overflow-hidden">
            <TrendImage trend={trend} category={category} />
          </div>
          <div className="px-5 pb-8 pt-6">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full px-3 py-1.5 text-[11px] font-medium text-white" style={{ backgroundColor: category.color }}>#{category.cat_name}</span>
              <time dateTime={trend.created_at} className="text-[13px] text-sub">{formatDetailDate(trend.created_at)}</time>
            </div>
            <h1 className="mt-3 break-keep text-2xl font-semibold leading-8 text-ink">{trend.title}</h1>
            <div className="mt-4 space-y-5 text-[15px] leading-[1.6] text-ink">
              {trend.detail_content.split(/\n\s*\n/).filter(Boolean).map((paragraph, index) => <p key={index} className="whitespace-pre-line">{paragraph}</p>)}
            </div>
            <section className="mt-8" aria-labelledby="recommendation-heading">
              <h2 id="recommendation-heading" className="text-xl font-semibold leading-7 text-ink">{trend.rec_comment_title}</h2>
              <div className="mt-4 flex items-center gap-3">
                <Image src="/character.png" alt="트렌딧 마스코트 여우" width={96} height={128} className="h-auto w-20 shrink-0 min-[400px]:w-24" />
                <div className="relative min-w-0 flex-1 rounded-2xl bg-bubble p-4 before:absolute before:-left-2 before:top-8 before:border-y-8 before:border-r-8 before:border-y-transparent before:border-r-bubble before:content-['']">
                  <p className="break-keep text-[15px] leading-[22px] text-ink">{trend.rec_comment}</p>
                  <div className="mt-3 flex flex-col items-start gap-3">
                    {trend.external_link.map((link) => (
                      <a key={link.link_id} href={link.link_name} target="_blank" rel="noopener noreferrer" className="break-keep rounded text-[13px] font-semibold leading-5 text-coral underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-coral">
                        {link.title} <span aria-hidden="true">→</span><span className="sr-only"> (새 탭)</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            {trend.trend_search.length > 0 && (
              <section className="mt-8" aria-labelledby="related-heading">
                <h2 id="related-heading" className="text-[13px] font-medium text-sub">🔍 함께 검색했어요</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {trend.trend_search.map((search) => (
                    <li key={search.search_id}>
                      <a href={`https://search.naver.com/search.naver?query=${encodeURIComponent(search.content)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center rounded-full border border-coral bg-white px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-coral-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral">
                        {search.content}<span className="sr-only"> 검색 (새 탭)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
