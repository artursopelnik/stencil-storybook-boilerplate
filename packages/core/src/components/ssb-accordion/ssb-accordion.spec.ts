import { newSpecPage } from '@stencil/core/testing';
import { SsbAccordion } from './ssb-accordion';

describe('ssb-accordion', () => {
  it('renders a slot for accordion items', async () => {
    const page = await newSpecPage({
      components: [SsbAccordion],
      html: '<ssb-accordion></ssb-accordion>',
    });
    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('slot')).toBeTruthy();
  });

  it('defaults to single-open mode', async () => {
    const page = await newSpecPage({
      components: [SsbAccordion],
      html: '<ssb-accordion></ssb-accordion>',
    });
    const accordion = page.rootInstance as SsbAccordion;
    expect(accordion.multiple).toBe(false);
  });

  it('accepts the multiple attribute', async () => {
    const page = await newSpecPage({
      components: [SsbAccordion],
      html: '<ssb-accordion multiple></ssb-accordion>',
    });
    const accordion = page.rootInstance as SsbAccordion;
    expect(accordion.multiple).toBe(true);
  });
});
