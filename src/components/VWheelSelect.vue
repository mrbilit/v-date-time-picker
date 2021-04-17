<template>
  <div class="wheel-select-container">
    <div class="title">
      {{ title }}
    </div>
    <div class="select-container">
      <div
        class="icon-container"
        :class="{ disabled: !hasPrev }"
        @click="goPrev"
      >
        <top-arrow :color="hasPrev ? color : 'gray'" />
      </div>
      <div
        ref="wheel"
        class="options-list"
        :class="{ smooth: isSmooth, dragging: isDragging }"
        @scroll="onScroll"
      >
        <div
          class="option"
          v-for="option in options"
          :key="option.key"
          :style="{ color: color }"
        >
          {{ option.title }}
        </div>
      </div>
      <div
        class="icon-container"
        :class="{ disabled: !hasNext }"
        @click="goNext"
      >
        <down-arrow :color="hasNext ? color : 'gray'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

// icons
import TopArrow from "./Icons/top-arrow.vue";
import DownArrow from "./Icons/down-arrow.vue";

// types
import { Option } from "../types";

export default Vue.extend({
  name: "VWheelSelect",
  components: { TopArrow, DownArrow },
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
  },
  data: () => ({
    timeout: null as number | null,
    optionHeight: 31,
    isSmooth: false,
    isDragging: false,
    pos: { top: 0, y: 0 },
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
  },
  mounted() {
    this.scrollTo(this.value);
    this.$nextTick(() => {
      this.isSmooth = true;
    });
    this.initDrag();
  },
  methods: {
    initDrag() {
      const wheel = this.$refs.wheel as HTMLDivElement;
      wheel.addEventListener("mousedown", this.mouseDownHandler);
    },
    mouseDownHandler(e: MouseEvent) {
      this.isDragging = true;
      const wheel = this.$refs.wheel as HTMLDivElement;
      this.pos = {
        top: wheel.scrollTop,
        y: e.clientY,
      };

      document.addEventListener("mousemove", this.mouseMoveHandler);
      document.addEventListener("mouseup", this.mouseUpHandler);
    },
    mouseMoveHandler(e: MouseEvent) {
      const wheel = this.$refs.wheel as HTMLDivElement;
      const dy = e.clientY - this.pos.y;
      wheel.scrollTop = this.pos.top - dy;
    },
    mouseUpHandler() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.mouseMoveHandler);
      document.removeEventListener("mouseup", this.mouseUpHandler);
    },
    onScroll() {
      const wheel = this.$refs.wheel as HTMLDivElement;
      const currentOptionIndex = Math.round(
        wheel.scrollTop / this.optionHeight
      );
      this.$emit("input", this.options[currentOptionIndex].key);
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.scrollTo(this.options[currentOptionIndex].key);
      }, 200);
    },
    scrollTo(value: string | number) {
      const currentIndexValue = this.options.findIndex((o) => o.key === value);
      const wheel = this.$refs.wheel as HTMLDivElement;
      wheel.scrollTo({
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
  height: 31px;
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
  &.dragging {
    cursor: grabbing;
    user-select: none;
  }
  .option {
    height: 31px;
    // text
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 31px;
    text-align: center;
    user-select: none;
  }
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
  }
}

.title {
  margin-bottom: 16px;
  // text
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 31px;
  text-align: center;
  color: #43464f;
}
</style>
