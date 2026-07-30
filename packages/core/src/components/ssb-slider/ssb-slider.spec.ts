import { newSpecPage } from '@stencil/core/testing';
import { SsbSlider } from './ssb-slider';

describe('ssb-slider', () => {
  it('renders a range input with the defaults', async () => {
    const page = await newSpecPage({
      components: [SsbSlider],
      html: '<ssb-slider></ssb-slider>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.getAttribute('type')).toBe('range');
    expect(input.getAttribute('min')).toBe('0');
    expect(input.getAttribute('max')).toBe('100');
    expect(input.getAttribute('style')).toContain('50%');
  });

  it('renders the current value when show-value is set', async () => {
    const page = await newSpecPage({
      components: [SsbSlider],
      html: '<ssb-slider value="30" show-value></ssb-slider>',
    });
    const value = page.root.shadowRoot.querySelector('.slider__value');
    expect(value).toBeTruthy();
    expect(value.textContent).toBe('30');
  });

  it('emits ssbInput while dragging', async () => {
    const page = await newSpecPage({
      components: [SsbSlider],
      html: '<ssb-slider value="30"></ssb-slider>',
    });
    const spy = jest.fn();
    page.root.addEventListener('ssbInput', spy);
    const input = page.root.shadowRoot.querySelector('input');
    input.value = '75';
    input.dispatchEvent(new Event('input'));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 75 });
  });

  it('disables the native input', async () => {
    const page = await newSpecPage({
      components: [SsbSlider],
      html: '<ssb-slider disabled></ssb-slider>',
    });
    const input = page.root.shadowRoot.querySelector('input');
    expect(input.hasAttribute('disabled')).toBe(true);
  });
});
