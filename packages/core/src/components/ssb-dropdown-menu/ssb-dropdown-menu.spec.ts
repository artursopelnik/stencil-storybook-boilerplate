import { newSpecPage } from '@stencil/core/testing';
import { SsbDropdownMenu } from './ssb-dropdown-menu';

describe('ssb-dropdown-menu', () => {
  it('renders the menu hidden by default', async () => {
    const page = await newSpecPage({
      components: [SsbDropdownMenu],
      html: '<ssb-dropdown-menu items=\'[{ "label": "Profile", "value": "profile" }]\'><button slot="trigger">Menu</button></ssb-dropdown-menu>',
    });
    const menu = page.root.shadowRoot.querySelector('.menu');
    expect(menu).toBeTruthy();
    expect(menu.classList.contains('menu--open')).toBe(false);
    expect(menu.getAttribute('role')).toBe('menu');
  });

  it('renders items, separators and group labels from a JSON string', async () => {
    const page = await newSpecPage({
      components: [SsbDropdownMenu],
      html: '<ssb-dropdown-menu open items=\'[{ "groupLabel": "Account" }, { "label": "Profile", "value": "profile" }, { "separator": true }, { "label": "Delete", "value": "delete", "destructive": true }]\'><button slot="trigger">Menu</button></ssb-dropdown-menu>',
    });
    expect(page.root.shadowRoot.querySelectorAll('.menu__item').length).toBe(2);
    expect(page.root.shadowRoot.querySelectorAll('.menu__separator').length).toBe(1);
    expect(page.root.shadowRoot.querySelector('.menu__group-label').textContent).toBe('Account');
    expect(page.root.shadowRoot.querySelector('.menu__item--destructive').textContent).toBe('Delete');
  });

  it('emits ssbSelect with the item value and closes when an item is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbDropdownMenu],
      html: '<ssb-dropdown-menu open items=\'[{ "label": "Profile", "value": "profile" }]\'><button slot="trigger">Menu</button></ssb-dropdown-menu>',
    });
    const onSelect = jest.fn();
    page.root.addEventListener('ssbSelect', onSelect);
    const item = page.root.shadowRoot.querySelector('.menu__item') as HTMLButtonElement;
    item.click();
    await page.waitForChanges();
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect((onSelect.mock.calls[0][0] as CustomEvent<{ value: string }>).detail).toEqual({ value: 'profile' });
    expect((page.root as HTMLElement & { open: boolean }).open).toBe(false);
  });

  it('toggles open and emits ssbOpenChange when the trigger is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbDropdownMenu],
      html: '<ssb-dropdown-menu items=\'[{ "label": "Profile", "value": "profile" }]\'><button slot="trigger">Menu</button></ssb-dropdown-menu>',
    });
    const openChange = jest.fn();
    page.root.addEventListener('ssbOpenChange', openChange);
    const trigger = page.root.shadowRoot.querySelector('.menu__trigger') as HTMLElement;
    trigger.click();
    await page.waitForChanges();
    expect(openChange).toHaveBeenCalledTimes(1);
    expect((page.root as HTMLElement & { open: boolean }).open).toBe(true);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });
});
