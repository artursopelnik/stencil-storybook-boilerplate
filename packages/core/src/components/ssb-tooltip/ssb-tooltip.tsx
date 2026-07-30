import { Component, Host, Prop, State, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbTooltipAriaAttribute = {
  'aria-label': string;
  'aria-hidden': boolean;
};

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  tag: 'ssb-tooltip',
  styleUrl: 'ssb-tooltip.css',
  shadow: true,
})
export class SsbTooltip {
  /**
   * Text shown inside the tooltip bubble. Required for the tooltip to be useful.
   */
  @Prop() text: string;

  /**
   * Placement of the tooltip bubble relative to the trigger element.
   */
  @Prop() position: TooltipPosition = 'top';

  /**
   * Delay in milliseconds before the tooltip is shown on hover or focus.
   */
  @Prop() openDelay: number = 200;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbTooltipAriaAttribute>;

  @State() visible: boolean = false;

  private timer?: ReturnType<typeof setTimeout>;

  disconnectedCallback() {
    this.clearTimer();
  }

  private clearTimer() {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  private show = () => {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.visible = true;
    }, this.openDelay);
  };

  private hide = () => {
    this.clearTimer();
    this.visible = false;
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.hide();
    }
  };

  render() {
    const classes = {
      tooltip: true,
      [`tooltip--${this.position}`]: true,
      'tooltip--visible': this.visible,
    };

    return (
      <Host onMouseEnter={this.show} onMouseLeave={this.hide} onFocusin={this.show} onFocusout={this.hide} onKeyDown={this.handleKeyDown}>
        <slot />
        <div class={classes} role="tooltip" {...getAriaAttributes(this.aria)}>
          {this.text}
        </div>
      </Host>
    );
  }
}
