import { newSpecPage } from '@stencil/core/testing';
import { SsbSelect } from './ssb-select';

describe('ssb-select', () => {
  it('renders the closed trigger with the placeholder', async () => {
    const page = await newSpecPage({
      components: [SsbSelect],
      html: '<ssb-select options=\'[{ "label": "Apple", "value": "apple" }]\'></ssb-select>',
    });
    const trigger = page.root.shadowRoot.querySelector('.select__trigger');
    expect(trigger.getAttribute('role')).toBe('combobox');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-haspopup')).toBe('listbox');
    expect(page.root.shadowRoot.querySelector('.select__value--placeholder').textContent).toBe('Select an option');
    expect(page.root.shadowRoot.querySelector('.select__listbox').classList.contains('select__listbox--open')).toBe(false);
  });

  it('renders options from a JSON string and marks the selected option when open', async () => {
    const page = await newSpecPage({
      components: [SsbSelect],
      html: '<ssb-select open value="banana" options=\'[{ "label": "Apple", "value": "apple" }, { "label": "Banana", "value": "banana" }, { "label": "Cherry", "value": "cherry", "disabled": true }]\'></ssb-select>',
    });
    const options = page.root.shadowRoot.querySelectorAll('.select__option');
    expect(options.length).toBe(3);
    expect(page.root.shadowRoot.querySelector('.select__listbox').classList.contains('select__listbox--open')).toBe(true);
    expect(options[1].getAttribute('aria-selected')).toBe('true');
    expect(options[1].querySelector('.select__check')).toBeTruthy();
    expect(options[2].classList.contains('select__option--disabled')).toBe(true);
    expect(page.root.shadowRoot.querySelector('.select__value').textContent).toBe('Banana');
  });

  it('emits ssbChange with the option value and closes when an option is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbSelect],
      html: '<ssb-select open options=\'[{ "label": "Apple", "value": "apple" }]\'></ssb-select>',
    });
    const onChange = jest.fn();
    page.root.addEventListener('ssbChange', onChange);
    const option = page.root.shadowRoot.querySelector('.select__option') as HTMLElement;
    option.click();
    await page.waitForChanges();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((onChange.mock.calls[0][0] as CustomEvent<{ value: string }>).detail).toEqual({ value: 'apple' });
    expect((page.root as HTMLElement & { value: string }).value).toBe('apple');
    expect((page.root as HTMLElement & { open: boolean }).open).toBe(false);
  });

  it('toggles open and emits ssbOpenChange when the trigger is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbSelect],
      html: '<ssb-select options=\'[{ "label": "Apple", "value": "apple" }]\'></ssb-select>',
    });
    const openChange = jest.fn();
    page.root.addEventListener('ssbOpenChange', openChange);
    const trigger = page.root.shadowRoot.querySelector('.select__trigger') as HTMLButtonElement;
    trigger.click();
    await page.waitForChanges();
    expect(openChange).toHaveBeenCalledTimes(1);
    expect((openChange.mock.calls[0][0] as CustomEvent<{ open: boolean }>).detail).toEqual({ open: true });
    expect((page.root as HTMLElement & { open: boolean }).open).toBe(true);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });
});
