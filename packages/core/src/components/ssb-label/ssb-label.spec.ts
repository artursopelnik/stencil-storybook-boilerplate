import { newSpecPage } from '@stencil/core/testing';
import { SsbLabel } from './ssb-label';

describe('ssb-label', () => {
  it('renders a native label with slotted content', async () => {
    const page = await newSpecPage({
      components: [SsbLabel],
      html: '<ssb-label>Email</ssb-label>',
    });
    const label = page.root.shadowRoot.querySelector('label');
    expect(label).toBeTruthy();
    expect(label.querySelector('slot')).toBeTruthy();
  });

  it('renders the for attribute from html-for', async () => {
    const page = await newSpecPage({
      components: [SsbLabel],
      html: '<ssb-label html-for="email">Email</ssb-label>',
    });
    const label = page.root.shadowRoot.querySelector('label');
    expect(label.getAttribute('for')).toBe('email');
  });

  it('shows a required asterisk', async () => {
    const page = await newSpecPage({
      components: [SsbLabel],
      html: '<ssb-label required>Email</ssb-label>',
    });
    const asterisk = page.root.shadowRoot.querySelector('.label__required');
    expect(asterisk).toBeTruthy();
    expect(asterisk.textContent).toBe('*');
  });

  it('applies the disabled style', async () => {
    const page = await newSpecPage({
      components: [SsbLabel],
      html: '<ssb-label disabled>Email</ssb-label>',
    });
    const label = page.root.shadowRoot.querySelector('label');
    expect(label.classList.contains('label--disabled')).toBe(true);
  });
});
