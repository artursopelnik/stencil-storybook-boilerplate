import { newSpecPage } from '@stencil/core/testing';
import { SsbSidebar } from './ssb-sidebar';

describe('ssb-sidebar', () => {
  it('renders expanded on the left side by default', async () => {
    const page = await newSpecPage({
      components: [SsbSidebar],
      html: '<ssb-sidebar></ssb-sidebar>',
    });
    const sidebar = page.root.shadowRoot.querySelector('.sidebar');
    expect(sidebar.classList.contains('sidebar--left')).toBe(true);
    expect(sidebar.classList.contains('sidebar--collapsed')).toBe(false);
    expect(page.root.shadowRoot.querySelector('.sidebar__toggle')).toBeTruthy();
  });

  it('applies the collapsed state when the collapsed attribute is set', async () => {
    const page = await newSpecPage({
      components: [SsbSidebar],
      html: '<ssb-sidebar collapsed collapsed-width="4rem"></ssb-sidebar>',
    });
    const sidebar = page.root.shadowRoot.querySelector('.sidebar');
    expect(sidebar.classList.contains('sidebar--collapsed')).toBe(true);
    const toggle = page.root.shadowRoot.querySelector('.sidebar__toggle');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles and emits ssbToggle when the toggle button is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbSidebar],
      html: '<ssb-sidebar></ssb-sidebar>',
    });
    const toggleSpy = jest.fn();
    page.root.addEventListener('ssbToggle', toggleSpy);
    const toggle = page.root.shadowRoot.querySelector('.sidebar__toggle') as HTMLButtonElement;
    toggle.click();
    await page.waitForChanges();
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect((page.root as HTMLElement & { collapsed: boolean }).collapsed).toBe(true);
  });

  it('hides the toggle button when collapsible is false', async () => {
    const page = await newSpecPage({
      components: [SsbSidebar],
      html: '<ssb-sidebar collapsible="false"></ssb-sidebar>',
    });
    expect(page.root.shadowRoot.querySelector('.sidebar__toggle')).toBeFalsy();
  });
});
