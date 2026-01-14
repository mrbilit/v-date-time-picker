<template>
  <div
    ref="container"
    class="modal-container"
    :class="{ modal, show: showModal }"
  >
    <div class="dialog-box-container" @click.stop>
      <slot name="header">
        <MainHeader :title="title || ''" :showClose="modal" @close="emit('close')" />
      </slot>

      <div class="selects-container">
        <slot />
      </div>

      <slot name="submit">
        <button
          class="submit-button"
          :style="{ background: color }"
          @click="emit('submit', $event)"
        >
          {{ submitTitle }}
        </button>
      </slot>
    </div>

    <div class="container-mask" @click="emit('close')" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import MainHeader from "./MainHeader.vue";

// ✅ Props
const props = defineProps<{
  title?: string;
  submitTitle?: string;
  color?: string;
  modal?: boolean;
  showModal?: boolean;
}>();

// ✅ Emits
const emit = defineEmits<{
  close: [];
  submit: [event: PointerEvent];
}>();

// ✅ Refs
const container = ref<HTMLDivElement>();

// ✅ Methods
function onWheel(event: Event) {
  event.preventDefault();
}

// ✅ Lifecycle
onMounted(() => {
  if (props.modal && container.value) {
    container.value.addEventListener("wheel", onWheel);
  }
});

onBeforeUnmount(() => {
  if (props.modal && container.value) {
    container.value.removeEventListener("wheel", onWheel);
  }
});
</script>

<style scoped lang="scss">
/* your styles remain unchanged */
.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition: opacity 0.3s;
  .container-mask {
    display: none;
    z-index: 50;
    background-color: rgba($color: #43464f, $alpha: 0.7);
  }

  &.modal {
    position: fixed;
    z-index: 99998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;

    &.show {
      visibility: visible;
      opacity: 1;

      .container-mask {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.dialog-box-container {
  display: flex;
  flex-direction: column;
  height: 328px;
  min-width: 328px;
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  z-index: 100;
}

.selects-container {
  flex-grow: 1;
  display: flex;

  .select:not(:first-child) {
    margin-left: 6px;
  }
}

html[dir="rtl"] .selects-container {
  .select:not(:first-child) {
    margin-left: 0;
    margin-right: 6px;
  }
}

.submit-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  font-weight: bold;
  font-size: 14px;
  height: 48px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  border: 0;
  outline: none;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    border: 0;
    opacity: 0.8;
  }
}
</style>
