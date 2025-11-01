<template>
  <picker-container
    :title="title"
    :submitTitle="submitTitle"
    :color="color"
    :modal="modal"
    :showModal="showModal"
    @close="emit('update:showModal', false)"
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
import { ref, computed, watch } from "vue";
import type { PropType } from "vue";
import dayjs from "dayjs";

// components
import PickerContainer from "./PickerContainer.vue";
import VWheelSelect from "./VWheelSelect.vue";

// types
import { Option } from "../types";

const props = defineProps({
  modelValue: {
    type: [Date, String] as PropType<Date | string>,
    default: "00:00",
  },
  title: {
    type: String,
    default: "Choose Time",
  },
  submitTitle: {
    type: String,
    default: "submit",
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
  hourTitle: {
    type: String,
    default: "hour",
  },
  minuteTitle: {
    type: String,
    default: "minute",
  },
  bounceOnMount: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "update:showModal", "submit"]);

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
  if (typeof props.modelValue === "string") {
    const hour = hours.value.find((h) => h.key === selectedHour.value)?.title;
    const minute = minutes.value.find((m) => m.key === selectedMinute.value)
      ?.title;
    emit("update:modelValue", `${hour}:${minute}`);
  } else {
    const newDate = dayjs(props.modelValue)
      .hour(selectedHour.value)
      .minute(selectedMinute.value)
      .toDate();
    emit("update:modelValue", newDate);
  }
  emit("submit");
};

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    setInitialTime(newValue);
  },
  { immediate: true }
); // Use immediate to run the watcher on component mount
</script>
