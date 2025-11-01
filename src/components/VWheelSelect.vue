<template>
  <div
    class="wheel-select-container"
    :class="{ dragging: isDragging }"
    :style="{ width }"
    @click.stop
    @scroll.stop
    @wheel.prevent
  >
    <div class="title">
      {{ title }}
    </div>
    <div class="select-container" @wheel.prevent>
      <div
        ref="wheel"
        class="options-list"
        :class="{ smooth: isSmooth && !isDragging, animated }"
        @scroll="onScroll"
        @wheel.stop
      >
        <div class="option empty" />
        <div
          v-for="(option, index) in options"
          :key="option.key"
          :style="{ color: color }"
          class="option"
          :class="{
            after: index > indexOfCurrentValue,
            before: index < indexOfCurrentValue,
          }"
        >
          {{ option.title }}
        </div>
        <div class="option empty" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  reactive,
} from "vue";
import { Option } from "@/types";

const {
  color = "#188EF2",
  mobileMaxSize = 768,
  width = "",
  options,
  bounceOnMount,
} = defineProps<{
  title: string;
  options: Option[];
  color?: string;
  mobileMaxSize?: number;
  width?: string;
  bounceOnMount?: boolean;
}>();

const modelValue = defineModel<string | number>({ required: true });

const wheel = ref<HTMLDivElement>();
const timeout = ref<number>();
const isSmooth = ref(false);
const isDragging = ref(false);
const animated = ref(false);
const pos = reactive({ top: 0, y: 0 });

const optionHeight = 35;

const indexOfCurrentValue = computed(() => {
  return options.findIndex((o) => o.key === modelValue.value);
});

const scrollTo = (value: string | number, smooth = true) => {
  if (!wheel.value) return;

  const currentIndexValue = options.findIndex((o) => o.key === value);
  const top = currentIndexValue * optionHeight;

  if (smooth) {
    wheel.value.scrollTo({ top, behavior: "auto" });
  } else {
    // Temporarily disable smooth scrolling for instant jumps
    isDragging.value = true;
    isSmooth.value = false;
    nextTick(() => {
      if (wheel.value) {
        wheel.value.scrollTo({ top, behavior: "auto" });
      }
      nextTick(() => {
        isSmooth.value = true;
        isDragging.value = false;
      });
    });
  }
};

const onScroll = () => {
  if (!isDragging.value && wheel.value) {
    const currentOptionIndex = Math.round(wheel.value.scrollTop / optionHeight);
    const selectedOption = options[currentOptionIndex];

    if (selectedOption && modelValue.value !== selectedOption.key) {
      modelValue.value = selectedOption.key;
    }

    if (timeout.value) clearTimeout(timeout.value);

    timeout.value = globalThis.setTimeout(() => {
      if (selectedOption) {
        scrollTo(selectedOption.key);
      }
    }, 200);
  }
};

// --- Drag Handlers ---
const mouseMoveHandler = (e: MouseEvent) => {
  if (wheel.value) {
    const dy = e.clientY - pos.y;
    wheel.value.scrollTop = pos.top - 3 * dy;
  }
};

const mouseUpHandler = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
  // Trigger scroll settling logic after dragging ends
  onScroll();
};

const mouseDownHandler = (e: MouseEvent) => {
  if (!wheel.value) return;

  isDragging.value = true;
  pos.top = wheel.value.scrollTop;
  pos.y = e.clientY;

  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};

const initDrag = () => {
  if (wheel.value) {
    wheel.value.addEventListener("mousedown", mouseDownHandler);
  }
};

watch(
  () => options,
  () => {
    nextTick(() => onScroll());
  }
);

watch(modelValue, (val) => {
  scrollTo(val, false);
});

onMounted(() => {
  scrollTo(modelValue.value);
  nextTick(() => {
    isSmooth.value = true;
  });

  if (window.innerWidth > mobileMaxSize) {
    initDrag();
  }

  if (bounceOnMount) {
    animated.value = true;
    setTimeout(() => {
      animated.value = false;
    }, 1000);
  }
});

onBeforeUnmount(() => {
  if (wheel.value) {
    wheel.value.removeEventListener("mousedown", mouseDownHandler);
  }
  // It's good practice to also remove the document listeners in case of an unmount during a drag
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
});
</script>

<style lang="scss" scoped>
.wheel-select-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 82px;
  user-select: none;

  &.dragging {
    cursor: grabbing;
    user-select: none;
    .options-list,
    .icon-container {
      cursor: grabbing;
      user-select: none;
    }
  }
}

.select-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 129px;
  background: linear-gradient(
    180deg,
    rgba(196, 196, 196, 0) 0%,
    rgba(196, 196, 196, 0.27) 48.96%,
    rgba(243, 245, 245, 0) 100%
  );
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.options-list {
  height: 105px;
  padding: 0 16px;
  overflow-y: scroll;
  overflow-y: -moz-scrollbars-none;
  -ms-overflow-style: none;
  cursor: grab;
  &::-webkit-scrollbar {
    display: none;
  }
  &.smooth {
    scroll-behavior: smooth;
  }
  &.animated {
    animation: bounce 500ms infinite;
  }
  .option {
    height: 35px;
    // text
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 35px;
    text-align: center;
    user-select: none;
    transform-style: preserve-3d;
    &.before {
      transform: rotateX(310deg);
      opacity: 0.7;
    }
    &.after {
      transform: rotateX(50deg);
      opacity: 0.7;
    }
  }
}

.title {
  margin-bottom: 16px;
  // text
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  color: #43464f;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10%);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
