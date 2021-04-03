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
    <wheel-select
      v-model="selectedDay"
      class="select"
      :title="dayTitle"
      :options="days"
      :color="color"
    />
    <wheel-select
      v-model="selectedMonth"
      class="select"
      :title="monthTitle"
      :options="months"
      :color="color"
    />
    <wheel-select
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
import moment from "moment-jalaali";

// components
import PickerContainer from "./PickerContainer.vue";
import WheelSelect, { Option } from "./WheelSelect.vue";

// libs
import locales from "../lib/locales";

// types
import { Locale } from "../types";

export default Vue.extend({
  name: "DatePicker",
  components: { WheelSelect, PickerContainer },
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
      type: String,
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
    months(): Option[] {
      return this.locale_.months.map((m, i) => ({ title: m, key: i }));
    },
    days(): Option[] {
      let days = 30;
      const options: Option[] = [];
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
      return options;
    },
  },
  beforeMount() {
    this.setYears();
  },
  methods: {
    setYears() {
      const years: Option[] = [];
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
      this.$emit("input", date.toISOString());
    },
  },
});
</script>
