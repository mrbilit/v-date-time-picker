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
        :color="color"
      />
      <wheel-select
        v-model="selectedMonth"
        class="select"
        :title="monthTitle"
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
import locales from "../lib/locales";

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
      selectedMonth: 1,
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
    locale(): "fa" | "en" {
      return this.jalaali ? "fa" : "en";
    },
    dayTitle(): string {
      return locales[this.locale].day;
    },
    monthTitle(): string {
      return locales[this.locale].month;
    },
    yearTitle(): string {
      return locales[this.locale].year;
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
