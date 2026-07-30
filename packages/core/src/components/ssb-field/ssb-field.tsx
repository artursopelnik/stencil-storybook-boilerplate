import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbFieldAriaAttribute = {
  'aria-label': string;
  'aria-describedby': string;
};

@Component({
  tag: 'ssb-field',
  styleUrl: 'ssb-field.css',
  shadow: true,
})
export class SsbField {
  /**
   * Label text rendered above the control.
   */
  @Prop() label?: string;

  /**
   * Muted helper text rendered below the control. Hidden while `error` is set.
   */
  @Prop() description?: string;

  /**
   * Error text rendered in destructive color below the control. When set, the description is hidden.
   */
  @Prop() error?: string;

  /**
   * Shows a destructive asterisk next to the label.
   */
  @Prop() required: boolean = false;

  /**
   * Rendered as `for` on the label element. Note: it only associates controls within the same shadow root, so it is mostly presentational.
   */
  @Prop() fieldId?: string;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbFieldAriaAttribute>;

  render() {
    return (
      <Host>
        <div class="field" {...getAriaAttributes(this.aria)}>
          {this.label && (
            <label class="field__label" htmlFor={this.fieldId}>
              {this.label}
              {this.required && (
                <span class="field__required" aria-hidden="true">
                  *
                </span>
              )}
            </label>
          )}
          <slot />
          {this.error ? <p class="field__error">{this.error}</p> : this.description && <p class="field__description">{this.description}</p>}
        </div>
      </Host>
    );
  }
}
