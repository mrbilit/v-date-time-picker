import { VueConstructor } from "vue/types/umd";

export type Locale = {
  day: string;
  month: string;
  year: string;
  months: string[];
};

export type Option = {
  title: string;
  key: string | number;
};

export const VDatePicker: VueConstructor;
export const VWheelSelect: VueConstructor;
export const PickerContainer: VueConstructor;
