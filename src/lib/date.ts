import jalaliday from "jalaliday";
import dayjs from "dayjs";
dayjs.extend(jalaliday);
export const getData = (value: string | null | Date, isJalali: boolean) => {
  const date = value || new Date();
  const calendar: "jalali" | "gregory" = isJalali ? "jalali" : "gregory";
  const dateYear = dayjs(date).calendar(calendar).year();
  const dateMonth = dayjs(date).calendar(calendar).month();
  const dateDay = dayjs(date).calendar(calendar).date();

  return {
    selectedYear: dateYear,
    selectedMonth: dateMonth,
    selectedDay: dateDay,
    calendar: calendar,
  };
};
