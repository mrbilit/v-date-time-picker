declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "v-date-time-picker" {
  import { VueConstructor } from "vue/types/umd";
  const VDatePicker: VueConstructor;
  const VTimePicker: VueConstructor;
  const VWheelSelect: VueConstructor;
  const PickerContainer: VueConstructor;
}
