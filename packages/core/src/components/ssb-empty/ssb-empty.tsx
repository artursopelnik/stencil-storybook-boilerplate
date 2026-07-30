import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbEmptyAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

@Component({
  tag: 'ssb-empty',
  styleUrl: 'ssb-empty.css',
  shadow: true,
})
export class SsbEmpty {
  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbEmptyAriaAttribute>;

  render() {
    return (
      <Host>
        <div class="empty" {...getAriaAttributes(this.aria)}>
          <div class="empty__icon">
            <slot name="icon" />
          </div>
          <div class="empty__title">
            <slot name="empty-title" />
          </div>
          <div class="empty__description">
            <slot />
          </div>
          <div class="empty__actions">
            <slot name="actions" />
          </div>
        </div>
      </Host>
    );
  }
}
