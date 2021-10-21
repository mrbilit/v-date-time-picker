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

<script lang="ts">
import Vue, { PropType } from "vue";

// types
import { Option } from "../types";

export default Vue.extend({
  name: "VWheelSelect",
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<Option[]>,
      default: () => [],
    },
    color: {
      type: String,
      default: "#188EF2",
    },
    mobileMaxSize: {
      type: Number,
      default: 768,
    },
    width: {
      type: String,
      default: "",
    },
    bounceOnMount: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    timeout: null as number | null,
    optionHeight: 35,
    isSmooth: false,
    isDragging: false,
    pos: { top: 0, y: 0 },
    animated: false,
  }),
  computed: {
    indexOfCurrentValue(): number {
      return this.options.findIndex((o) => o.key === this.value);
    },
    hasNext(): boolean {
      return !!this.options[this.indexOfCurrentValue + 1];
    },
    hasPrev(): boolean {
      return !!this.options[this.indexOfCurrentValue - 1];
    },
    wheel(): HTMLDivElement {
      return this.$refs.wheel as HTMLDivElement;
    },
  },
  async mounted() {
    this.scrollTo(this.value);
    this.$nextTick(() => {
      this.isSmooth = true;
    });
    if (window.innerWidth > this.mobileMaxSize) {
      this.initDrag();
    }
    if (this.bounceOnMount) {
      this.animated = true;
      setTimeout(() => {
        this.animated = false;
      }, 1000);
    }
  },
  watch: {
    options() {
      this.$nextTick(() => this.onScroll());
    },
    value(val: string | number) {
      this.scrollTo(val);
    },
  },
  methods: {
    initDrag() {
      this.wheel.addEventListener("mousedown", this.mouseDownHandler);
    },
    mouseDownHandler(e: MouseEvent) {
      this.isDragging = true;
      this.pos = {
        top: this.wheel.scrollTop,
        y: e.clientY,
      };

      document.addEventListener("mousemove", this.mouseMoveHandler);
      document.addEventListener("mouseup", this.mouseUpHandler);
    },
    mouseMoveHandler(e: MouseEvent) {
      const wheel = this.$refs.wheel as HTMLDivElement;
      const dy = e.clientY - this.pos.y;
      wheel.scrollTop = this.pos.top - 3 * dy;
    },
    mouseUpHandler() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.mouseMoveHandler);
      document.removeEventListener("mouseup", this.mouseUpHandler);
      this.onScroll();
    },
    onScroll() {
      if (!this.isDragging) {
        const currentOptionIndex = Math.round(
          this.wheel.scrollTop / this.optionHeight
        );
        this.$emit("input", this.options[currentOptionIndex].key);
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.scrollTo(this.options[currentOptionIndex].key);
        }, 200);
      }
    },
    scrollTo(value: string | number) {
      const currentIndexValue = this.options.findIndex((o) => o.key === value);
      this.wheel.scrollTo({
        top: currentIndexValue * this.optionHeight,
        behavior: "auto",
      });
    },
    goNext() {
      this.hasNext &&
        this.scrollTo(this.options[this.indexOfCurrentValue + 1].key);
    },
    goPrev() {
      this.hasPrev &&
        this.scrollTo(this.options[this.indexOfCurrentValue - 1].key);
    },
  },
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
