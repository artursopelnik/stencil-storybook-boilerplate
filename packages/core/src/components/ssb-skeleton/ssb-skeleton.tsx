import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbSkeletonAriaAttribute = {
  'aria-label': string;
  'aria-busy': boolean;
};

export type SkeletonRounded = 'small' | 'medium' | 'large' | 'full';

@Component({
  tag: 'ssb-skeleton',
  styleUrl: 'ssb-skeleton.css',
  shadow: true,
})
export class SsbSkeleton {
  /**
   * Width of the skeleton, any CSS length value.
   */
  @Prop() width: string = '100%';

  /**
   * Height of the skeleton, any CSS length value.
   */
  @Prop() height: string = '1rem';

  /**
   * Border radius of the skeleton, mapped to the design token radii.
   */
  @Prop() rounded: SkeletonRounded = 'medium';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbSkeletonAriaAttribute>;

  render() {
    const classes = {
      skeleton: true,
      [`skeleton--${this.rounded}`]: true,
    };

    return (
      <Host {...getAriaAttributes(this.aria)}>
        <div class={classes} style={{ width: this.width, height: this.height }} aria-hidden="true"></div>
      </Host>
    );
  }
}
