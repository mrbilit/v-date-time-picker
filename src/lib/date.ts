import jalaliPlugin from 'jalali-plugin-dayjs';
import dayjs from "dayjs";

dayjs.extend(jalaliPlugin);
type DateType = string | Date | null;
export const getData = (
    value: DateType,
    isJalali: boolean,
    maxDate: DateType | undefined,
    minDate: DateType | undefined
) => {
    let date = value || new Date();
    if (minDate && dayjs(date).isBefore(minDate)) {
        date = minDate;
    }
    if (maxDate && dayjs(date).isAfter(maxDate)) {
        date = maxDate;
    }
    const calendar: 'jalali' | 'gregory' = isJalali ? "jalali" : "gregory";
    console.log(value);
    if (!value && minDate) {
        const minDayjs = dayjs(minDate).calendar(calendar);
        const dateDayjs = dayjs(date).calendar(calendar).set('year', minDayjs.year() + 1).set('month', 0).set('date', 1);
        if (!dateDayjs.isBefore(minDate)) {
            date = dateDayjs.toDate();
        }
    }
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
