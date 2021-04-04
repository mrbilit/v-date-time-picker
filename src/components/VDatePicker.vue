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
import moment, { max } from "moment-jalaali";

// components
import PickerContainer from "./PickerContainer.vue";
import VWheelSelect from "./VWheelSelect.vue";

// libs
import locales from "../lib/locales";

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
    const date = moment(this.value || new Date());
    const dateYear = this.Jalali ? date.jYear() : date.year();
    const dateMonth = this.Jalali ? date.jMonth() : date.month();
    const dateDay = this.Jalali ? date.jDate() : date.date();
    return {
      selectedYear: dateYear,
      selectedMonth: dateMonth,
      selectedDay: dateDay,
      years: [] as Option[],
    };
  },
  props: {
    value: {
      type: [Date, String],
      required: true,
    },
    title: {
      type: String,
      default: undefined,
    },
    submitTitle: {
      type: String,
      default: undefined,
    },
    Jalali: {
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
      } else if (this.Jalali) {
        return "انتخاب تاریخ";
      } else {
        return "Choose date";
      }
    },
    submitT(): string {
      if (this.submitTitle) {
        return this.submitTitle;
      } else if (this.Jalali) {
        return "تایید";
      } else {
        return "submit";
      }
    },
    locale_(): Locale {
      if (this.locale) {
        return this.locale;
      } else {
        return this.Jalali ? locales["fa"] : locales["en"];
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
        const maxDate = moment(this.maxDate);
        return this.Jalali
          ? {
              year: maxDate.jYear(),
              month: maxDate.jMonth(),
              day: maxDate.jDate(),
            }
          : {
              year: maxDate.year(),
              month: maxDate.month(),
              day: maxDate.date(),
            };
      } else {
        return null;
      }
    },
    min(): DateInfo | null {
      if (this.minDate) {
        const minDate = moment(this.minDate);
        return this.Jalali
          ? {
              year: minDate.jYear(),
              month: minDate.jMonth(),
              day: minDate.jDate(),
            }
          : {
              year: minDate.year(),
              month: minDate.month(),
              day: minDate.date(),
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
      let days = 30;
      let options: Option[] = [];
      const date = moment();
      if (this.Jalali) {
        days = moment.jDaysInMonth(this.selectedYear, this.selectedMonth);
      } else {
        date.year(this.selectedYear);
        date.month(this.selectedMonth);
        days = date.daysInMonth();
      }
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
      const date = moment();
      if (this.Jalali) {
        date.jYear(this.selectedYear);
        date.jMonth(this.selectedMonth);
        date.jDate(this.selectedDay);
      } else {
        date.year(this.selectedYear);
        date.month(this.selectedMonth);
        date.date(this.selectedDay);
      }
      if (typeof this.value === "string") {
        this.$emit("input", date.toISOString());
      } else {
        this.$emit("input", date.toDate());
      }
      this.$emit("submit");
    },
  },
});
</script>
