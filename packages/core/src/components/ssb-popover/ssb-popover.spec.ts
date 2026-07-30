import { newSpecPage } from '@stencil/core/testing';
import { SsbPopover } from './ssb-popover';

describe('ssb-popover', () => {
  it('renders the panel hidden by default with bottom/center placement', async () => {
    const page = await newSpecPage({
      components: [SsbPopover],
      html: '<ssb-popover><button slot="trigger">Toggle</button><p>Panel content</p></ssb-popover>',
    });
    const panel = page.root.shadowRoot.querySelector('.popover__panel');
    expect(panel).toBeTruthy();
    expect(panel.classList.contains('popover__panel--open')).toBe(false);
    expect(panel.classList.contains('popover__panel--bottom')).toBe(true);
    expect(panel.classList.contains('popover__panel--align-center')).toBe(true);
  });

  it('shows the panel when open is set', async () => {
    const page = await newSpecPage({
      components: [SsbPopover],
      html: '<ssb-popover open position="top" align="end"><button slot="trigger">Toggle</button><p>Panel content</p></ssb-popover>',
    });
    const panel = page.root.shadowRoot.querySelector('.popover__panel');
    expect(panel.classList.contains('popover__panel--open')).toBe(true);
    expect(panel.classList.contains('popover__panel--top')).toBe(true);
    expect(panel.classList.contains('popover__panel--align-end')).toBe(true);
  });

  it('toggles open and emits ssbOpenChange when the trigger is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbPopover],
      html: '<ssb-popover><button slot="trigger">Toggle</button><p>Panel content</p></ssb-popover>',
    });
    const openChange = jest.fn();
    page.root.addEventListener('ssbOpenChange', openChange);
    const trigger = page.root.shadowRoot.querySelector('.popover__trigger') as HTMLElement;
    trigger.click();
    await page.waitForChanges();
    expect(openChange).toHaveBeenCalledTimes(1);
    expect((page.root as HTMLElement & { open: boolean }).open).toBe(true);
    trigger.click();
    await page.waitForChanges();
    expect(openChange).toHaveBeenCalledTimes(2);
    expect((page.root as HTMLElement & { open: boolean }).open).toBe(false);
  });
});
