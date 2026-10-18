"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { formatCalendarDate, isSameDay } from "@/lib/calendar";
import CalendarPicker from "./CalendarPicker";
import { CalendarIcon, ChevronRightIcon } from "./icons";

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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarId = useId();
  const dateButtonRef = useRef<HTMLButtonElement>(null);
  const todayTimestamp = useSyncExternalStore<number | null>(
    subscribeToToday,
    getTodaySnapshot,
    getServerTodaySnapshot,
  );

  if (todayTimestamp === null) {
    return (
      <div className="px-[34px] pb-1 pt-1" aria-busy="true" aria-label="날짜 불러오는 중">
        <div className="h-10 w-44 animate-pulse rounded-lg bg-line" />
      </div>
    );
  }

  const today = new Date(todayTimestamp);
  const selected = selectedDate ?? today;
  const displayDate = `${selected.getFullYear()}. ${String(selected.getMonth() + 1).padStart(2, "0")}. ${String(selected.getDate()).padStart(2, "0")} (${WEEKDAYS_KO[selected.getDay()]})`;

  function closeCalendar() {
    setCalendarOpen(false);
    dateButtonRef.current?.focus();
  }

  function selectDate(date: Date) {
    if (date.getTime() > getTodaySnapshot()) return;
    setSelectedDate(date);
    closeCalendar();
  }

  return (
    <div className="px-[34px] pb-1 pt-1">
      <div className="flex items-center justify-between gap-2">
        <button
          ref={dateButtonRef}
          type="button"
          aria-label={`${formatCalendarDate(selected)}, 날짜 선택`}
          aria-expanded={calendarOpen}
          aria-controls={calendarId}
          onClick={() => setCalendarOpen((open) => !open)}
          className="flex min-h-10 min-w-0 items-center gap-2 rounded-lg text-left text-[13px] font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <CalendarIcon size={16} className="shrink-0" />
          <span>{displayDate}</span>
          <ChevronRightIcon size={14} className={`shrink-0 transition-transform ${calendarOpen ? "-rotate-90" : "rotate-90"}`} />
        </button>
        {!isSameDay(selected, today) && (
          <button
            type="button"
            onClick={() => selectDate(today)}
            className="min-h-10 shrink-0 rounded-full px-2 text-xs font-semibold text-ink hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
          >
            오늘
          </button>
        )}
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
    </div>
  );
}
