import { shallowMount } from "@vue/test-utils";
import DatePicker from "@/components/DatePicker.vue";

describe("DatePicker.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(DatePicker, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
