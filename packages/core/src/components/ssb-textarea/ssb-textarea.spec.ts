import { newSpecPage } from '@stencil/core/testing';
import { SsbTextarea } from './ssb-textarea';

describe('ssb-textarea', () => {
  it('renders a native textarea with the default rows', async () => {
    const page = await newSpecPage({
      components: [SsbTextarea],
      html: '<ssb-textarea></ssb-textarea>',
    });
    const textarea = page.root.shadowRoot.querySelector('textarea');
    expect(textarea).toBeTruthy();
    expect(textarea.getAttribute('rows')).toBe('3');
  });

  it('forwards placeholder and rows to the native textarea', async () => {
    const page = await newSpecPage({
      components: [SsbTextarea],
      html: '<ssb-textarea placeholder="Your message" rows="5"></ssb-textarea>',
    });
    const textarea = page.root.shadowRoot.querySelector('textarea');
    expect(textarea.getAttribute('placeholder')).toBe('Your message');
    expect(textarea.getAttribute('rows')).toBe('5');
  });

  it('marks the textarea as invalid', async () => {
    const page = await newSpecPage({
      components: [SsbTextarea],
      html: '<ssb-textarea invalid></ssb-textarea>',
    });
    const textarea = page.root.shadowRoot.querySelector('textarea');
    expect(textarea.classList.contains('textarea--invalid')).toBe(true);
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
  });

  it('disables the native textarea', async () => {
    const page = await newSpecPage({
      components: [SsbTextarea],
      html: '<ssb-textarea disabled></ssb-textarea>',
    });
    const textarea = page.root.shadowRoot.querySelector('textarea');
    expect(textarea.hasAttribute('disabled')).toBe(true);
  });
});
