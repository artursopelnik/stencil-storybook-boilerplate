import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbProgressAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

@Component({
  tag: 'ssb-progress',
  styleUrl: 'ssb-progress.css',
  shadow: true,
})
export class SsbProgress {
  /**
   * Current progress value.
   */
  @Prop() value: number = 0;

  /**
   * Maximum value the progress can reach.
   */
  @Prop() max: number = 100;

  /**
   * Accessible label fallback, applied as `aria-label` on the progressbar.
   */
  @Prop() label?: string;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbProgressAriaAttribute>;

  render() {
    const percentage = this.max > 0 ? Math.min(100, Math.max(0, (this.value / this.max) * 100)) : 0;

    return (
      <Host>
        <div
          class="progress"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax={`${this.max}`}
          aria-valuenow={`${this.value}`}
          aria-label={this.label}
          {...getAriaAttributes(this.aria)}
        >
          <div class="progress__indicator" style={{ width: `${percentage}%` }}></div>
        </div>
      </Host>
    );
  }
}
