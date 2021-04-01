export type Locale = {
  day: string;
  month: string;
  year: string;
  months: string[];
};
export default {
  fa: {
    day: "روز",
    month: "ماه",
    year: "سال",
    months: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ],
  },
  en: {
    day: "day",
    month: "month",
    year: "year",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
} as { [key: string]: Locale };
