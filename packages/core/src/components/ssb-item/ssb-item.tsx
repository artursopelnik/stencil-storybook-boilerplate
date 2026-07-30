import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbItemAriaAttribute = {
  'aria-label': string;
  'aria-current': string;
};

export type ItemVariant = 'default' | 'outline' | 'muted';

@Component({
  tag: 'ssb-item',
  styleUrl: 'ssb-item.css',
  shadow: true,
})
export class SsbItem {
  /**
   * Visual style of the item.
   */
  @Prop() variant: ItemVariant = 'default';

  /**
   * Adds hover feedback and a pointer cursor for clickable rows.
   */
  @Prop() interactive: boolean = false;

  /**
   * When set, the item content is wrapped in an anchor element.
   */
  @Prop() href?: string;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbItemAriaAttribute>;

  render() {
    const classes = {
      'item': true,
      [`item--${this.variant}`]: true,
      'item--interactive': this.interactive || !!this.href,
    };

    const content = [
      <div class="item__media">
        <slot name="media" />
      </div>,
      <div class="item__content">
        <div class="item__title">
          <slot name="item-title" />
        </div>
        <div class="item__description">
          <slot />
        </div>
      </div>,
      <div class="item__actions">
        <slot name="actions" />
      </div>,
    ];

    return (
      <Host>
        {this.href ? (
          <a class={classes} href={this.href} {...getAriaAttributes(this.aria)}>
            {content}
          </a>
        ) : (
          <div class={classes} {...getAriaAttributes(this.aria)}>
            {content}
          </div>
        )}
      </Host>
    );
  }
}
