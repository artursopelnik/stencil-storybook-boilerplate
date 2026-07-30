import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbAlertDialogAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
  'aria-describedby': string;
};

@Component({
  tag: 'ssb-alert-dialog',
  styleUrl: 'ssb-alert-dialog.css',
  shadow: true,
})
export class SsbAlertDialog {
  /**
   * Controls whether the alert dialog is shown.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Heading text of the alert dialog, also used as the accessible name.
   */
  @Prop() dialogTitle?: string;

  /**
   * Supporting description shown below the title.
   */
  @Prop() description?: string;

  /**
   * Label of the confirm button.
   */
  @Prop() confirmLabel: string = 'Continue';

  /**
   * Label of the cancel button.
   */
  @Prop() cancelLabel: string = 'Cancel';

  /**
   * Styles the confirm button as destructive for irreversible actions.
   */
  @Prop() destructive: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbAlertDialogAriaAttribute>;

  /**
   * Emitted when the confirm button is pressed.
   */
  @Event() ssbConfirm: EventEmitter<void>;

  /**
   * Emitted when the cancel button is pressed or Escape is used.
   */
  @Event() ssbCancel: EventEmitter<void>;

  /**
   * Emitted whenever the open state changes. Detail contains the new open state.
   */
  @Event() ssbOpenChange: EventEmitter<{ open: boolean }>;

  @Watch('open')
  handleOpenChange(open: boolean) {
    if (open) {
      this.addKeydownListener();
    } else {
      this.removeKeydownListener();
    }
  }

  connectedCallback() {
    if (this.open) {
      this.addKeydownListener();
    }
  }

  disconnectedCallback() {
    this.removeKeydownListener();
  }

  private addKeydownListener() {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  private removeKeydownListener() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeydown);
    }
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.cancel();
    }
  };

  private close() {
    this.open = false;
    this.ssbOpenChange.emit({ open: false });
  }

  private confirm() {
    this.ssbConfirm.emit();
    this.close();
  }

  private cancel() {
    this.ssbCancel.emit();
    this.close();
  }

  render() {
    const overlayClasses = {
      'alert-dialog__overlay': true,
      'alert-dialog__overlay--open': this.open,
    };
    const confirmClasses = {
      'alert-dialog__button': true,
      'alert-dialog__button--confirm': !this.destructive,
      'alert-dialog__button--destructive': this.destructive,
    };

    return (
      <Host>
        <div class={overlayClasses}>
          <div class="alert-dialog__panel" role="alertdialog" aria-modal="true" aria-label={this.dialogTitle} {...getAriaAttributes(this.aria)}>
            {(this.dialogTitle || this.description) && (
              <div class="alert-dialog__header">
                {this.dialogTitle && <h2 class="alert-dialog__title">{this.dialogTitle}</h2>}
                {this.description && <p class="alert-dialog__description">{this.description}</p>}
              </div>
            )}
            <div class="alert-dialog__content">
              <slot />
            </div>
            <div class="alert-dialog__footer">
              <button class="alert-dialog__button alert-dialog__button--cancel" type="button" onClick={() => this.cancel()}>
                {this.cancelLabel}
              </button>
              <button class={confirmClasses} type="button" onClick={() => this.confirm()}>
                {this.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
