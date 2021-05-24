import jalaliday from "jalaliday";
import dayjs from "dayjs";
dayjs.extend(jalaliday);
type DateType = string | Date | null;
export const getData = (
  value: DateType,
  isJalali: boolean,
  maxDate: DateType,
  minDate: DateType
) => {
  let date = value || new Date();
  if (minDate && dayjs(date).isBefore(minDate)) {
    date = minDate;
  }
  if (maxDate && dayjs(date).isAfter(maxDate)) {
    date = maxDate;
  }
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
