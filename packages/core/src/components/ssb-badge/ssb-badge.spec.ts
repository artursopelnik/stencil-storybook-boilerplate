import { newSpecPage } from '@stencil/core/testing';
import { SsbBadge } from './ssb-badge';

describe('ssb-badge', () => {
  it('renders with the default variant', async () => {
    const page = await newSpecPage({
      components: [SsbBadge],
      html: '<ssb-badge>New</ssb-badge>',
    });
    const badge = page.root.shadowRoot.querySelector('.badge');
    expect(badge).toBeTruthy();
    expect(badge.classList.contains('badge--primary')).toBe(true);
  });

  it('applies the variant class', async () => {
    const page = await newSpecPage({
      components: [SsbBadge],
      html: '<ssb-badge variant="outline">Draft</ssb-badge>',
    });
    const badge = page.root.shadowRoot.querySelector('.badge');
    expect(badge.classList.contains('badge--outline')).toBe(true);
  });
});
