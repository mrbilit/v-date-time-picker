<template>
  <div class="main-container">
    <DatePicker v-if="isJalaali" jalaali key="1" />
    <DatePicker v-else key="2" />
    <button @click="isJalaali = !isJalaali">switch</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

// components
import DatePicker from "./components/DatePicker.vue";

export default Vue.extend({
  data: () => ({
    isJalaali: false,
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
  background: #43464f;
}

button {
  margin-top: 20px;
}
</style>
