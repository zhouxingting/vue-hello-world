import { shallowMount } from '@vue/test-utils';
import Icon from '@/components/SvgIcon/svgIcon.vue';

describe('svgIcon.vue', () => {
  it('type', () => {
    const wrapper = shallowMount(Icon, {
      propsData: {
        type: 'cp-project',
      },
    });
    expect(wrapper.find('use').attributes().href).toBe('#cp-project');
  });

  it('className', () => {
    const wrapper = shallowMount(Icon, {
      propsData: {
        type: 'cp-project',
      },
    });
    expect(wrapper.classes().length).toBe(1);
    wrapper.setProps({
      className: 'test',
    });
    expect(wrapper.classes()).toContain('test');
  });
});
