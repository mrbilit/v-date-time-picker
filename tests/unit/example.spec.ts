import { shallowMount } from "@vue/test-utils";
import VDatePicker from "@/components/VDatePicker.vue";

describe("VDatePicker.vue", () => {
  it("renders props.msg when passed", () => {
    const title = "new message";
    const wrapper = shallowMount(VDatePicker, {
      propsData: { title },
    });
    expect(wrapper.text()).toMatch(title);
  });
});
