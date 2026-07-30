import { newSpecPage } from '@stencil/core/testing';
import { SsbAlertDialog } from './ssb-alert-dialog';

describe('ssb-alert-dialog', () => {
  it('is hidden by default and uses the alertdialog role', async () => {
    const page = await newSpecPage({
      components: [SsbAlertDialog],
      html: '<ssb-alert-dialog dialog-title="Are you sure?"></ssb-alert-dialog>',
    });
    const overlay = page.root.shadowRoot.querySelector('.alert-dialog__overlay');
    expect(overlay.classList.contains('alert-dialog__overlay--open')).toBe(false);
    expect(page.root.shadowRoot.querySelector('[role="alertdialog"]')).toBeTruthy();
  });

  it('renders custom button labels and destructive confirm styling', async () => {
    const page = await newSpecPage({
      components: [SsbAlertDialog],
      html: '<ssb-alert-dialog open dialog-title="Delete file?" confirm-label="Delete" cancel-label="Keep" destructive></ssb-alert-dialog>',
    });
    const cancel = page.root.shadowRoot.querySelector('.alert-dialog__button--cancel');
    const confirm = page.root.shadowRoot.querySelector('.alert-dialog__button--destructive');
    expect(cancel.textContent).toBe('Keep');
    expect(confirm.textContent).toBe('Delete');
  });

  it('emits ssbConfirm and ssbOpenChange when confirming', async () => {
    const page = await newSpecPage({
      components: [SsbAlertDialog],
      html: '<ssb-alert-dialog open dialog-title="Are you sure?"></ssb-alert-dialog>',
    });
    const onConfirm = jest.fn();
    const onOpenChange = jest.fn();
    page.root.addEventListener('ssbConfirm', onConfirm);
    page.root.addEventListener('ssbOpenChange', onOpenChange);
    const confirmButton = page.root.shadowRoot.querySelector('.alert-dialog__button--confirm') as HTMLButtonElement;
    confirmButton.click();
    await page.waitForChanges();
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect((page.root as HTMLElement & { open: boolean }).open).toBe(false);
  });

  it('emits ssbCancel when cancelling', async () => {
    const page = await newSpecPage({
      components: [SsbAlertDialog],
      html: '<ssb-alert-dialog open dialog-title="Are you sure?"></ssb-alert-dialog>',
    });
    const onCancel = jest.fn();
    page.root.addEventListener('ssbCancel', onCancel);
    const cancelButton = page.root.shadowRoot.querySelector('.alert-dialog__button--cancel') as HTMLButtonElement;
    cancelButton.click();
    await page.waitForChanges();
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect((page.root as HTMLElement & { open: boolean }).open).toBe(false);
  });
});
