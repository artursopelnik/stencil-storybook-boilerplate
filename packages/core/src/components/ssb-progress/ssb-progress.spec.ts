import { newSpecPage } from '@stencil/core/testing';
import { SsbProgress } from './ssb-progress';

describe('ssb-progress', () => {
  it('renders a progressbar with the default range', async () => {
    const page = await newSpecPage({
      components: [SsbProgress],
      html: '<ssb-progress></ssb-progress>',
    });
    const track = page.root.shadowRoot.querySelector('.progress');
    expect(track).toBeTruthy();
    expect(track.getAttribute('role')).toBe('progressbar');
    expect(track.getAttribute('aria-valuemin')).toBe('0');
    expect(track.getAttribute('aria-valuemax')).toBe('100');
    expect(track.getAttribute('aria-valuenow')).toBe('0');
  });

  it('sets the indicator width from value and max', async () => {
    const page = await newSpecPage({
      components: [SsbProgress],
      html: '<ssb-progress value="25" max="50"></ssb-progress>',
    });
    const indicator = page.root.shadowRoot.querySelector('.progress__indicator');
    expect(indicator.getAttribute('style')).toContain('50%');
  });

  it('clamps the indicator width to 100%', async () => {
    const page = await newSpecPage({
      components: [SsbProgress],
      html: '<ssb-progress value="200" max="100"></ssb-progress>',
    });
    const indicator = page.root.shadowRoot.querySelector('.progress__indicator');
    expect(indicator.getAttribute('style')).toContain('100%');
  });

  it('applies the label as aria-label', async () => {
    const page = await newSpecPage({
      components: [SsbProgress],
      html: '<ssb-progress label="Uploading"></ssb-progress>',
    });
    const track = page.root.shadowRoot.querySelector('.progress');
    expect(track.getAttribute('aria-label')).toBe('Uploading');
  });
});
