import DatePicker from "./components/DatePicker.vue";
import WheelSelect from "./components/WheelSelect.vue";
import PickerContainer from "./components/PickerContainer.vue";

const components = {
  DatePicker,
  WheelSelect,
  PickerContainer,
};

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}

const plugin = {
  install,
  ...components,
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
