import { newSpecPage } from '@stencil/core/testing';
import { SsbButton } from './ssb-button';

describe('ssb-button', () => {
  it('renders a button with the default variant and size', async () => {
    const page = await newSpecPage({
      components: [SsbButton],
      html: '<ssb-button>Click me</ssb-button>',
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.classList.contains('button--primary')).toBe(true);
    expect(button.classList.contains('button--md')).toBe(true);
  });

  it('applies variant and size classes', async () => {
    const page = await newSpecPage({
      components: [SsbButton],
      html: '<ssb-button variant="destructive" size="lg">Delete</ssb-button>',
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.classList.contains('button--destructive')).toBe(true);
    expect(button.classList.contains('button--lg')).toBe(true);
  });

  it('renders an anchor when href is set', async () => {
    const page = await newSpecPage({
      components: [SsbButton],
      html: '<ssb-button href="https://example.com">Link</ssb-button>',
    });
    const anchor = page.root.shadowRoot.querySelector('a');
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('https://example.com');
  });

  it('disables the native button', async () => {
    const page = await newSpecPage({
      components: [SsbButton],
      html: '<ssb-button disabled>Disabled</ssb-button>',
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button.hasAttribute('disabled')).toBe(true);
  });
});
