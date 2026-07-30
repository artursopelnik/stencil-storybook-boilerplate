import { Component, Prop, State, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbAvatarAriaAttribute = {
  'aria-label': string;
  'aria-hidden': boolean;
};

export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 'sm' | 'md' | 'lg';

@Component({
  tag: 'ssb-avatar',
  styleUrl: 'ssb-avatar.css',
  shadow: true,
})
export class SsbAvatar {
  /**
   * Image source URL. When omitted or when loading fails, the initials fallback is shown.
   */
  @Prop() src?: string;

  /**
   * Alternative text for the avatar image.
   */
  @Prop() alt: string = '';

  /**
   * Initials shown as fallback when no image is available or the image fails to load.
   */
  @Prop() initials?: string;

  /**
   * Shape of the avatar.
   */
  @Prop() shape: AvatarShape = 'circle';

  /**
   * Size of the avatar.
   */
  @Prop() size: AvatarSize = 'md';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbAvatarAriaAttribute>;

  @State() imageFailed: boolean = false;

  private handleError = () => {
    this.imageFailed = true;
  };

  render() {
    const classes = {
      avatar: true,
      [`avatar--${this.shape}`]: true,
      [`avatar--${this.size}`]: true,
    };
    const showImage = !!this.src && !this.imageFailed;

    return (
      <Host>
        <span class={classes} {...getAriaAttributes(this.aria)}>
          {showImage ? <img class="avatar__image" src={this.src} alt={this.alt} onError={this.handleError} /> : <span class="avatar__fallback">{this.initials}</span>}
        </span>
      </Host>
    );
  }
}
