import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbToastAriaAttribute = {
  'aria-label': string;
  'aria-live': string;
};

export type ToastVariant = 'default' | 'destructive';

@Component({
  tag: 'ssb-toast',
  styleUrl: 'ssb-toast.css',
  shadow: true,
})
export class SsbToast {
  /**
   * Controls whether the toast is shown.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Heading text of the toast.
   */
  @Prop() toastTitle?: string;

  /**
   * Supporting description shown below the title.
   */
  @Prop() description?: string;

  /**
   * Visual style of the toast. Use `destructive` for errors.
   */
  @Prop() variant: ToastVariant = 'default';

  /**
   * Auto-dismiss timeout in milliseconds. `0` disables auto-dismiss.
   */
  @Prop() duration: number = 0;

  /**
   * Shows a ✕ button that lets the user dismiss the toast.
   */
  @Prop() dismissible: boolean = true;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbToastAriaAttribute>;

  /**
   * Emitted when the toast is closed, either by the user or by the auto-dismiss timer.
   */
  @Event() ssbClose: EventEmitter<void>;

  private timer?: ReturnType<typeof setTimeout>;

  @Watch('open')
  handleOpenChange(open: boolean) {
    this.clearTimer();
    if (open && this.duration > 0) {
      this.startTimer();
    }
  }

  connectedCallback() {
    if (this.open && this.duration > 0) {
      this.startTimer();
    }
  }

  disconnectedCallback() {
    this.clearTimer();
  }

  private startTimer() {
    this.timer = setTimeout(() => {
      this.close();
    }, this.duration);
  }

  private clearTimer() {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  private close() {
    this.clearTimer();
    this.open = false;
    this.ssbClose.emit();
  }

  render() {
    const classes = {
      toast: true,
      [`toast--${this.variant}`]: true,
    };

    return (
      <Host>
        {this.open && (
          <div class={classes} role={this.variant === 'destructive' ? 'alert' : 'status'} {...getAriaAttributes(this.aria)}>
            <div class="toast__content">
              {this.toastTitle && <div class="toast__title">{this.toastTitle}</div>}
              {this.description && <div class="toast__description">{this.description}</div>}
              <slot />
            </div>
            {this.dismissible && (
              <button class="toast__close" type="button" aria-label="Close" onClick={() => this.close()}>
                &#10005;
              </button>
            )}
          </div>
        )}
      </Host>
    );
  }
}
