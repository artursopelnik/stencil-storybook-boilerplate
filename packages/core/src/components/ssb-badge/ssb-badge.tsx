import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbBadgeAriaAttribute = {
  'aria-label': string;
};

export type BadgeVariant = 'primary' | 'secondary' | 'destructive' | 'outline';

@Component({
  tag: 'ssb-badge',
  styleUrl: 'ssb-badge.css',
  shadow: true,
})
export class SsbBadge {
  /**
   * Visual style of the badge.
   */
  @Prop() variant: BadgeVariant = 'primary';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbBadgeAriaAttribute>;

  render() {
    return (
      <Host {...getAriaAttributes(this.aria)}>
        <span class={{ badge: true, [`badge--${this.variant}`]: true }}>
          <slot />
        </span>
      </Host>
    );
  }
}
