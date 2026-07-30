import { newSpecPage } from '@stencil/core/testing';
import { SsbTabs } from './ssb-tabs';

describe('ssb-tabs', () => {
  it('renders tabs from a JSON string and selects the first tab by default', async () => {
    const page = await newSpecPage({
      components: [SsbTabs],
      html: `<ssb-tabs tabs='[{"value":"one","label":"One"},{"value":"two","label":"Two"}]'></ssb-tabs>`,
    });
    const tabs = page.root.shadowRoot.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBe(2);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('aria-selected')).toBe('false');
  });

  it('renders only the panel of the selected tab', async () => {
    const page = await newSpecPage({
      components: [SsbTabs],
      html: `<ssb-tabs tabs='[{"value":"one","label":"One"},{"value":"two","label":"Two"}]' value="two"></ssb-tabs>`,
    });
    const panel = page.root.shadowRoot.querySelector('[role="tabpanel"]');
    expect(panel.getAttribute('id')).toBe('panel-two');
    expect(panel.querySelector('slot').getAttribute('name')).toBe('two');
  });

  it('emits ssbChange when a tab is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbTabs],
      html: `<ssb-tabs tabs='[{"value":"one","label":"One"},{"value":"two","label":"Two"}]'></ssb-tabs>`,
    });
    const changeSpy = jest.fn();
    page.root.addEventListener('ssbChange', changeSpy);
    const buttons = page.root.shadowRoot.querySelectorAll('button');
    buttons[1].click();
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ value: 'two' });
  });

  it('disables tabs marked as disabled', async () => {
    const page = await newSpecPage({
      components: [SsbTabs],
      html: `<ssb-tabs tabs='[{"value":"one","label":"One"},{"value":"two","label":"Two","disabled":true}]'></ssb-tabs>`,
    });
    const buttons = page.root.shadowRoot.querySelectorAll('button');
    expect(buttons[1].hasAttribute('disabled')).toBe(true);
  });
});
