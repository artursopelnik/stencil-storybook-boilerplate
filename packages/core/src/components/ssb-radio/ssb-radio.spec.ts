import { newSpecPage } from '@stencil/core/testing';
import { SsbRadio } from './ssb-radio';

describe('ssb-radio', () => {
  it('renders an unchecked radio by default', async () => {
    const page = await newSpecPage({
      components: [SsbRadio],
      html: '<ssb-radio value="one">One</ssb-radio>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.getAttribute('type')).toBe('radio');
    expect(page.root.shadowRoot.querySelector('.radio__circle--checked')).toBeFalsy();
  });

  it('renders the checked dot when checked', async () => {
    const page = await newSpecPage({
      components: [SsbRadio],
      html: '<ssb-radio value="one" checked>One</ssb-radio>',
    });
    expect(page.root.shadowRoot.querySelector('.radio__circle--checked')).toBeTruthy();
  });

  it('emits ssbRadioSelect with its value on change', async () => {
    const page = await newSpecPage({
      components: [SsbRadio],
      html: '<ssb-radio value="one">One</ssb-radio>',
    });
    const spy = jest.fn();
    page.root.addEventListener('ssbRadioSelect', spy);
    const input = page.root.shadowRoot.querySelector('input');
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 'one' });
  });

  it('does not emit when disabled', async () => {
    const page = await newSpecPage({
      components: [SsbRadio],
      html: '<ssb-radio value="one" disabled>One</ssb-radio>',
    });
    const spy = jest.fn();
    page.root.addEventListener('ssbRadioSelect', spy);
    const input = page.root.shadowRoot.querySelector('input');
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });
});
