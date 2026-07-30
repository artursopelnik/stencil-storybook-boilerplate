import { newSpecPage } from '@stencil/core/testing';
import { SsbInput } from './ssb-input';

describe('ssb-input', () => {
  it('renders a native input with the default type', async () => {
    const page = await newSpecPage({
      components: [SsbInput],
      html: '<ssb-input></ssb-input>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.getAttribute('type')).toBe('text');
  });

  it('forwards value, placeholder and name to the native input', async () => {
    const page = await newSpecPage({
      components: [SsbInput],
      html: '<ssb-input value="hello" placeholder="Type here" name="message"></ssb-input>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input.getAttribute('placeholder')).toBe('Type here');
    expect(input.getAttribute('name')).toBe('message');
  });

  it('marks the input as invalid', async () => {
    const page = await newSpecPage({
      components: [SsbInput],
      html: '<ssb-input invalid></ssb-input>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input.classList.contains('input--invalid')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('disables the native input', async () => {
    const page = await newSpecPage({
      components: [SsbInput],
      html: '<ssb-input disabled></ssb-input>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input.hasAttribute('disabled')).toBe(true);
  });
});
