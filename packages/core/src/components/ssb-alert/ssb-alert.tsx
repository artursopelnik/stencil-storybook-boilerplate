import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbAlertAriaAttribute = {
  'aria-label': string;
  'aria-live': string;
};

export type AlertVariant = 'default' | 'destructive';

@Component({
  tag: 'ssb-alert',
  styleUrl: 'ssb-alert.css',
  shadow: true,
})
export class SsbAlert {
  /**
   * Visual style of the alert. Use `destructive` for errors and dangerous situations.
   */
  @Prop() variant: AlertVariant = 'default';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbAlertAriaAttribute>;

  render() {
    const classes = {
      alert: true,
      [`alert--${this.variant}`]: true,
    };

    return (
      <Host>
        <div class={classes} role="alert" {...getAriaAttributes(this.aria)}>
          <div class="alert__icon">
            <slot name="icon" />
          </div>
          <div class="alert__title">
            <slot name="alert-title" />
          </div>
          <div class="alert__description">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
