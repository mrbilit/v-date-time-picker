declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "v-date-time-picker" {
  import DatePicker from "./components/DatePicker.vue";
  import WheelSelect from "./components/WheelSelect.vue";
  import PickerContainer from "./components/PickerContainer.vue";

  export { DatePicker, WheelSelect, PickerContainer };
}
