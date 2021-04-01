<template>
  <div class="vue-date-picker">
    <slot name="header">
      <main-header :title="title" />
    </slot>
    <div class="selects-container">
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
    </div>
    <slot name="submit">
      <button class="submit-button" :style="{ background: color }">
        submit
      </button>
    </slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment-jalaali";

// components
import MainHeader from "./MainHeader.vue";
import WheelSelect, { Option } from "./WheelSelect.vue";

// libs
import locales, { Locale } from "../lib/locales";

export default Vue.extend({
  name: "DatePicker",
  components: { MainHeader, WheelSelect },
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
    title: {
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
  },
  computed: {
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
});
</script>

<style scoped lang="scss">
.vue-date-picker {
  display: flex;
  flex-direction: column;
  height: 328px;
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
}

.selects-container {
  flex-grow: 1;
  display: flex;

  .select:not(:first-child) {
    margin-left: 6px;
  }
}

.submit-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  font-weight: bold;
  font-size: 14px;
  height: 48px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  border: 0;
  outline: none;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    border: 0;
    opacity: 0.8;
  }
}
</style>
