<template>
  <picker-container
    :title="title"
    :submitTitle="submitTitle"
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
      v-model="selectedHour"
      class="select"
      :title="hourTitle"
      :options="hours"
      :color="color"
    />
    <v-wheel-select
      v-model="selectedMinute"
      class="select"
      :title="minuteTitle"
      :options="minutes"
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
import VWheelSelect from "./VWheelSelect.vue";

// types
import { Option } from "../types";

export default Vue.extend({
  name: "VTimePicker",
  components: { PickerContainer, VWheelSelect },
  data: () => ({
    selectedHour: 0,
    selectedMinute: 0,
  }),
  props: {
    value: {
      type: [Date, String],
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
  },
  beforeMount() {
    if (typeof this.value === "string") {
      const value = this.value.split(":");
      this.selectedHour = Number(value[0]);
      this.selectedMinute = Number(value[1]);
    } else {
      const date = moment(this.value);
      this.selectedHour = date.hour();
      this.selectedMinute = date.minute();
    }
  },
  computed: {
    minutes(): Option[] {
      const options: Option[] = [];
      for (let i = 0; i <= 59; i++) {
        options.push({
          title: `${`${i}`.length === 1 ? "0" : ""}${i}`,
          key: i,
        });
      }
      return options;
    },
    hours(): Option[] {
      const options: Option[] = [];
      for (let i = 0; i <= 23; i++) {
        options.push({
          title: `${`${i}`.length === 1 ? "0" : ""}${i}`,
          key: i,
        });
      }
      return options;
    },
  },
  methods: {
    submit() {
      if (typeof this.value === "string") {
        this.$emit(
          "input",
          `${this.hours.find((h) => h.key === this.selectedHour)?.title}:${
            this.minutes.find((m) => m.key === this.selectedMinute)?.title
          }`
        );
      } else {
        const date = moment(this.value);
        console.log(date);
        date.hour(this.selectedHour);
        date.minute(this.selectedMinute);
        this.$emit("input", date.toDate());
      }
      this.$emit("submit");
    },
  },
});
</script>
