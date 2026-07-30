import { newSpecPage } from '@stencil/core/testing';
import { SsbDialog } from './ssb-dialog';

describe('ssb-dialog', () => {
  it('is hidden by default', async () => {
    const page = await newSpecPage({
      components: [SsbDialog],
      html: '<ssb-dialog dialog-title="Hello"></ssb-dialog>',
    });
    const overlay = page.root.shadowRoot.querySelector('.dialog__overlay');
    expect(overlay).toBeTruthy();
    expect(overlay.classList.contains('dialog__overlay--open')).toBe(false);
  });

  it('renders title and description when open', async () => {
    const page = await newSpecPage({
      components: [SsbDialog],
      html: '<ssb-dialog open dialog-title="Edit profile" description="Make your changes."></ssb-dialog>',
    });
    const overlay = page.root.shadowRoot.querySelector('.dialog__overlay');
    expect(overlay.classList.contains('dialog__overlay--open')).toBe(true);
    expect(page.root.shadowRoot.querySelector('.dialog__title').textContent).toBe('Edit profile');
    expect(page.root.shadowRoot.querySelector('.dialog__description').textContent).toBe('Make your changes.');
  });

  it('closes and emits ssbOpenChange when the close button is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbDialog],
      html: '<ssb-dialog open dialog-title="Edit profile"></ssb-dialog>',
    });
    const openChange = jest.fn();
    page.root.addEventListener('ssbOpenChange', openChange);
    const closeButton = page.root.shadowRoot.querySelector('.dialog__close') as HTMLButtonElement;
    closeButton.click();
    await page.waitForChanges();
    expect(openChange).toHaveBeenCalledTimes(1);
    expect((page.root as HTMLElement & { open: boolean }).open).toBe(false);
  });

  it('hides the close button when hide-close is set', async () => {
    const page = await newSpecPage({
      components: [SsbDialog],
      html: '<ssb-dialog open hide-close></ssb-dialog>',
    });
    expect(page.root.shadowRoot.querySelector('.dialog__close')).toBeFalsy();
  });
});
