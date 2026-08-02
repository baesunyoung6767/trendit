"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

// 큰 날짜 + 주간 날짜 선택기 (01_Main.png 참고).
// 목업 단계: 날짜를 바꿔도 데이터는 그대로(오늘 목업 1일치만 존재).
// 나중에 선택 날짜로 getTodayTrends(date)를 호출하도록 확장한다.

const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];

function startOfWeek(d: Date): Date {
  const x = new Date(d);
  x.setDate(x.getDate() - x.getDay()); // 일요일 기준
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatLong(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}년 ${m}월 ${day}일`;
}

export default function DateHeader({ initialDate }: { initialDate: string }) {
  const init = new Date(
    initialDate.length <= 10 ? `${initialDate}T00:00:00` : initialDate,
  );
  const [selected, setSelected] = useState<Date>(init);
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeek(init));

  // 오늘 날짜는 클라이언트에서만 계산 (SSR/하이드레이션 불일치 방지)
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="px-5 pt-6 pb-2">
      <h1 className="text-xl font-bold tracking-tight text-ink">
        {formatLong(selected)}
      </h1>

      <div className="mt-4 flex items-center">
        <button
          type="button"
          aria-label="이전 주"
          onClick={() => setWeekStart(addDays(weekStart, -7))}
          className="flex h-10 w-6 shrink-0 items-center justify-center text-coral"
        >
          <ChevronLeftIcon size={18} />
        </button>

        <div className="grid flex-1 grid-cols-7">
          {days.map((d) => {
            const on = isSameDay(d, selected);
            const isToday = today != null && isSameDay(d, today);
            return (
              <button
                key={d.getTime()}
                type="button"
                onClick={() => setSelected(d)}
                className="flex flex-col items-center gap-1 py-1"
              >
                <span
                  className={`text-xs ${on ? "font-semibold text-coral" : "text-sub"}`}
                >
                  {WEEKDAYS_KO[d.getDay()]}
                </span>
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-[15px] leading-none ${
                    on
                      ? "bg-coral font-bold text-white"
                      : isToday
                        ? "font-semibold text-coral"
                        : "text-ink"
                  }`}
                >
                  {d.getDate()}
                </span>
                {/* 오늘 표시 점 (선택된 날에는 표시 안 함) */}
                <span
                  className={`h-1 w-1 rounded-full ${
                    isToday && !on ? "bg-coral" : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="다음 주"
          onClick={() => setWeekStart(addDays(weekStart, 7))}
          className="flex h-10 w-6 shrink-0 items-center justify-center text-coral"
        >
          <ChevronRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
