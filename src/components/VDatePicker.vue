<template>
  <picker-container
    :title="headerTitle"
    :submitTitle="submitT"
    :color="color"
    :modal="modal"
    :showModal="showModal"
    @close="$emit('update:showModal', false)"
    @submit="submit"
  >
    <template #header>
      <slot name="header" />
    </template>
    <v-wheel-select
      v-model="selectedDay"
      class="select"
      :title="dayTitle"
      :options="days"
      :color="color"
    />
    <v-wheel-select
      v-model="selectedMonth"
      class="select"
      :title="monthTitle"
      :options="months"
      :color="color"
    />
    <v-wheel-select
      v-model="selectedYear"
      class="select"
      :title="yearTitle"
      :options="years"
      :color="color"
    />

    <template #submit>
      <slot name="submit" />
    </template>
  </picker-container>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import jalaliday from "jalaliday";
import dayjs from "dayjs";
dayjs.extend(jalaliday);

// components
import PickerContainer from "./PickerContainer.vue";
import VWheelSelect from "./VWheelSelect.vue";

// libs
import locales from "../lib/locales";
import { getData } from "../lib/date";

// types
import { Locale, Option } from "../types";
type DateInfo = {
  year: number;
  month: number;
  day: number;
};

export default Vue.extend({
  name: "VDatePicker",
  components: { VWheelSelect, PickerContainer },
  data() {
    const { selectedYear, selectedMonth, selectedDay, calendar } = getData(
      this.value,
      this.jalali,
      this.maxDate,
      this.minDate
    );
    return {
      selectedYear,
      selectedMonth,
      selectedDay,
      calendar,
      years: [] as Option[],
    };
  },
  props: {
    value: {
      type: [Date, String] as PropType<Date | string | null>,
      required: false,
    },
    title: {
      type: String,
      default: undefined,
    },
    submitTitle: {
      type: String,
      default: undefined,
    },
    jalali: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#188EF2",
    },
    modal: {
      type: Boolean,
      default: false,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    yearThreshold: {
      type: Number,
      default: 100,
    },
    locale: {
      type: Object as PropType<Locale>,
      default: null,
    },
    minDate: {
      type: [Date, String],
      default: null,
    },
    maxDate: {
      type: [Date, String],
      default: null,
    },
  },
  computed: {
    headerTitle(): string {
      if (this.title) {
        return this.title;
      } else if (this.jalali) {
        return "انتخاب تاریخ";
      } else {
        return "Choose date";
      }
    },
    submitT(): string {
      if (this.submitTitle) {
        return this.submitTitle;
      } else if (this.jalali) {
        return "تایید";
      } else {
        return "submit";
      }
    },
    locale_(): Locale {
      if (this.locale) {
        return this.locale;
      } else {
        return this.jalali ? locales["fa"] : locales["en"];
      }
    },
    dayTitle(): string {
      return this.locale_.day;
    },
    monthTitle(): string {
      return this.locale_.month;
    },
    yearTitle(): string {
      return this.locale_.year;
    },
    max(): DateInfo | null {
      if (this.maxDate) {
        return {
          year: dayjs(this.maxDate).calendar(this.calendar).year(),
          month: dayjs(this.maxDate).calendar(this.calendar).month(),
          day: dayjs(this.maxDate).calendar(this.calendar).date(),
        };
      } else {
        return null;
      }
    },
    min(): DateInfo | null {
      if (this.minDate) {
        return {
          year: dayjs(this.minDate).calendar(this.calendar).year(),
          month: dayjs(this.minDate).calendar(this.calendar).month(),
          day: dayjs(this.minDate).calendar(this.calendar).date(),
        };
      } else {
        return null;
      }
    },
    isMaxYearSelected(): boolean {
      return this.selectedYear === this.max?.year;
    },
    isMaxMonthSelected(): boolean {
      return this.isMaxYearSelected && this.selectedMonth === this.max?.month;
    },
    isMinYearSelected(): boolean {
      return this.selectedYear === this.min?.year;
    },
    isMinMonthSelected(): boolean {
      return this.isMinYearSelected && this.selectedMonth === this.min?.month;
    },
    months(): Option[] {
      let months = this.locale_.months.map((m, i) => ({ title: m, key: i }));
      if (this.max && this.isMaxYearSelected) {
        months = months.filter((y) => this.max && y.key <= this.max.month);
      }
      if (this.min && this.isMinYearSelected) {
        months = months.filter((y) => this.min && y.key >= this.min.month);
      }
      return months;
    },
    days(): Option[] {
      let days = dayjs()
        .calendar(this.calendar)
        .year(this.selectedYear)
        .month(this.selectedMonth)
        .daysInMonth();
      let options: Option[] = [];
      for (let i = 1; i <= days; i++) {
        options.push({
          title: `${i}`,
          key: i,
        });
      }
      if (this.max && this.isMaxMonthSelected) {
        options = options.filter((y) => this.max && y.key <= this.max.day);
      }
      if (this.min && this.isMinMonthSelected) {
        options = options.filter((y) => this.min && y.key >= this.min.day);
      }
      return options;
    },
  },
  watch: {
    jalali(value: boolean) {
      const { selectedYear, selectedMonth, selectedDay, calendar } = getData(
        this.value,
        value,
        this.maxDate,
        this.minDate
      );
      this.selectedYear = selectedYear;
      this.selectedMonth = selectedMonth;
      this.selectedDay = selectedDay;
      this.calendar = calendar;
      this.setYears();
    },
  },
  beforeMount() {
    this.setYears();
  },
  methods: {
    setYears() {
      let years: Option[] = [];
      for (
        let i = this.selectedYear - this.yearThreshold;
        i <= this.selectedYear + this.yearThreshold;
        i++
      ) {
        years.push({
          title: `${i}`,
          key: i,
        });
      }
      if (this.max) {
        years = years.filter((y) => this.max && y.key <= this.max.year);
      }
      if (this.min) {
        years = years.filter((y) => this.min && y.key >= this.min.year);
      }
      this.years = years;
    },
    submit() {
      let date = dayjs()
        .calendar(this.calendar)
        .year(this.selectedYear)
        .month(this.selectedMonth)
        .date(this.selectedDay);
      if (typeof this.value === "string") {
        this.$emit("input", dayjs(date).toISOString());
      } else {
        this.$emit("input", dayjs(date).toDate());
      }
      this.$emit("submit");
    },
  },
});
</script>
