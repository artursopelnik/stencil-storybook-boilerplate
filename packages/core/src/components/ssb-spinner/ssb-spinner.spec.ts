import { newSpecPage } from '@stencil/core/testing';
import { SsbSpinner } from './ssb-spinner';

describe('ssb-spinner', () => {
  it('renders with the default size and role status', async () => {
    const page = await newSpecPage({
      components: [SsbSpinner],
      html: '<ssb-spinner></ssb-spinner>',
    });
    const spinner = page.root.shadowRoot.querySelector('.spinner');
    expect(spinner).toBeTruthy();
    expect(spinner.getAttribute('role')).toBe('status');
    expect(spinner.classList.contains('spinner--md')).toBe(true);
  });

  it('applies the size class', async () => {
    const page = await newSpecPage({
      components: [SsbSpinner],
      html: '<ssb-spinner size="lg"></ssb-spinner>',
    });
    const spinner = page.root.shadowRoot.querySelector('.spinner');
    expect(spinner.classList.contains('spinner--lg')).toBe(true);
  });

  it('renders a visually hidden label', async () => {
    const page = await newSpecPage({
      components: [SsbSpinner],
      html: '<ssb-spinner label="Saving…"></ssb-spinner>',
    });
    const label = page.root.shadowRoot.querySelector('.spinner__label');
    expect(label.textContent).toBe('Saving…');
  });
});
