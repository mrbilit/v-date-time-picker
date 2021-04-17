<template>
  <div class="main-container">
    <h1 class="date-value">
      {{ value }}
    </h1>
    <div class="example-row">
      <div class="example">
        <VDatePicker
          v-model="value"
          :modal="isModal"
          :showModal.sync="showModal"
        />

        <button @click="isModal = !isModal">modal</button>
        <button v-show="isModal" @click="showModal = true">show modal</button>
      </div>
      <div class="example">
        <VDatePicker
          v-model="value"
          jalali
          :modal="jalaliIsModal"
          :showModal.sync="jalaliShowModal"
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
          :showModal.sync="timeShowModal"
        />
        <button @click="timeIsModal = !timeIsModal">modal</button>
        <button v-show="timeIsModal" @click="timeShowModal = true">
          show modal
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// components
import VDatePicker from "./components/VDatePicker.vue";
import VTimePicker from "./components/VTimePicker.vue";

export default Vue.extend({
  data: () => ({
    value: new Date(),
    isModal: false,
    showModal: false,
    jalaliIsModal: false,
    jalaliShowModal: false,
    timeIsModal: false,
    timeShowModal: false,
  }),
  components: { VDatePicker, VTimePicker },
});
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
