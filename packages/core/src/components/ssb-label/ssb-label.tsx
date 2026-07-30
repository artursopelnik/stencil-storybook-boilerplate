import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbLabelAriaAttribute = {
  'aria-label': string;
  'aria-describedby': string;
};

@Component({
  tag: 'ssb-label',
  styleUrl: 'ssb-label.css',
  shadow: true,
})
export class SsbLabel {
  /**
   * Rendered as `for` on the native label. Note: it only associates controls within the same shadow root, so it is mostly presentational.
   */
  @Prop() htmlFor?: string;

  /**
   * Shows a destructive asterisk to mark the associated control as required.
   */
  @Prop() required: boolean = false;

  /**
   * Renders the label in a muted, disabled style.
   */
  @Prop() disabled: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbLabelAriaAttribute>;

  render() {
    const classes = {
      label: true,
      'label--disabled': this.disabled,
    };

    return (
      <Host>
        <label class={classes} htmlFor={this.htmlFor} {...getAriaAttributes(this.aria)}>
          <slot />
          {this.required && (
            <span class="label__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      </Host>
    );
  }
}
