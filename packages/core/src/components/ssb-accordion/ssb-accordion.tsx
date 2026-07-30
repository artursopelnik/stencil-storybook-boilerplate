import { Component, Element, Listen, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbAccordionAriaAttribute = {
  'aria-label': string;
};

@Component({
  tag: 'ssb-accordion',
  styleUrl: 'ssb-accordion.css',
  shadow: true,
})
export class SsbAccordion {
  @Element() el: HTMLElement;

  /**
   * Allows multiple items to be open at the same time. When `false`, opening an item closes the others.
   */
  @Prop() multiple: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbAccordionAriaAttribute>;

  @Listen('ssbToggle')
  handleToggle(event: CustomEvent<{ open: boolean }>) {
    if (this.multiple || !event.detail.open) {
      return;
    }
    const items = Array.from(this.el.querySelectorAll<HTMLElement & { open: boolean }>('ssb-accordion-item'));
    items.forEach(item => {
      if (item !== event.target) {
        item.open = false;
      }
    });
  }

  render() {
    return (
      <Host {...getAriaAttributes(this.aria)}>
        <slot />
      </Host>
    );
  }
}
