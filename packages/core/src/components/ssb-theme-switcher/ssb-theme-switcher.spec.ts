import { newSpecPage } from '@stencil/core/testing';
import { SsbThemeSwitcher } from './ssb-theme-switcher';

describe('ssb-theme-switcher', () => {
  it('renders a toggle button with the light theme by default', async () => {
    const page = await newSpecPage({
      components: [SsbThemeSwitcher],
      html: '<ssb-theme-switcher></ssb-theme-switcher>',
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(page.root.getAttribute('theme')).toBe('light');
  });

  it('toggles the theme and updates aria-pressed on click', async () => {
    const page = await newSpecPage({
      components: [SsbThemeSwitcher],
      html: '<ssb-theme-switcher></ssb-theme-switcher>',
    });
    const button = page.root.shadowRoot.querySelector('button');
    button.click();
    await page.waitForChanges();
    expect(page.root.getAttribute('theme')).toBe('dark');
    expect(page.root.shadowRoot.querySelector('button').getAttribute('aria-pressed')).toBe('true');
  });

  it('emits ssbThemeChange with the new theme', async () => {
    const page = await newSpecPage({
      components: [SsbThemeSwitcher],
      html: '<ssb-theme-switcher></ssb-theme-switcher>',
    });
    const spy = jest.fn();
    page.root.addEventListener('ssbThemeChange', spy);
    page.root.shadowRoot.querySelector('button').click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toEqual({ theme: 'dark' });
  });
});
