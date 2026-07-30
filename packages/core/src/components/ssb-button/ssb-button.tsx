import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbButtonAriaAttribute = {
  'aria-label': string;
  'aria-expanded': boolean;
  'aria-pressed': boolean;
  'aria-haspopup': boolean;
};

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

@Component({
  tag: 'ssb-button',
  styleUrl: 'ssb-button.css',
  shadow: true,
})
export class SsbButton {
  /**
   * Visual style of the button.
   */
  @Prop() variant: ButtonVariant = 'primary';

  /**
   * Size of the button. Use `icon` for square icon-only buttons.
   */
  @Prop() size: ButtonSize = 'md';

  /**
   * Disables the button.
   */
  @Prop() disabled: boolean = false;

  /**
   * Native button type. Note: buttons inside shadow DOM do not implicitly submit surrounding forms.
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * When set, the button renders as an anchor element.
   */
  @Prop() href?: string;

  /**
   * Anchor target, only used together with `href`.
   */
  @Prop() target?: string;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbButtonAriaAttribute>;

  render() {
    const classes = {
      button: true,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
    };

    return (
      <Host>
        {this.href ? (
          <a class={classes} href={this.disabled ? undefined : this.href} target={this.target} {...getAriaAttributes(this.aria)} aria-disabled={this.disabled ? 'true' : undefined}>
            <slot />
          </a>
        ) : (
          <button class={classes} type={this.type} disabled={this.disabled} {...getAriaAttributes(this.aria)}>
            <slot />
          </button>
        )}
      </Host>
    );
  }
}
