<template>
  <picker-container
    :title="headerTitle"
    :submitTitle="submitT"
    :color="color"
    :modal="modal"
    :showModal="showModal"
    @close="showModal = false"
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
import jalaliday from "jalaliday";
import dayjs from "dayjs";
dayjs.extend(jalaliday);

// components
import PickerContainer from "./PickerContainer.vue";
import VWheelSelect from "./VWheelSelect.vue";

// libs
import locales from "../lib/locales";
import { getData } from "@/lib/date";

// types
import { Locale, Option } from "@/types";
type DateInfo = {
  year: number;
  month: number;
  day: number;
};

type DateType = Date | string | null;

interface Props {
  value?: DateType | null;
  title?: string;
  submitTitle?: string;
  jalali?: boolean;
  color?: string;
  modal?: boolean;
  yearThreshold?: number;
  locale?: Locale | null;
  minDate?: DateType | null;
  maxDate?: DateType | null;
  mobileMaxSize?: number;
  bounceOnMount?: boolean;
}

const {
  color = '#188EF2',
  yearThreshold = 100,
  mobileMaxSize = 768,
  jalali,
  maxDate,
  minDate,
  title,
  submitTitle,
  locale
} = defineProps<Props>();

const emit = defineEmits<{
  submit: [];
}>();

const modelValue = defineModel<DateType | null>({ default: null });
const showModal = defineModel<boolean>('showModal');

const {
  selectedYear: initialYear,
  selectedMonth: initialMonth,
  selectedDay: initialDay,
  calendar: initialCalendar,
} = getData(modelValue.value || "", jalali, maxDate, minDate);

const selectedYear = ref(initialYear);
const selectedMonth = ref(initialMonth);
const selectedDay = ref(initialDay);
const calendar = ref(initialCalendar);
const years = ref<Option[]>([]);

const headerTitle = computed(() => {
  if (title) {
    return title;
  }
  return jalali ? "انتخاب تاریخ" : "Choose date";
});

const submitT = computed(() => {
  if (submitTitle) {
    return submitTitle;
  }
  return jalali ? "تایید" : "submit";
});

const locale_ = computed<Locale>(() => {
  if (locale) {
    return locale;
  }
  return jalali ? locales["fa"] : locales["en"];
});

const dayTitle = computed(() => locale_.value.day);
const monthTitle = computed(() => locale_.value.month);
const yearTitle = computed(() => locale_.value.year);

const max = computed<DateInfo | null>(() => {
  if (maxDate) {
    const d = dayjs(maxDate).calendar(calendar.value);
    return {
      year: d.year(),
      month: d.month(),
      day: d.date(),
    };
  }
  return null;
});

const min = computed<DateInfo | null>(() => {
  if (minDate) {
    const d = dayjs(minDate).calendar(calendar.value);
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
  () => jalali,
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
      maxDate,
      minDate
    );
    selectedYear.value = newYear;
    selectedMonth.value = newMonth;
    selectedDay.value = newDay;
    calendar.value = newCalendar;
    setYears();
  }
);

watch(
  modelValue,
  (value) => {
    const {
      selectedYear: newYear,
      selectedMonth: newMonth,
      selectedDay: newDay,
    } = getData(value || "", jalali, maxDate, minDate);
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
    let i = selectedYear.value - yearThreshold;
    i <= selectedYear.value + yearThreshold;
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

  if (typeof modelValue.value === "string") {
    modelValue.value = date.toISOString();
  } else {
    modelValue.value = date.toDate();
  }
  emit("submit");
};

onBeforeMount(() => {
  setYears();
});
</script>
