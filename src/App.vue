<template>
  <div class="main-container">
    <h1 class="date-value">
      {{ value }}
    </h1>
    <div class="example-row">
      <div class="example">
        <VDatePicker
          v-model="value"
          v-model:show-modal="showModal"
          bounce-on-mount
          :max-date="nextYear"
          :min-date="prevYear"
          @submit="console.log"
        />

        <button @click="isModal = !isModal">modal</button>
      </div>
      <div class="example">
        <VDatePicker
          v-model="value"
          jalali
          :modal="jalaliIsModal"
          v-model:show-modal="jalaliShowModal"
          @submit="console.log"
        />

        <button @click="jalaliIsModal = !jalaliIsModal">modal</button>
        <button v-show="jalaliIsModal" @click="jalaliShowModal = true">
          show modal
        </button>
      </div>
    </div>
    <div class="example-row">
      <div class="example">
        <VTimePicker
          v-model="value"
          :modal="timeIsModal"
          v-model:showModal="timeShowModal"
        />
        <button @click="timeIsModal = !timeIsModal">modal</button>
        <button v-show="timeIsModal" @click="timeShowModal = true">
          show modal
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// components
import VDatePicker from "./components/VDatePicker.vue";
import VTimePicker from "./components/VTimePicker.vue";

const value = ref<Date | string>();
const isModal = ref(false);
const showModal = ref(false);
const jalaliIsModal = ref(false);
const jalaliShowModal = ref(false);
const timeIsModal = ref(false);
const timeShowModal = ref(false);
const nextYear = new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000);
const prevYear = new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000);
</script>

<style lang="scss">
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: #26b3fa;
}

.example-row {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;

  .example {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.date-value {
  margin-bottom: 20px;
  // text
  font-weight: bold;
  font-size: 20px;
  line-height: 31px;
  text-align: center;
  color: #43464f;
}

button {
  margin-top: 20px;
}
</style>
