import { newSpecPage } from '@stencil/core/testing';
import { SsbDrawer } from './ssb-drawer';

describe('ssb-drawer', () => {
  it('renders closed by default', async () => {
    const page = await newSpecPage({
      components: [SsbDrawer],
      html: '<ssb-drawer drawer-title="Settings"></ssb-drawer>',
    });
    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('.drawer__overlay--open')).toBeFalsy();
  });

  it('renders panel with title and description when open', async () => {
    const page = await newSpecPage({
      components: [SsbDrawer],
      html: '<ssb-drawer open drawer-title="Settings" description="Adjust your preferences."></ssb-drawer>',
    });
    expect(page.root.shadowRoot.querySelector('.drawer__title').textContent).toBe('Settings');
    expect(page.root.shadowRoot.querySelector('.drawer__description').textContent).toBe('Adjust your preferences.');
    expect(page.root.shadowRoot.querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('applies the side modifier class', async () => {
    const page = await newSpecPage({
      components: [SsbDrawer],
      html: '<ssb-drawer open side="right"></ssb-drawer>',
    });
    expect(page.root.shadowRoot.querySelector('.drawer__panel--right')).toBeTruthy();
  });

  it('emits ssbOpenChange when the close button is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbDrawer],
      html: '<ssb-drawer open drawer-title="Settings"></ssb-drawer>',
    });
    const openChange = jest.fn();
    page.root.addEventListener('ssbOpenChange', openChange);
    const close = page.root.shadowRoot.querySelector<HTMLButtonElement>('.drawer__close');
    close.click();
    await page.waitForChanges();
    expect(openChange).toHaveBeenCalledTimes(1);
    expect((openChange.mock.calls[0][0] as CustomEvent<{ open: boolean }>).detail).toEqual({ open: false });
  });
});
