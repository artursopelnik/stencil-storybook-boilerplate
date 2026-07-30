import { newSpecPage } from '@stencil/core/testing';
import { SsbButtonGroup } from './ssb-button-group';

describe('ssb-button-group', () => {
  it('renders with role group', async () => {
    const page = await newSpecPage({
      components: [SsbButtonGroup],
      html: '<ssb-button-group></ssb-button-group>',
    });
    expect(page.root.getAttribute('role')).toBe('group');
    expect(page.root.shadowRoot.querySelector('slot')).toBeTruthy();
  });

  it('keeps slotted buttons in the light DOM', async () => {
    const page = await newSpecPage({
      components: [SsbButtonGroup],
      html: '<ssb-button-group><ssb-button>One</ssb-button><ssb-button>Two</ssb-button></ssb-button-group>',
    });
    expect(page.root.querySelectorAll('ssb-button').length).toBe(2);
  });

  it('applies aria attributes from the aria prop', async () => {
    const page = await newSpecPage({
      components: [SsbButtonGroup],
      html: `<ssb-button-group aria="{'aria-label': 'Alignment'}"></ssb-button-group>`,
    });
    expect(page.root.getAttribute('aria-label')).toBe('Alignment');
  });
});
