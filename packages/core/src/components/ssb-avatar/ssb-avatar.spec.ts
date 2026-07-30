import { newSpecPage } from '@stencil/core/testing';
import { SsbAvatar } from './ssb-avatar';

describe('ssb-avatar', () => {
  it('renders an image when src is set', async () => {
    const page = await newSpecPage({
      components: [SsbAvatar],
      html: '<ssb-avatar src="https://example.com/avatar.png" alt="Jane Doe"></ssb-avatar>',
    });
    const image = page.root.shadowRoot.querySelector('img');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('https://example.com/avatar.png');
    expect(image.getAttribute('alt')).toBe('Jane Doe');
  });

  it('renders the initials fallback when no src is set', async () => {
    const page = await newSpecPage({
      components: [SsbAvatar],
      html: '<ssb-avatar initials="JD"></ssb-avatar>',
    });
    const fallback = page.root.shadowRoot.querySelector('.avatar__fallback');
    expect(fallback).toBeTruthy();
    expect(fallback.textContent).toBe('JD');
  });

  it('applies shape and size classes', async () => {
    const page = await newSpecPage({
      components: [SsbAvatar],
      html: '<ssb-avatar shape="square" size="lg" initials="JD"></ssb-avatar>',
    });
    const avatar = page.root.shadowRoot.querySelector('.avatar');
    expect(avatar.classList.contains('avatar--square')).toBe(true);
    expect(avatar.classList.contains('avatar--lg')).toBe(true);
  });
});
