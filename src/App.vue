<template>
  <div :dir="isJalaali ? 'rtl' : 'ltr'" class="main-container">
    <h1 class="date-value">
      {{ value }}
    </h1>
    <DatePicker
      v-if="isJalaali"
      v-model="value"
      jalaali
      key="1"
      :modal="isModal"
      :showModal.sync="showModal"
    />
    <DatePicker
      v-else
      v-model="value"
      key="2"
      :modal="isModal"
      :showModal.sync="showModal"
    />
    <button @click="isJalaali = !isJalaali">switch</button>
    <button @click="isModal = !isModal">modal</button>
    <button v-show="isModal" @click="showModal = true">show modal</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// components
import DatePicker from "./components/DatePicker.vue";

export default Vue.extend({
  data: () => ({
    value: new Date(1111516116516).toISOString(),
    isJalaali: false,
    isModal: false,
    showModal: false,
  }),
  components: { DatePicker },
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
