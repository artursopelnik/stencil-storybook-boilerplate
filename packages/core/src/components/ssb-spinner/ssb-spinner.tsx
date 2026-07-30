import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbSpinnerAriaAttribute = {
  'aria-label': string;
  'aria-live': string;
};

export type SpinnerSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ssb-spinner',
  styleUrl: 'ssb-spinner.css',
  shadow: true,
})
export class SsbSpinner {
  /**
   * Size of the spinner.
   */
  @Prop() size: SpinnerSize = 'md';

  /**
   * Visually hidden label announced to assistive technology.
   */
  @Prop() label: string = 'Loading…';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbSpinnerAriaAttribute>;

  render() {
    const classes = {
      spinner: true,
      [`spinner--${this.size}`]: true,
    };

    return (
      <Host>
        <span class={classes} role="status" {...getAriaAttributes(this.aria)}>
          <svg class="spinner__svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle class="spinner__circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="47 16" />
          </svg>
          <span class="spinner__label">{this.label}</span>
        </span>
      </Host>
    );
  }
}
