import { newSpecPage } from '@stencil/core/testing';
import { SsbRadioGroup } from './ssb-radio-group';
import { SsbRadio } from '../ssb-radio/ssb-radio';

describe('ssb-radio-group', () => {
  it('renders with role radiogroup and vertical orientation by default', async () => {
    const page = await newSpecPage({
      components: [SsbRadioGroup],
      html: '<ssb-radio-group></ssb-radio-group>',
    });
    expect(page.root.getAttribute('role')).toBe('radiogroup');
    const wrapper = page.root.shadowRoot.querySelector('.radio-group');
    expect(wrapper.classList.contains('radio-group--vertical')).toBe(true);
  });

  it('checks the child radio matching its value', async () => {
    const page = await newSpecPage({
      components: [SsbRadioGroup, SsbRadio],
      html: `<ssb-radio-group value="b">
        <ssb-radio value="a">A</ssb-radio>
        <ssb-radio value="b">B</ssb-radio>
      </ssb-radio-group>`,
    });
    await page.waitForChanges();
    const radios = page.root.querySelectorAll('ssb-radio');
    expect((radios[0] as HTMLElement & { checked: boolean }).checked).toBe(false);
    expect((radios[1] as HTMLElement & { checked: boolean }).checked).toBe(true);
  });

  it('updates its value and emits ssbChange when a child radio is selected', async () => {
    const page = await newSpecPage({
      components: [SsbRadioGroup, SsbRadio],
      html: `<ssb-radio-group value="a">
        <ssb-radio value="a">A</ssb-radio>
        <ssb-radio value="b">B</ssb-radio>
      </ssb-radio-group>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('ssbChange', spy);
    const radios = page.root.querySelectorAll('ssb-radio');
    radios[1].dispatchEvent(new CustomEvent('ssbRadioSelect', { detail: { value: 'b' }, bubbles: true }));
    await page.waitForChanges();
    expect((page.root as HTMLElement & { value: string }).value).toBe('b');
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ value: 'b' });
  });
});
