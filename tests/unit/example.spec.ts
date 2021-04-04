import { shallowMount } from "@vue/test-utils";
import VDatePicker from "@/components/VDatePicker.vue";

describe("VDatePicker.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(VDatePicker, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
