import AppHeader from '@/components/AppHeader';
import { mount } from '@vue/test-utils';

describe('AppHeader', () => {
  it('Should not display button when user is not loggedIn', () => {
    const wrapper = mount(AppHeader);
    expect(wrapper.find('button').isVisible()).toBe(false);
  });
  it('Should display button when user is loggedIn', async () => {
    const wrapper = mount(AppHeader);
    await wrapper.setData({ loggedIn: true });
    expect(wrapper.find('button').isVisible()).toBe(true);
  });
});
