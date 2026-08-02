import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "트렌딧",
  description: "매일 아침, 패션·푸드 트렌드 한 입 — 출근길 1분 큐레이션",
};

// 모바일 우선 PWA — 세로 고정 느낌 + 코랄 테마 컬러
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ff6f61",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* 데스크톱/태블릿에선 480px 폰 프레임을 가운데 정렬 (wireframes.md 반응형 전략) */}
      <body className="bg-neutral-200 antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
