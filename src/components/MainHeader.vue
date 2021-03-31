<template>
  <div class="header-container">
    <div class="button" />
    <div class="title">
      {{ title }}
    </div>
    <div class="button close" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: "Choose your date",
    },
  },
});
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  .title {
    // text
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 31px;
    text-align: center;
    color: #43464f;
  }
}

.button {
  width: 24px;
  height: 24px;
  &.close {
    background-image: url("../assets/close.svg");
    background-position: center center;
    background-size: 70%;
    background-repeat: no-repeat;
    cursor: pointer;
  }
}
</style>
