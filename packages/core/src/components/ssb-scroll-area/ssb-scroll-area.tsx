import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbScrollAreaAriaAttribute = {
  'aria-label': string;
};

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both';

@Component({
  tag: 'ssb-scroll-area',
  styleUrl: 'ssb-scroll-area.css',
  shadow: true,
})
export class SsbScrollArea {
  /**
   * Maximum height of the viewport, any CSS length (e.g. `16rem`, `300px`).
   */
  @Prop() maxHeight: string = '16rem';

  /**
   * Scroll direction of the viewport.
   */
  @Prop() orientation: ScrollAreaOrientation = 'vertical';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbScrollAreaAriaAttribute>;

  render() {
    return (
      <Host>
        <div class={{ viewport: true, [`viewport--${this.orientation}`]: true }} style={{ maxHeight: this.maxHeight }} {...getAriaAttributes(this.aria)}>
          <slot />
        </div>
      </Host>
    );
  }
}
