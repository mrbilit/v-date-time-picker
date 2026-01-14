<template>
  <picker-container
    :title="title"
    :submitTitle="submitTitle"
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
      v-model="selectedHour"
      class="select"
      :title="hourTitle"
      :options="hours"
      :color="color"
      :bounceOnMount="bounceOnMount"
    />
    <v-wheel-select
      v-model="selectedMinute"
      class="select"
      :title="minuteTitle"
      :options="minutes"
      :color="color"
      :bounceOnMount="bounceOnMount"
    />

    <template #submit>
      <slot name="submit" />
    </template>
  </picker-container>
</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import dayjs from "dayjs";

// components
import PickerContainer from "./PickerContainer.vue";
import VWheelSelect from "./VWheelSelect.vue";

// types
import {Option} from "@/types";

type DateLike = Date | string;

interface Props {
  modelValue?: DateLike;
  title?: string;
  submitTitle?: string;
  color?: string;
  modal?: boolean;
  showModal?: boolean;
  hourTitle?: string;
  minuteTitle?: string;
  bounceOnMount?: boolean;
}

const {
  title = "Choose Time",
  submitTitle = "submit",
  color = "#188EF2",
  hourTitle = "hour",
  minuteTitle = "minute",
} = defineProps<Props>();

const emit = defineEmits<{
  submit: [];
}>();

const modelValue = defineModel<DateLike>({ default: "00:00" });
const showModal = defineModel<boolean>("showModal");

const selectedHour = ref(0);
const selectedMinute = ref(0);

const minutes = computed<Option[]>(() => {
  const options: Option[] = [];
  for (let i = 0; i <= 59; i++) {
    options.push({
      title: `${i < 10 ? "0" : ""}${i}`,
      key: i,
    });
  }
  return options;
});

const hours = computed<Option[]>(() => {
  const options: Option[] = [];
  for (let i = 0; i <= 23; i++) {
    options.push({
      title: `${i < 10 ? "0" : ""}${i}`,
      key: i,
    });
  }
  return options;
});

const setInitialTime = (value: Date | string) => {
  if (typeof value === "string") {
    const [hour, minute] = value.split(":");
    selectedHour.value = Number(hour);
    selectedMinute.value = Number(minute);
  } else if (value instanceof Date) {
    selectedHour.value = dayjs(value).hour();
    selectedMinute.value = dayjs(value).minute();
  }
};

const submit = () => {
  if (typeof modelValue.value === "string") {
    const hour = hours.value.find((h) => h.key === selectedHour.value)?.title;
    const minute = minutes.value.find((m) => m.key === selectedMinute.value)
      ?.title;
    modelValue.value = `${hour}:${minute}`;
  } else {
    modelValue.value = dayjs(modelValue.value)
        .hour(selectedHour.value)
        .minute(selectedMinute.value)
        .toDate();
  }
  emit("submit");
};

// Watch for external changes to modelValue
watch(
  modelValue,
  (newValue) => {
    setInitialTime(newValue);
  },
  { immediate: true }
); // Use immediate to run the watcher on component mount
</script>
