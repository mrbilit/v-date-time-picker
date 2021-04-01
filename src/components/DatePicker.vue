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
import Vue from "vue";
import moment from "moment-jalaali";

// components
import PickerContainer from "./PickerContainer.vue";
import WheelSelect, { Option } from "./WheelSelect.vue";

// libs
import locales, { Locale } from "../lib/locales";

export default Vue.extend({
  name: "DatePicker",
  components: { WheelSelect, PickerContainer },
  data() {
    const current = moment(new Date());
    const currentYear = this.jalaali ? current.jYear() : current.year();
    const years: Option[] = [];
    for (let i = currentYear - 100; i < currentYear + 100; i++) {
      years.push({
        title: `${i}`,
        key: i,
      });
    }
    return {
      years: years,
      selectedYear: currentYear,
      selectedMonth: 0,
      selectedDay: 1,
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
    jalaali: {
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
  },
  computed: {
    headerTitle(): string {
      if (this.title) {
        return this.title;
      } else if (this.jalaali) {
        return "انتخاب تاریخ";
      } else {
        return "Choose date";
      }
    },
    submitT(): string {
      if (this.submitTitle) {
        return this.submitTitle;
      } else if (this.jalaali) {
        return "تایید";
      } else {
        return "submit";
      }
    },
    locale(): Locale {
      return this.jalaali ? locales["fa"] : locales["en"];
    },
    dayTitle(): string {
      return this.locale.day;
    },
    monthTitle(): string {
      return this.locale.month;
    },
    yearTitle(): string {
      return this.locale.year;
    },
    months(): Option[] {
      return this.locale.months.map((m, i) => ({ title: m, key: i }));
    },
    days(): Option[] {
      let days = 30;
      const options: Option[] = [];
      const date = moment();
      if (this.jalaali) {
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
  methods: {
    submit() {
      const date = moment();
      if (this.jalaali) {
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
