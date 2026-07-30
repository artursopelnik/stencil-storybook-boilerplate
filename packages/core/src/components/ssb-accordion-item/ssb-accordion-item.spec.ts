import { newSpecPage } from '@stencil/core/testing';
import { SsbAccordionItem } from './ssb-accordion-item';

describe('ssb-accordion-item', () => {
  it('renders a closed item with heading', async () => {
    const page = await newSpecPage({
      components: [SsbAccordionItem],
      html: '<ssb-accordion-item heading="Section 1">Content</ssb-accordion-item>',
    });
    const trigger = page.root.shadowRoot.querySelector('button');
    const content = page.root.shadowRoot.querySelector('.content');
    expect(trigger.textContent).toContain('Section 1');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(content.hasAttribute('hidden')).toBe(true);
  });

  it('shows the content region when open', async () => {
    const page = await newSpecPage({
      components: [SsbAccordionItem],
      html: '<ssb-accordion-item heading="Section 1" open>Content</ssb-accordion-item>',
    });
    const trigger = page.root.shadowRoot.querySelector('button');
    const content = page.root.shadowRoot.querySelector('.content');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(content.hasAttribute('hidden')).toBe(false);
    expect(content.getAttribute('role')).toBe('region');
  });

  it('emits ssbToggle when the trigger is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbAccordionItem],
      html: '<ssb-accordion-item heading="Section 1">Content</ssb-accordion-item>',
    });
    const toggleSpy = jest.fn();
    page.root.addEventListener('ssbToggle', toggleSpy);
    page.root.shadowRoot.querySelector('button').click();
    await page.waitForChanges();
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    expect(toggleSpy.mock.calls[0][0].detail).toEqual({ open: true });
  });

  it('disables the trigger button', async () => {
    const page = await newSpecPage({
      components: [SsbAccordionItem],
      html: '<ssb-accordion-item heading="Section 1" disabled>Content</ssb-accordion-item>',
    });
    const trigger = page.root.shadowRoot.querySelector('button');
    expect(trigger.hasAttribute('disabled')).toBe(true);
  });
});
