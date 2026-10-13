"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { addDays, formatCalendarDate, isSameDay, startOfWeek } from "@/lib/calendar";
import CalendarPicker from "./CalendarPicker";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

// 브라우저의 오늘을 기본으로 하는 큰 날짜 + 주간 선택기 + 월간 달력.
// 목업 단계: 날짜를 바꿔도 데이터는 그대로(오늘 목업 1일치만 존재).
// 나중에 선택 날짜로 getTodayTrends(date)를 호출하도록 확장한다.

const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];

function getTodaySnapshot(): number {
  const today = new Date();
  return today.setHours(0, 0, 0, 0);
}

function getServerTodaySnapshot(): null {
  return null;
}

function subscribeToToday(onChange: () => void): () => void {
  const intervalId = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(intervalId);
}

export default function DateHeader() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [visibleWeek, setVisibleWeek] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarId = useId();
  const dateButtonRef = useRef<HTMLButtonElement>(null);

  // 서버와 하이드레이션에서는 null, 이후 브라우저의 현재 날짜를 읽는다.
  // 스냅샷은 같은 날짜 동안 동일한 값이며, 날짜가 바뀌었을 때만 갱신된다.
  const todayTimestamp = useSyncExternalStore<number | null>(
    subscribeToToday,
    getTodaySnapshot,
    getServerTodaySnapshot,
  );

  // 브라우저 날짜를 읽기 전에는 목업 날짜를 대신 보여주지 않는다.
  if (todayTimestamp === null) {
    return (
      <div className="px-5 pt-6 pb-2" aria-busy="true" aria-label="날짜 불러오는 중">
        <div className="h-11 w-56 animate-pulse rounded-lg bg-line" />
        <div className="mt-4 h-16 animate-pulse rounded-lg bg-line" />
      </div>
    );
  }

  const today = new Date(todayTimestamp);
  const selected = selectedDate ?? today;
  const weekStart = visibleWeek ?? startOfWeek(selected);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const currentWeek = startOfWeek(today);
  const canGoNextWeek = addDays(weekStart, 7) <= currentWeek;

  function closeCalendar() {
    setCalendarOpen(false);
    dateButtonRef.current?.focus();
  }

  function selectDate(date: Date) {
    if (date.getTime() > getTodaySnapshot()) return;
    setSelectedDate(date);
    setVisibleWeek(startOfWeek(date));
    closeCalendar();
  }

  function moveWeek(offset: number) {
    const next = addDays(weekStart, offset * 7);
    if (next <= currentWeek) setVisibleWeek(next);
  }

  return (
    <div className="px-5 pt-6 pb-2">
      <div className="flex items-center justify-between gap-2">
        <h1 className="min-w-0 text-xl font-bold tracking-tight text-ink">
          <button
            ref={dateButtonRef}
            type="button"
            aria-label={`${formatCalendarDate(selected)}, 날짜 선택`}
            aria-expanded={calendarOpen}
            aria-controls={calendarId}
            onClick={() => setCalendarOpen((open) => !open)}
            className="flex min-h-11 items-center gap-2 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
          >
            {formatCalendarDate(selected)}
            <ChevronRightIcon size={16} className={`shrink-0 text-coral transition-transform ${calendarOpen ? "-rotate-90" : "rotate-90"}`} />
          </button>
        </h1>
        <button
          type="button"
          onClick={() => selectDate(today)}
          className="min-h-11 shrink-0 rounded-full px-3 text-sm font-semibold text-coral hover:bg-coral-soft focus-visible:outline-2 focus-visible:outline-coral"
        >
          오늘
        </button>
      </div>

      {calendarOpen && (
        <CalendarPicker
          id={calendarId}
          selectedDate={selected}
          maxDate={today}
          onSelect={selectDate}
          onClose={closeCalendar}
        />
      )}

      <div className="mt-4 flex items-center">
        <button
          type="button"
          aria-label="이전 주"
          onClick={() => moveWeek(-1)}
          className="flex h-10 w-6 shrink-0 items-center justify-center text-coral"
        >
          <ChevronLeftIcon size={18} />
        </button>

        <div className="grid flex-1 grid-cols-7">
          {days.map((d) => {
            const on = isSameDay(d, selected);
            const isToday = todayTimestamp !== null && d.getTime() === todayTimestamp;
            const isFuture = d.getTime() > todayTimestamp;
            return (
              <button
                key={d.getTime()}
                type="button"
                disabled={isFuture}
                aria-label={formatCalendarDate(d)}
                aria-pressed={on}
                aria-current={isToday ? "date" : undefined}
                onClick={() => selectDate(d)}
                className="flex flex-col items-center gap-1 py-1 disabled:cursor-not-allowed disabled:opacity-30"
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
          disabled={!canGoNextWeek}
          onClick={() => moveWeek(1)}
          className="flex h-10 w-6 shrink-0 items-center justify-center text-coral disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
