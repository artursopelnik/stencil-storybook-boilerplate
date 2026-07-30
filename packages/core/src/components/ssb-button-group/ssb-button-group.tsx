import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbButtonGroupAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

@Component({
  tag: 'ssb-button-group',
  styleUrl: 'ssb-button-group.css',
  shadow: true,
})
export class SsbButtonGroup {
  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbButtonGroupAriaAttribute>;

  render() {
    return (
      <Host role="group" {...getAriaAttributes(this.aria)}>
        <slot />
      </Host>
    );
  }
}
