import { newSpecPage } from '@stencil/core/testing';
import { SsbKbd } from './ssb-kbd';

describe('ssb-kbd', () => {
  it('renders a kbd element', async () => {
    const page = await newSpecPage({
      components: [SsbKbd],
      html: '<ssb-kbd>Ctrl</ssb-kbd>',
    });
    const kbd = page.root.shadowRoot.querySelector('kbd');
    expect(kbd).toBeTruthy();
    expect(kbd.classList.contains('kbd')).toBe(true);
  });

  it('renders the default slot for the key label', async () => {
    const page = await newSpecPage({
      components: [SsbKbd],
      html: '<ssb-kbd>K</ssb-kbd>',
    });
    expect(page.root.shadowRoot.querySelector('kbd slot')).toBeTruthy();
    expect(page.root.textContent).toBe('K');
  });
});
