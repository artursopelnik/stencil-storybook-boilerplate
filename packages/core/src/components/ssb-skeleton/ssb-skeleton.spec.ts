import { newSpecPage } from '@stencil/core/testing';
import { SsbSkeleton } from './ssb-skeleton';

describe('ssb-skeleton', () => {
  it('renders with default width, height and rounded values', async () => {
    const page = await newSpecPage({
      components: [SsbSkeleton],
      html: '<ssb-skeleton></ssb-skeleton>',
    });
    const skeleton = page.root.shadowRoot.querySelector('.skeleton') as HTMLElement;
    expect(skeleton).toBeTruthy();
    expect(skeleton.classList.contains('skeleton--medium')).toBe(true);
    expect(skeleton.style.width).toBe('100%');
    expect(skeleton.style.height).toBe('1rem');
  });

  it('applies custom width, height and rounded', async () => {
    const page = await newSpecPage({
      components: [SsbSkeleton],
      html: '<ssb-skeleton width="3rem" height="3rem" rounded="full"></ssb-skeleton>',
    });
    const skeleton = page.root.shadowRoot.querySelector('.skeleton') as HTMLElement;
    expect(skeleton.classList.contains('skeleton--full')).toBe(true);
    expect(skeleton.style.width).toBe('3rem');
    expect(skeleton.style.height).toBe('3rem');
  });

  it('is hidden from assistive technology', async () => {
    const page = await newSpecPage({
      components: [SsbSkeleton],
      html: '<ssb-skeleton></ssb-skeleton>',
    });
    const skeleton = page.root.shadowRoot.querySelector('.skeleton');
    expect(skeleton.getAttribute('aria-hidden')).toBe('true');
  });
});
