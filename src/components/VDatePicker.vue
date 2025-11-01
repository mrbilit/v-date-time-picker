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
      :mobileMaxSize="mobileMaxSize"
      :bounceOnMount="bounceOnMount"
    />
    <v-wheel-select
      v-model="selectedMonth"
      class="select"
      :title="monthTitle"
      :options="months"
      :color="color"
      width="30%"
      :mobileMaxSize="mobileMaxSize"
      :bounceOnMount="bounceOnMount"
    />
    <v-wheel-select
      v-model="selectedYear"
      class="select"
      :title="yearTitle"
      :options="years"
      :color="color"
      :mobileMaxSize="mobileMaxSize"
      :bounceOnMount="bounceOnMount"
    />

    <template #submit>
      <slot name="submit" />
    </template>
  </picker-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeMount, nextTick } from "vue";
import type { PropType } from "vue";
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

type DateType = PropType<Date | string | null>;

const props = defineProps({
  value: {
    type: [Date, String] as DateType,
    required: false,
    default: null,
  },
  modelValue: {
    type: [Date, String] as DateType,
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
    type: [Date, String] as DateType,
    default: null,
  },
  maxDate: {
    type: [Date, String] as DateType,
    default: null,
  },
  mobileMaxSize: {
    type: Number,
    default: 768,
  },
  bounceOnMount: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "update:showModal", "submit"]);

const {
  selectedYear: initialYear,
  selectedMonth: initialMonth,
  selectedDay: initialDay,
  calendar: initialCalendar,
} = getData(props.modelValue || "", props.jalali, props.maxDate, props.minDate);

const selectedYear = ref(initialYear);
const selectedMonth = ref(initialMonth);
const selectedDay = ref(initialDay);
const calendar = ref(initialCalendar);
const years = ref<Option[]>([]);

const headerTitle = computed(() => {
  if (props.title) {
    return props.title;
  }
  return props.jalali ? "انتخاب تاریخ" : "Choose date";
});

const submitT = computed(() => {
  if (props.submitTitle) {
    return props.submitTitle;
  }
  return props.jalali ? "تایید" : "submit";
});

const locale_ = computed<Locale>(() => {
  if (props.locale) {
    return props.locale;
  }
  return props.jalali ? locales["fa"] : locales["en"];
});

const dayTitle = computed(() => locale_.value.day);
const monthTitle = computed(() => locale_.value.month);
const yearTitle = computed(() => locale_.value.year);

const max = computed<DateInfo | null>(() => {
  if (props.maxDate) {
    const d = dayjs(props.maxDate).calendar(calendar.value);
    return {
      year: d.year(),
      month: d.month(),
      day: d.date(),
    };
  }
  return null;
});

const min = computed<DateInfo | null>(() => {
  if (props.minDate) {
    const d = dayjs(props.minDate).calendar(calendar.value);
    return {
      year: d.year(),
      month: d.month(),
      day: d.date(),
    };
  }
  return null;
});

const isMaxYearSelected = computed(
  () => selectedYear.value === max.value?.year
);
const isMaxMonthSelected = computed(
  () => isMaxYearSelected.value && selectedMonth.value === max.value?.month
);
const isMinYearSelected = computed(
  () => selectedYear.value === min.value?.year
);
const isMinMonthSelected = computed(
  () => isMinYearSelected.value && selectedMonth.value === min.value?.month
);

const months = computed<Option[]>(() => {
  let monthOptions = locale_.value.months.map((m, i) => ({ title: m, key: i }));
  if (max.value && isMaxYearSelected.value) {
    monthOptions = monthOptions.filter(
      (y) => max.value && y.key <= max.value.month
    );
  }
  if (min.value && isMinYearSelected.value) {
    monthOptions = monthOptions.filter(
      (y) => min.value && y.key >= min.value.month
    );
  }
  return monthOptions;
});

const days = computed<Option[]>(() => {
  const daysInMonth = dayjs()
    .calendar(calendar.value)
    .year(selectedYear.value)
    .month(selectedMonth.value)
    .daysInMonth();

  let options: Option[] = Array.from({ length: daysInMonth }, (_, i) => ({
    title: `${i + 1}`,
    key: i + 1,
  }));

  if (max.value && isMaxMonthSelected.value) {
    options = options.filter(
      (y) => max.value && Number(y.key) <= max.value.day
    );
  }
  if (min.value && isMinMonthSelected.value) {
    options = options.filter(
      (y) => min.value && Number(y.key) >= min.value.day
    );
  }
  return options;
});

watch(
  () => props.jalali,
  (value) => {
    const {
      selectedYear: newYear,
      selectedMonth: newMonth,
      selectedDay: newDay,
      calendar: newCalendar,
    } = getData(
      dayjs()
        .calendar(calendar.value)
        .year(selectedYear.value)
        .month(selectedMonth.value)
        .date(selectedDay.value)
        .toDate(),
      value,
      props.maxDate,
      props.minDate
    );
    selectedYear.value = newYear;
    selectedMonth.value = newMonth;
    selectedDay.value = newDay;
    calendar.value = newCalendar;
    setYears();
  }
);

watch(
  () => props.modelValue,
  (value) => {
    const {
      selectedYear: newYear,
      selectedMonth: newMonth,
      selectedDay: newDay,
    } = getData(value || '', props.jalali, props.maxDate, props.minDate);
    selectedYear.value = newYear;
    selectedMonth.value = newMonth;
    nextTick(() => {
      selectedDay.value = newDay;
    });
  }
);

const setYears = () => {
  let yearOptions: Option[] = [];
  for (
    let i = selectedYear.value - props.yearThreshold;
    i <= selectedYear.value + props.yearThreshold;
    i++
  ) {
    yearOptions.push({
      title: `${i}`,
      key: i,
    });
  }

  if (max.value) {
    yearOptions = yearOptions.filter(
      (y) => max.value && +y.key <= max.value.year
    );
  }
  if (min.value) {
    yearOptions = yearOptions.filter(
      (y) => min.value && +y.key >= min.value.year
    );
  }
  years.value = yearOptions;
};

const submit = () => {
  const date = dayjs()
    .calendar(calendar.value)
    .year(selectedYear.value)
    .month(selectedMonth.value)
    .date(selectedDay.value);

  if (typeof props.modelValue === "string") {
    emit("update:modelValue", date.toISOString());
  } else {
    emit("update:modelValue", date.toDate());
  }
  emit("submit");
};

onBeforeMount(() => {
  setYears();
});
</script>
