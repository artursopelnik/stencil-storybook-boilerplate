import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbDialogAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
  'aria-describedby': string;
};

@Component({
  tag: 'ssb-dialog',
  styleUrl: 'ssb-dialog.css',
  shadow: true,
})
export class SsbDialog {
  /**
   * Controls whether the dialog is shown.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Heading text of the dialog, also used as the accessible name.
   */
  @Prop() dialogTitle?: string;

  /**
   * Supporting description shown below the title.
   */
  @Prop() description?: string;

  /**
   * Hides the close (✕) button in the top right corner.
   */
  @Prop() hideClose: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbDialogAriaAttribute>;

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
      this.close();
    }
  };

  private handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  private close() {
    this.open = false;
    this.ssbOpenChange.emit({ open: false });
  }

  render() {
    const overlayClasses = {
      dialog__overlay: true,
      'dialog__overlay--open': this.open,
    };

    return (
      <Host>
        <div class={overlayClasses} onClick={this.handleBackdropClick}>
          <div class="dialog__panel" role="dialog" aria-modal="true" aria-label={this.dialogTitle} {...getAriaAttributes(this.aria)}>
            {!this.hideClose && (
              <button class="dialog__close" type="button" aria-label="Close" onClick={() => this.close()}>
                &#10005;
              </button>
            )}
            {(this.dialogTitle || this.description) && (
              <div class="dialog__header">
                {this.dialogTitle && <h2 class="dialog__title">{this.dialogTitle}</h2>}
                {this.description && <p class="dialog__description">{this.description}</p>}
              </div>
            )}
            <div class="dialog__content">
              <slot />
            </div>
            <div class="dialog__footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
