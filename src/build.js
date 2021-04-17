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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default install;

export { default as VDatePicker } from "./components/VDatePicker.vue";
export { default as VTimePicker } from "./components/VTimePicker.vue";
export { default as VWheelSelect } from "./components/VWheelSelect.vue";
export { default as PickerContainer } from "./components/PickerContainer.vue";
