import { newSpecPage } from '@stencil/core/testing';
import { SsbSwitch } from './ssb-switch';

describe('ssb-switch', () => {
  it('renders a native checkbox with switch semantics', async () => {
    const page = await newSpecPage({
      components: [SsbSwitch],
      html: '<ssb-switch>Airplane mode</ssb-switch>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.getAttribute('type')).toBe('checkbox');
    expect(input.getAttribute('role')).toBe('switch');
  });

  it('checks the native input when checked', async () => {
    const page = await newSpecPage({
      components: [SsbSwitch],
      html: '<ssb-switch checked>Airplane mode</ssb-switch>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input.hasAttribute('checked')).toBe(true);
  });

  it('disables the native input', async () => {
    const page = await newSpecPage({
      components: [SsbSwitch],
      html: '<ssb-switch disabled>Airplane mode</ssb-switch>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input.hasAttribute('disabled')).toBe(true);
    const label = page.root.shadowRoot.querySelector('label');
    expect(label.classList.contains('switch--disabled')).toBe(true);
  });
});
