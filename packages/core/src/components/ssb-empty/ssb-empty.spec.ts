import { newSpecPage } from '@stencil/core/testing';
import { SsbEmpty } from './ssb-empty';

describe('ssb-empty', () => {
  it('renders the empty state container', async () => {
    const page = await newSpecPage({
      components: [SsbEmpty],
      html: '<ssb-empty>No results found.</ssb-empty>',
    });
    const empty = page.root.shadowRoot.querySelector('.empty');
    expect(empty).toBeTruthy();
  });

  it('renders all named slots', async () => {
    const page = await newSpecPage({
      components: [SsbEmpty],
      html: '<ssb-empty>No results found.</ssb-empty>',
    });
    expect(page.root.shadowRoot.querySelector('slot[name="icon"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('slot[name="empty-title"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('slot[name="actions"]')).toBeTruthy();
  });

  it('renders a default slot for the description', async () => {
    const page = await newSpecPage({
      components: [SsbEmpty],
      html: '<ssb-empty>Nothing here yet.</ssb-empty>',
    });
    expect(page.root.shadowRoot.querySelector('.empty__description slot')).toBeTruthy();
  });
});
