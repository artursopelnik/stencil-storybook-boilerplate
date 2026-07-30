import { newSpecPage } from '@stencil/core/testing';
import { SsbToast } from './ssb-toast';

describe('ssb-toast', () => {
  it('renders nothing when closed', async () => {
    const page = await newSpecPage({
      components: [SsbToast],
      html: '<ssb-toast toast-title="Saved"></ssb-toast>',
    });
    expect(page.root.shadowRoot.querySelector('.toast')).toBeFalsy();
  });

  it('renders title, description and status role when open', async () => {
    const page = await newSpecPage({
      components: [SsbToast],
      html: '<ssb-toast open toast-title="Saved" description="Your changes have been saved."></ssb-toast>',
    });
    const toast = page.root.shadowRoot.querySelector('.toast');
    expect(toast).toBeTruthy();
    expect(toast.getAttribute('role')).toBe('status');
    expect(page.root.shadowRoot.querySelector('.toast__title').textContent).toBe('Saved');
    expect(page.root.shadowRoot.querySelector('.toast__description').textContent).toBe('Your changes have been saved.');
  });

  it('uses the alert role for the destructive variant', async () => {
    const page = await newSpecPage({
      components: [SsbToast],
      html: '<ssb-toast open variant="destructive" toast-title="Something went wrong"></ssb-toast>',
    });
    const toast = page.root.shadowRoot.querySelector('.toast');
    expect(toast.classList.contains('toast--destructive')).toBe(true);
    expect(toast.getAttribute('role')).toBe('alert');
  });

  it('closes and emits ssbClose when the close button is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbToast],
      html: '<ssb-toast open toast-title="Saved"></ssb-toast>',
    });
    const onClose = jest.fn();
    page.root.addEventListener('ssbClose', onClose);
    const closeButton = page.root.shadowRoot.querySelector('.toast__close') as HTMLButtonElement;
    closeButton.click();
    await page.waitForChanges();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect((page.root as HTMLElement & { open: boolean }).open).toBe(false);
    expect(page.root.shadowRoot.querySelector('.toast')).toBeFalsy();
  });
});
