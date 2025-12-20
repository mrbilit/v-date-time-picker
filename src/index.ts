import type { App } from "vue";
import VDatePicker from "./components/VDatePicker.vue";
import VTimePicker from "./components/VTimePicker.vue";
import VWheelSelect from "./components/VWheelSelect.vue";
import PickerContainer from "./components/PickerContainer.vue";

const components = {
  VDatePicker,
  VTimePicker,
  VWheelSelect,
  PickerContainer,
};

function install(app: App) {
  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });
}

export default { install };

export { default as VDatePicker } from "./components/VDatePicker.vue";
export { default as VTimePicker } from "./components/VTimePicker.vue";
export { default as VWheelSelect } from "./components/VWheelSelect.vue";
export { default as PickerContainer } from "./components/PickerContainer.vue";
