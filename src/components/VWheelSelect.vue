<template>
  <div class="wheel-select-container">
    <div class="title">
      {{ title }}
    </div>
    <div class="select-container">
      <div class="icon-container">
        <top-arrow :color="color" />
      </div>
      <div
        ref="wheel"
        class="options-list"
        :class="{ smooth: isSmooth }"
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
      <div class="icon-container">
        <down-arrow :color="color" />
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
  }),
  computed: {
    selectedItem: {
      get(): string | number {
        return this.value;
      },
      set(value: string | number) {
        this.$emit("input", value);
      },
    },
  },
  mounted() {
    this.scrollTo(this.value);
    this.$nextTick(() => {
      this.isSmooth = true;
    });
  },
  methods: {
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
  },
});
</script>

<style lang="scss" scoped>
.wheel-select-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 82px;
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
  &::-webkit-scrollbar {
    display: none;
  }
  &.smooth {
    scroll-behavior: smooth;
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
