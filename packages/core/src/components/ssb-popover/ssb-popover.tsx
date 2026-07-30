import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbPopoverAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

export type PopoverPosition = 'top' | 'bottom';
export type PopoverAlign = 'start' | 'center' | 'end';

@Component({
  tag: 'ssb-popover',
  styleUrl: 'ssb-popover.css',
  shadow: true,
})
export class SsbPopover {
  @Element() el: HTMLElement;

  /**
   * Controls whether the popover panel is shown.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Side of the trigger on which the panel is placed.
   */
  @Prop() position: PopoverPosition = 'bottom';

  /**
   * Alignment of the panel relative to the trigger.
   */
  @Prop() align: PopoverAlign = 'center';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbPopoverAriaAttribute>;

  /**
   * Emitted whenever the open state changes. Detail contains the new open state.
   */
  @Event() ssbOpenChange: EventEmitter<{ open: boolean }>;

  @Watch('open')
  handleOpenChange(open: boolean) {
    if (open) {
      this.addDocumentListeners();
    } else {
      this.removeDocumentListeners();
    }
  }

  connectedCallback() {
    if (this.open) {
      this.addDocumentListeners();
    }
  }

  disconnectedCallback() {
    this.removeDocumentListeners();
  }

  private addDocumentListeners() {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', this.handleDocumentClick);
      document.addEventListener('keydown', this.handleDocumentKeydown);
    }
  }

  private removeDocumentListeners() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.handleDocumentClick);
      document.removeEventListener('keydown', this.handleDocumentKeydown);
    }
  }

  private handleDocumentClick = (event: MouseEvent) => {
    if (!event.composedPath().includes(this.el)) {
      this.setOpen(false);
    }
  };

  private handleDocumentKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.setOpen(false);
    }
  };

  private handleTriggerClick = () => {
    this.setOpen(!this.open);
  };

  private setOpen(open: boolean) {
    if (this.open === open) {
      return;
    }
    this.open = open;
    this.ssbOpenChange.emit({ open });
  }

  render() {
    const panelClasses = {
      popover__panel: true,
      [`popover__panel--${this.position}`]: true,
      [`popover__panel--align-${this.align}`]: true,
      'popover__panel--open': this.open,
    };

    return (
      <Host>
        <span class="popover__trigger" onClick={this.handleTriggerClick}>
          <slot name="trigger" />
        </span>
        <div class={panelClasses} {...getAriaAttributes(this.aria)}>
          <slot />
        </div>
      </Host>
    );
  }
}
