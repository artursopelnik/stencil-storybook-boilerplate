import { Component, Event, EventEmitter, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbAccordionItemAriaAttribute = {
  'aria-label': string;
};

export type AccordionItemToggleDetail = { open: boolean };

@Component({
  tag: 'ssb-accordion-item',
  styleUrl: 'ssb-accordion-item.css',
  shadow: true,
})
export class SsbAccordionItem {
  /**
   * Heading text shown in the trigger button.
   */
  @Prop() heading: string = '';

  /**
   * Whether the item content is expanded.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Disables the item so it can no longer be toggled.
   */
  @Prop() disabled: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbAccordionItemAriaAttribute>;

  /**
   * Emitted after the user toggles the item. Detail: `{ open: boolean }`.
   */
  @Event({ bubbles: true }) ssbToggle: EventEmitter<AccordionItemToggleDetail>;

  private handleClick = () => {
    if (this.disabled) {
      return;
    }
    this.open = !this.open;
    this.ssbToggle.emit({ open: this.open });
  };

  render() {
    return (
      <Host>
        <button
          class="trigger"
          type="button"
          id="trigger"
          disabled={this.disabled}
          aria-expanded={this.open ? 'true' : 'false'}
          aria-controls="content"
          onClick={this.handleClick}
          {...getAriaAttributes(this.aria)}
        >
          <span class="heading">{this.heading}</span>
          <span class={{ chevron: true, 'chevron--open': this.open }} aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
        <div class="content" id="content" role="region" aria-labelledby="trigger" hidden={!this.open}>
          <slot />
        </div>
      </Host>
    );
  }
}
