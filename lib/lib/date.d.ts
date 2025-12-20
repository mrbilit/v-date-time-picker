type DateType = string | Date | null;
export declare const getData: (value: DateType, isJalali: boolean, maxDate: DateType | undefined, minDate: DateType | undefined) => {
    selectedYear: number;
    selectedMonth: number;
    selectedDay: number;
    calendar: "jalali" | "gregory";
};
export {};
