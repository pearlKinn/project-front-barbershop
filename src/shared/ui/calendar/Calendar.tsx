import LeftButtonIcon from "@assets/buttons/LButton-icon.svg?react";
import RightButtonIcon from "@assets/buttons/RButton-icon.svg?react";
import dayjs from "dayjs";
import { useState } from "react";

import styles from "./Calender.module.scss";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = endOfMonth.date();
  const startDay = startOfMonth.day();
  const prevMonthDays = startOfMonth.subtract(1, "month").endOf("month").date();
  const dayOfTheWeek = ["월", "화", "수", "목", "금", "토", "일"];

  const adjustedStartDay = startDay === 0 ? 6 : startDay - 1;

  // 이전 달 날짜 (빈 공간)
  const prevDays = Array.from({ length: adjustedStartDay }, (_, i) => (
    <button
      type="button"
      key={`prev-${i}`}
      className={`${styles.day} ${styles.empty}
     `}
    >
      {prevMonthDays - adjustedStartDay + i + 1}
    </button>
  ));

  // 현재 달 날짜
  const dayArray = Array.from({ length: daysInMonth }, (_, i) => (
    <button
      type="button"
      key={i + 1}
      className={`${styles.day} ${selectedDate === i + 1 ? styles.selected : ""}`}
      onClick={() => handleDateClick(i + 1)}
    >
      {i + 1}
    </button>
  ));

  // 다음 달 날짜 (빈 공간)
  const totalDays = prevDays.length + daysInMonth;
  const nextDaysCount = totalDays < 42 ? 42 - totalDays : 0;
  const nextDays = Array.from({ length: nextDaysCount }, (_, i) => (
    <button
      type="button"
      key={`next-${i}`}
      className={`${styles.day} ${styles.empty}`}
    >
      {i + 1}
    </button>
  ));

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleDateClick = (date: number) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles["calendar"]}>
      <div className={styles["calendar-header"]}>
        <span>날짜선택</span>

        {/* 날짜 */}
        <div className={styles["calendar-controls"]}>
          <button
            type="button"
            className="prev-btn"
            onClick={goToPreviousMonth}
          >
            <LeftButtonIcon />
          </button>
          <div>{currentDate.format("YYYY.MM")}</div>
          <button type="button" className="next-btn" onClick={goToNextMonth}>
            <RightButtonIcon />
          </button>
        </div>
      </div>

      <div className={styles["calendar-body"]}>
        {/* 요일 (월 ~ 금) */}
        <div className={styles["calendar-weekdays"]}>
          {dayOfTheWeek.map(day => (
            <div key={day} className={styles["dayOfTheWeek"]}>
              {day}
            </div>
          ))}
        </div>

        {/* @COMMNET : prevDays, dayArra, nexDays 별도 컴포넌트로 분리 => 컴포넌트인지 한 눈에 알 수 있으면 더 좋을 것 같아요. 더불어, 컴포넌트 내에 자식 컴포넌트들도 레벨을 맞춰주기 위해서, [요일], [캘린더 컨트롤]도 컴포넌트로 분리 하면 좋을 것 같요. 분리된 컴포넌트들의 위치는 calendar폴더(동일 폴더)로 */}
        {prevDays}
        {dayArray}
        {nextDays}
      </div>
    </div>
  );
};
