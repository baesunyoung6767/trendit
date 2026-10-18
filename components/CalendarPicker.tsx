"use client";

import { useState } from "react";
import { addDays, formatCalendarDate, isSameDay, startOfMonth, startOfWeek } from "@/lib/calendar";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

type CalendarView = "days" | "months" | "years";
const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];
const YEAR_PAGE_SIZE = 12;
const NAV_LABELS = {
  days: ["이전 달", "다음 달"],
  months: ["이전 연도", "다음 연도"],
  years: ["이전 연도 범위", "다음 연도 범위"],
};

export default function CalendarPicker({
  id, selectedDate, maxDate, onSelect, onClose,
}: {
  id: string;
  selectedDate: Date;
  maxDate: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
}) {
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(selectedDate));
  const [view, setView] = useState<CalendarView>("days");
  const [yearPageEnd, setYearPageEnd] = useState<number | null>(null);
  const maxMonth = startOfMonth(maxDate);
  const maxYear = maxDate.getFullYear();
  const monthYear = visibleMonth.getFullYear();
  const monthIndex = visibleMonth.getMonth();
  const currentYearPageEnd = maxYear - Math.floor((maxYear - monthYear) / YEAR_PAGE_SIZE) * YEAR_PAGE_SIZE;
  const lastYear = yearPageEnd ?? currentYearPageEnd;
  const years = Array.from({ length: YEAR_PAGE_SIZE }, (_, index) => lastYear - YEAR_PAGE_SIZE + 1 + index);
  const monthDays = Array.from({ length: 42 }, (_, index) => addDays(startOfWeek(visibleMonth), index));
  const canGoNext = view === "days" ? visibleMonth < maxMonth
    : view === "months" ? monthYear < maxYear : lastYear < maxYear;
  const navigationClass = "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink enabled:hover:bg-brand-soft disabled:cursor-not-allowed disabled:text-sub/30 focus-visible:outline-2 focus-visible:outline-brand";
  const headerClass = "flex min-h-10 items-center gap-1 rounded-lg px-2.5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand";
  const optionClass = "min-h-12 rounded-xl text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:text-sub/30";

  function selectYear(year: number) {
    if (year > maxYear) return;
    const next = new Date(visibleMonth);
    next.setFullYear(year);
    if (next > maxMonth) next.setMonth(maxMonth.getMonth());
    setVisibleMonth(next);
    setView("months");
  }

  function selectMonth(month: number) {
    const next = new Date(visibleMonth);
    next.setMonth(month);
    if (next > maxMonth) return;
    setVisibleMonth(next);
    setView("days");
  }

  function navigate(offset: number) {
    if (offset > 0 && !canGoNext) return;
    if (view === "years") {
      setYearPageEnd(Math.min(maxYear, lastYear + offset * YEAR_PAGE_SIZE));
    } else if (view === "months") {
      selectYear(monthYear + offset);
    } else {
      const next = new Date(visibleMonth);
      next.setMonth(next.getMonth() + offset);
      if (next <= maxMonth) setVisibleMonth(next);
    }
  }

  return (
    <section
      id={id}
      aria-label="날짜 선택 달력"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
        }
      }}
      className="mt-3 rounded-2xl border border-line bg-surface p-3 shadow-sm"
    >
      <div className="flex items-center justify-between gap-2">
        <button type="button" aria-label={NAV_LABELS[view][0]} onClick={() => navigate(-1)} className={navigationClass}>
          <ChevronLeftIcon size={18} />
        </button>
        <div className="flex items-center gap-1 p-1">
          <button
            type="button"
            aria-label="연도 선택"
            aria-expanded={view === "years"}
            aria-controls={`${id}-options`}
            onClick={() => {
              setYearPageEnd(currentYearPageEnd);
              setView(view === "years" ? "days" : "years");
            }}
            className={`${headerClass} ${view === "years" ? "bg-brand-soft text-ink" : "text-ink hover:bg-brand-soft"}`}
          >
            {monthYear}년
            <ChevronRightIcon size={12} className={view === "years" ? "-rotate-90" : "rotate-90"} />
          </button>
          <button
            type="button"
            aria-label="월 선택"
            aria-expanded={view === "months"}
            aria-controls={`${id}-options`}
            onClick={() => setView(view === "months" ? "days" : "months")}
            className={`${headerClass} ${view === "months" ? "bg-brand-soft text-ink" : "text-ink hover:bg-brand-soft"}`}
          >
            {monthIndex + 1}월
            <ChevronRightIcon size={12} className={view === "months" ? "-rotate-90" : "rotate-90"} />
          </button>
        </div>
        <button type="button" aria-label={NAV_LABELS[view][1]} disabled={!canGoNext} onClick={() => navigate(1)} className={navigationClass}>
          <ChevronRightIcon size={18} />
        </button>
      </div>

      <div id={`${id}-options`} className="mt-3">
        {view === "years" ? (
          <>
            <p className="mb-3 text-center text-xs text-sub" aria-live="polite">{years[0]}년 – {lastYear}년</p>
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="연도 목록">
              {years.map((year) => (
                <button key={year} type="button" aria-pressed={year === monthYear} onClick={() => selectYear(year)} className={`${optionClass} ${year === monthYear ? "bg-brand font-bold text-ink" : "text-ink hover:bg-brand-soft"}`}>
                  {year}년
                </button>
              ))}
            </div>
          </>
        ) : view === "months" ? (
          <div className="grid grid-cols-4 gap-2" role="group" aria-label={`${monthYear}년 월 목록`}>
            {Array.from({ length: 12 }, (_, month) => {
              const isFuture = monthYear === maxYear && month > maxDate.getMonth();
              return (
                <button key={month} type="button" disabled={isFuture} aria-pressed={month === monthIndex} onClick={() => selectMonth(month)} className={`${optionClass} ${month === monthIndex ? "bg-brand font-bold text-ink" : "text-ink enabled:hover:bg-brand-soft"}`}>
                  {month + 1}월
                </button>
              );
            })}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-7 text-center text-xs text-sub" aria-hidden="true">
              {WEEKDAYS_KO.map((weekday) => <span key={weekday} className="py-2">{weekday}</span>)}
            </div>
            <div className="grid grid-cols-7" role="group" aria-label={`${monthYear}년 ${monthIndex + 1}월 날짜`}>
              {monthDays.map((date) => {
                const on = isSameDay(date, selectedDate);
                const isToday = isSameDay(date, maxDate);
                const isFuture = date > maxDate;
                const inMonth = date.getMonth() === monthIndex;
                return (
                  <button
                    key={date.getTime()}
                    type="button"
                    disabled={isFuture}
                    aria-label={formatCalendarDate(date)}
                    aria-pressed={on}
                    aria-current={isToday ? "date" : undefined}
                    onClick={() => { if (!isFuture) onSelect(date); }}
                    className={`mx-auto flex h-10 w-10 max-w-full items-center justify-center rounded-full text-sm transition-colors disabled:cursor-not-allowed disabled:text-sub/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${on ? "bg-brand font-bold text-ink" : isToday ? "bg-brand-soft font-bold text-ink" : inMonth ? "text-ink enabled:hover:bg-bubble" : "text-sub/60 enabled:hover:bg-bubble"}`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line pt-2">
        <p className="text-xs text-sub">미래 날짜는 선택할 수 없어요</p>
        <button type="button" onClick={onClose} className="min-h-11 rounded-lg px-3 text-sm text-sub hover:bg-bubble focus-visible:outline-2 focus-visible:outline-brand">닫기</button>
      </div>
    </section>
  );
}
