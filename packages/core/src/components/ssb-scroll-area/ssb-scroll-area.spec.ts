import { newSpecPage } from '@stencil/core/testing';
import { SsbScrollArea } from './ssb-scroll-area';

describe('ssb-scroll-area', () => {
  it('renders a vertical viewport with the default max height', async () => {
    const page = await newSpecPage({
      components: [SsbScrollArea],
      html: '<ssb-scroll-area>Content</ssb-scroll-area>',
    });
    const viewport = page.root.shadowRoot.querySelector<HTMLElement>('.viewport');
    expect(viewport).toBeTruthy();
    expect(viewport.classList.contains('viewport--vertical')).toBe(true);
    expect(viewport.style.maxHeight).toBe('16rem');
  });

  it('applies a custom max height', async () => {
    const page = await newSpecPage({
      components: [SsbScrollArea],
      html: '<ssb-scroll-area max-height="10rem">Content</ssb-scroll-area>',
    });
    const viewport = page.root.shadowRoot.querySelector<HTMLElement>('.viewport');
    expect(viewport.style.maxHeight).toBe('10rem');
  });

  it('applies the orientation class', async () => {
    const page = await newSpecPage({
      components: [SsbScrollArea],
      html: '<ssb-scroll-area orientation="horizontal">Content</ssb-scroll-area>',
    });
    const viewport = page.root.shadowRoot.querySelector('.viewport');
    expect(viewport.classList.contains('viewport--horizontal')).toBe(true);
  });
});
