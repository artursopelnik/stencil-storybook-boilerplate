import { newSpecPage } from '@stencil/core/testing';
import { SsbCombobox } from './ssb-combobox';

const OPTIONS = JSON.stringify([
  { label: 'Next.js', value: 'next' },
  { label: 'SvelteKit', value: 'sveltekit' },
  { label: 'Nuxt', value: 'nuxt' },
]);

describe('ssb-combobox', () => {
  it('renders the placeholder while nothing is selected', async () => {
    const page = await newSpecPage({
      components: [SsbCombobox],
      html: `<ssb-combobox options='${OPTIONS}' placeholder="Select framework"></ssb-combobox>`,
    });
    expect(page.root.shadowRoot.querySelector('.combobox__value').textContent).toBe('Select framework');
  });

  it('parses options from a JSON attribute and renders them', async () => {
    const page = await newSpecPage({
      components: [SsbCombobox],
      html: `<ssb-combobox options='${OPTIONS}' open></ssb-combobox>`,
    });
    expect(page.root.shadowRoot.querySelectorAll('[role="option"]').length).toBe(3);
  });

  it('shows the selected option label with a checkmark', async () => {
    const page = await newSpecPage({
      components: [SsbCombobox],
      html: `<ssb-combobox options='${OPTIONS}' value="nuxt" open></ssb-combobox>`,
    });
    expect(page.root.shadowRoot.querySelector('.combobox__value').textContent).toBe('Nuxt');
    expect(page.root.shadowRoot.querySelector('.combobox__option--selected .combobox__check')).toBeTruthy();
  });

  it('emits ssbChange when an option is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbCombobox],
      html: `<ssb-combobox options='${OPTIONS}' open></ssb-combobox>`,
    });
    const change = jest.fn();
    page.root.addEventListener('ssbChange', change);
    const option = page.root.shadowRoot.querySelectorAll<HTMLElement>('[role="option"]')[1];
    option.click();
    await page.waitForChanges();
    expect(change).toHaveBeenCalledTimes(1);
    expect((change.mock.calls[0][0] as CustomEvent<{ value: string }>).detail).toEqual({ value: 'sveltekit' });
  });
});
