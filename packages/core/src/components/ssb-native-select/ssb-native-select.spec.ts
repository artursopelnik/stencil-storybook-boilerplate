import { newSpecPage } from '@stencil/core/testing';
import { SsbNativeSelect } from './ssb-native-select';

describe('ssb-native-select', () => {
  it('renders options from a JSON string attribute', async () => {
    const page = await newSpecPage({
      components: [SsbNativeSelect],
      html: '<ssb-native-select options=\'[{"label":"Apple","value":"apple"},{"label":"Banana","value":"banana"}]\'></ssb-native-select>',
    });
    const options = page.root.shadowRoot.querySelectorAll('option');
    expect(options.length).toBe(2);
    expect(options[0].textContent).toBe('Apple');
    expect(options[1].getAttribute('value')).toBe('banana');
  });

  it('renders a disabled placeholder option first', async () => {
    const page = await newSpecPage({
      components: [SsbNativeSelect],
      html: '<ssb-native-select placeholder="Select a fruit" options=\'[{"label":"Apple","value":"apple"}]\'></ssb-native-select>',
    });
    const options = page.root.shadowRoot.querySelectorAll('option');
    expect(options.length).toBe(2);
    expect(options[0].textContent).toBe('Select a fruit');
    expect(options[0].hasAttribute('disabled')).toBe(true);
    expect(options[0].getAttribute('value')).toBe('');
  });

  it('renders an empty select for invalid JSON options', async () => {
    const page = await newSpecPage({
      components: [SsbNativeSelect],
      html: '<ssb-native-select options="not-json"></ssb-native-select>',
    });
    const options = page.root.shadowRoot.querySelectorAll('option');
    expect(options.length).toBe(0);
  });

  it('disables the native select and applies the size class', async () => {
    const page = await newSpecPage({
      components: [SsbNativeSelect],
      html: '<ssb-native-select disabled size="sm"></ssb-native-select>',
    });
    const select = page.root.shadowRoot.querySelector('select');
    expect(select.hasAttribute('disabled')).toBe(true);
    expect(select.classList.contains('select__control--sm')).toBe(true);
  });
});
