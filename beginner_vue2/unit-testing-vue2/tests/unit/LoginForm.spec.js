import LoginForm from '@/components/LoginForm';
import { mount } from '@vue/test-utils';

describe('LoginForm', () => {
  it('emits an event with a user data payload', () => {
    const wrapper = mount(LoginForm);
    const input = wrapper.find('input[type="text');
    const inputName = 'Sander Fabry';

    input.setValue(inputName);
    wrapper.trigger('submit');

    const formSubmittedCalls = wrapper.emitted('formSubmitted');
    const expectedPayload = {
      name: inputName,
    };

    expect(formSubmittedCalls).toHaveLength(1);
    expect(wrapper.emitted('formSubmitted')[0][0]).toMatchObject(
      expectedPayload
    );
  });
});
