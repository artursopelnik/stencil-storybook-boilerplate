import { newSpecPage } from '@stencil/core/testing';
import { SsbCheckbox } from './ssb-checkbox';

describe('ssb-checkbox', () => {
  it('renders an unchecked native checkbox by default', async () => {
    const page = await newSpecPage({
      components: [SsbCheckbox],
      html: '<ssb-checkbox label="Accept terms"></ssb-checkbox>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.getAttribute('type')).toBe('checkbox');
    expect(input.hasAttribute('checked')).toBe(false);
  });

  it('checks the native checkbox', async () => {
    const page = await newSpecPage({
      components: [SsbCheckbox],
      html: '<ssb-checkbox checked label="Accept terms"></ssb-checkbox>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input.hasAttribute('checked')).toBe(true);
  });

  it('renders the label prop text', async () => {
    const page = await newSpecPage({
      components: [SsbCheckbox],
      html: '<ssb-checkbox label="Accept terms"></ssb-checkbox>',
    });
    const label = page.root.shadowRoot.querySelector('.checkbox__label');
    expect(label.textContent).toBe('Accept terms');
  });

  it('disables the native checkbox', async () => {
    const page = await newSpecPage({
      components: [SsbCheckbox],
      html: '<ssb-checkbox disabled label="Accept terms"></ssb-checkbox>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input.hasAttribute('disabled')).toBe(true);
  });
});
