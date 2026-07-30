import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbInputGroupAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

@Component({
  tag: 'ssb-input-group',
  styleUrl: 'ssb-input-group.css',
  shadow: true,
})
export class SsbInputGroup {
  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbInputGroupAriaAttribute>;

  render() {
    return (
      <Host {...getAriaAttributes(this.aria)}>
        <slot name="prefix" />
        <slot />
        <slot name="suffix" />
      </Host>
    );
  }
}
