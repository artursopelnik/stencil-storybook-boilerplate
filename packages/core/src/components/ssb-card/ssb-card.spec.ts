import { newSpecPage } from '@stencil/core/testing';
import { SsbCard } from './ssb-card';

describe('ssb-card', () => {
  it('renders the card container', async () => {
    const page = await newSpecPage({
      components: [SsbCard],
      html: '<ssb-card>Content</ssb-card>',
    });
    const card = page.root.shadowRoot.querySelector('.card');
    expect(card).toBeTruthy();
  });

  it('renders all named slots', async () => {
    const page = await newSpecPage({
      components: [SsbCard],
      html: '<ssb-card>Content</ssb-card>',
    });
    expect(page.root.shadowRoot.querySelector('slot[name="card-title"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('slot[name="card-description"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('slot[name="action"]')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('slot[name="footer"]')).toBeTruthy();
  });

  it('renders a default slot for the content', async () => {
    const page = await newSpecPage({
      components: [SsbCard],
      html: '<ssb-card><p>Hello</p></ssb-card>',
    });
    expect(page.root.shadowRoot.querySelector('.card__content slot')).toBeTruthy();
  });
});
