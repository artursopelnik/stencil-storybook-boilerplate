import { newSpecPage } from '@stencil/core/testing';
import { SsbAlert } from './ssb-alert';

describe('ssb-alert', () => {
  it('renders with the default variant and role alert', async () => {
    const page = await newSpecPage({
      components: [SsbAlert],
      html: '<ssb-alert><span slot="alert-title">Heads up!</span>Something happened.</ssb-alert>',
    });
    const alert = page.root.shadowRoot.querySelector('.alert');
    expect(alert).toBeTruthy();
    expect(alert.getAttribute('role')).toBe('alert');
    expect(alert.classList.contains('alert--default')).toBe(true);
  });

  it('applies the destructive variant class', async () => {
    const page = await newSpecPage({
      components: [SsbAlert],
      html: '<ssb-alert variant="destructive">Something went wrong.</ssb-alert>',
    });
    const alert = page.root.shadowRoot.querySelector('.alert');
    expect(alert.classList.contains('alert--destructive')).toBe(true);
  });

  it('renders icon, title and description slots', async () => {
    const page = await newSpecPage({
      components: [SsbAlert],
      html: '<ssb-alert>Description</ssb-alert>',
    });
    expect(page.root.shadowRoot.querySelector('slot[name="icon"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('slot[name="alert-title"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.alert__description slot')).toBeTruthy();
  });
});
