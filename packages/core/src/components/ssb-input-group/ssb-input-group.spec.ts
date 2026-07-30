import { newSpecPage } from '@stencil/core/testing';
import { SsbInputGroup } from './ssb-input-group';

describe('ssb-input-group', () => {
  it('renders prefix, default and suffix slots', async () => {
    const page = await newSpecPage({
      components: [SsbInputGroup],
      html: '<ssb-input-group></ssb-input-group>',
    });
    const slots = page.root.shadowRoot.querySelectorAll('slot');
    expect(slots.length).toBe(3);
    expect(slots[0].getAttribute('name')).toBe('prefix');
    expect(slots[2].getAttribute('name')).toBe('suffix');
  });

  it('keeps the slotted control and addons in the light DOM', async () => {
    const page = await newSpecPage({
      components: [SsbInputGroup],
      html: '<ssb-input-group><span slot="prefix">@</span><input type="text" /></ssb-input-group>',
    });
    expect(page.root.querySelector('input')).toBeTruthy();
    expect(page.root.querySelector('[slot="prefix"]').textContent).toBe('@');
  });

  it('applies aria attributes from the aria prop', async () => {
    const page = await newSpecPage({
      components: [SsbInputGroup],
      html: `<ssb-input-group aria="{'aria-label': 'Username'}"></ssb-input-group>`,
    });
    expect(page.root.getAttribute('aria-label')).toBe('Username');
  });
});
