import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbCardAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

@Component({
  tag: 'ssb-card',
  styleUrl: 'ssb-card.css',
  shadow: true,
})
export class SsbCard {
  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbCardAriaAttribute>;

  render() {
    return (
      <Host>
        <div class="card" {...getAriaAttributes(this.aria)}>
          <div class="card__header">
            <div class="card__heading">
              <div class="card__title">
                <slot name="card-title" />
              </div>
              <div class="card__description">
                <slot name="card-description" />
              </div>
            </div>
            <div class="card__action">
              <slot name="action" />
            </div>
          </div>
          <div class="card__content">
            <slot />
          </div>
          <div class="card__footer">
            <slot name="footer" />
          </div>
        </div>
      </Host>
    );
  }
}
