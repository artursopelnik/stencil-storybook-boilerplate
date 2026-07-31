import { newSpecPage } from '@stencil/core/testing';
import { SsbCommand } from './ssb-command';

const ITEMS = JSON.stringify([
  { label: 'Calendar', value: 'calendar', group: 'Suggestions' },
  { label: 'Search Emoji', value: 'emoji', group: 'Suggestions' },
  { label: 'Profile', value: 'profile', group: 'Settings', shortcut: '⌘P' },
  { label: 'Billing', value: 'billing', group: 'Settings', disabled: true },
]);

describe('ssb-command', () => {
  it('renders items grouped with group labels', async () => {
    const page = await newSpecPage({
      components: [SsbCommand],
      html: `<ssb-command items='${ITEMS}'></ssb-command>`,
    });
    const labels = Array.from(page.root.shadowRoot.querySelectorAll('.command__group-label')).map(node => node.textContent);
    expect(labels).toEqual(['Suggestions', 'Settings']);
    expect(page.root.shadowRoot.querySelectorAll('[role="option"]').length).toBe(4);
  });

  it('renders shortcuts', async () => {
    const page = await newSpecPage({
      components: [SsbCommand],
      html: `<ssb-command items='${ITEMS}'></ssb-command>`,
    });
    expect(page.root.shadowRoot.querySelector('.command__shortcut').textContent).toBe('⌘P');
  });

  it('emits ssbSelect when an item is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbCommand],
      html: `<ssb-command items='${ITEMS}'></ssb-command>`,
    });
    const select = jest.fn();
    page.root.addEventListener('ssbSelect', select);
    page.root.shadowRoot.querySelectorAll<HTMLElement>('[role="option"]')[2].click();
    await page.waitForChanges();
    expect(select).toHaveBeenCalledTimes(1);
    expect((select.mock.calls[0][0] as CustomEvent<{ value: string }>).detail).toEqual({ value: 'profile' });
  });

  it('does not emit for disabled items', async () => {
    const page = await newSpecPage({
      components: [SsbCommand],
      html: `<ssb-command items='${ITEMS}'></ssb-command>`,
    });
    const select = jest.fn();
    page.root.addEventListener('ssbSelect', select);
    page.root.shadowRoot.querySelectorAll<HTMLElement>('[role="option"]')[3].click();
    await page.waitForChanges();
    expect(select).not.toHaveBeenCalled();
  });
});
