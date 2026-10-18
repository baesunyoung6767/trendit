"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { HeartIcon } from "./icons";

const LikesContext = createContext<{
  likes: Record<string, boolean>;
  toggle: (id: string, initial: boolean) => void;
} | null>(null);

// 목업용 상태: 페이지 이동 중에는 공유하고, 새로고침하면 초기값으로 돌아간다.
export function LikesProvider({ children }: { children: ReactNode }) {
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  function toggle(id: string, initial: boolean) {
    setLikes((current) => ({ ...current, [id]: !(current[id] ?? initial) }));
  }
  return <LikesContext.Provider value={{ likes, toggle }}>{children}</LikesContext.Provider>;
}

export default function LikeButton({
  trendId, initialLiked = false, onImage = false,
}: { trendId: string; initialLiked?: boolean; onImage?: boolean }) {
  const context = useContext(LikesContext);
  if (!context) throw new Error("LikeButton requires LikesProvider");
  const liked = context.likes[trendId] ?? initialLiked;
  const heartColor = onImage
    ? liked ? "text-brand" : "text-white"
    : liked ? "text-brand" : "text-ink";
  return (
    <button
      type="button"
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      aria-pressed={liked}
      onClick={() => context.toggle(trendId, initialLiked)}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${onImage ? "drop-shadow" : "hover:bg-bubble"}`}
    >
      <HeartIcon size={24} filled={liked} className={heartColor} />
    </button>
  );
}
