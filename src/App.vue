<template>
  <div :dir="isJalali ? 'rtl' : 'ltr'" class="main-container">
    <h1 class="date-value">
      {{ value }}
    </h1>
    <VDatePicker
      v-if="isJalali"
      v-model="value"
      Jalali
      key="1"
      :modal="isModal"
      :showModal.sync="showModal"
    />
    <VDatePicker
      v-else
      v-model="value"
      key="2"
      :modal="isModal"
      :showModal.sync="showModal"
    />
    <button @click="isJalali = !isJalali">switch</button>
    <button @click="isModal = !isModal">modal</button>
    <button v-show="isModal" @click="showModal = true">show modal</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// components
import VDatePicker from "./components/VDatePicker.vue";

export default Vue.extend({
  data: () => ({
    value: new Date().toISOString(),
    isJalali: false,
    isModal: false,
    showModal: false,
  }),
  components: { VDatePicker },
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
