import { newSpecPage } from '@stencil/core/testing';
import { SsbItem } from './ssb-item';

describe('ssb-item', () => {
  it('renders a div with the default variant', async () => {
    const page = await newSpecPage({
      components: [SsbItem],
      html: '<ssb-item>Description</ssb-item>',
    });
    const item = page.root.shadowRoot.querySelector('div.item');
    expect(item).toBeTruthy();
    expect(item.classList.contains('item--default')).toBe(true);
    expect(item.classList.contains('item--interactive')).toBe(false);
  });

  it('applies the variant class', async () => {
    const page = await newSpecPage({
      components: [SsbItem],
      html: '<ssb-item variant="outline">Description</ssb-item>',
    });
    const item = page.root.shadowRoot.querySelector('.item');
    expect(item.classList.contains('item--outline')).toBe(true);
  });

  it('marks the item interactive', async () => {
    const page = await newSpecPage({
      components: [SsbItem],
      html: '<ssb-item interactive>Description</ssb-item>',
    });
    const item = page.root.shadowRoot.querySelector('.item');
    expect(item.classList.contains('item--interactive')).toBe(true);
  });

  it('renders an anchor when href is set', async () => {
    const page = await newSpecPage({
      components: [SsbItem],
      html: '<ssb-item href="https://example.com">Description</ssb-item>',
    });
    const anchor = page.root.shadowRoot.querySelector('a.item');
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe('https://example.com');
    expect(anchor.classList.contains('item--interactive')).toBe(true);
  });
});
