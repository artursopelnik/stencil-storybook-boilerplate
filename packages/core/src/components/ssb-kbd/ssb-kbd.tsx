import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbKbdAriaAttribute = {
  'aria-label': string;
};

@Component({
  tag: 'ssb-kbd',
  styleUrl: 'ssb-kbd.css',
  shadow: true,
})
export class SsbKbd {
  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbKbdAriaAttribute>;

  render() {
    return (
      <Host>
        <kbd class="kbd" {...getAriaAttributes(this.aria)}>
          <slot />
        </kbd>
      </Host>
    );
  }
}
