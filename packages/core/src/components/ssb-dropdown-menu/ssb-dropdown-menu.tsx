import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbDropdownMenuAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

export type DropdownMenuItem = {
  label?: string;
  value?: string;
  disabled?: boolean;
  destructive?: boolean;
  separator?: boolean;
  groupLabel?: string;
};

export type DropdownMenuAlign = 'start' | 'end';

@Component({
  tag: 'ssb-dropdown-menu',
  styleUrl: 'ssb-dropdown-menu.css',
  shadow: true,
})
export class SsbDropdownMenu {
  @Element() el: HTMLElement;

  /**
   * Controls whether the menu is shown.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Menu entries (array or JSON string). Entries with `separator` render a divider, entries with `groupLabel` render a group heading, all others render menu items.
   */
  @Prop() items: DropdownMenuItem[] | string = [];

  /**
   * Alignment of the menu relative to the trigger.
   */
  @Prop() align: DropdownMenuAlign = 'start';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbDropdownMenuAriaAttribute>;

  /**
   * Emitted when a menu item is selected. Detail contains the item value.
   */
  @Event() ssbSelect: EventEmitter<{ value: string }>;

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

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveFocus(event.key === 'ArrowDown' ? 1 : -1);
    }
  };

  private moveFocus(delta: number) {
    const shadowRoot = this.el.shadowRoot;
    if (!shadowRoot) {
      return;
    }
    const buttons = Array.from(shadowRoot.querySelectorAll<HTMLButtonElement>('.menu__item:not([disabled])'));
    if (!buttons.length) {
      return;
    }
    const currentIndex = buttons.indexOf(shadowRoot.activeElement as HTMLButtonElement);
    const nextIndex = (currentIndex + delta + buttons.length) % buttons.length;
    buttons[nextIndex].focus();
  }

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

  private getItems(): DropdownMenuItem[] {
    if (typeof this.items !== 'string') {
      return this.items || [];
    }
    try {
      return JSON.parse(this.items);
    } catch (error) {
      console.error('Invalid items JSON for ssb-dropdown-menu', error);
      return [];
    }
  }

  private select(item: DropdownMenuItem) {
    if (item.disabled) {
      return;
    }
    this.ssbSelect.emit({ value: item.value ?? '' });
    this.setOpen(false);
  }

  render() {
    const menuClasses = {
      'menu': true,
      [`menu--align-${this.align}`]: true,
      'menu--open': this.open,
    };

    return (
      <Host onKeyDown={this.handleKeyDown}>
        <span class="menu__trigger" aria-haspopup="menu" aria-expanded={this.open ? 'true' : 'false'} onClick={this.handleTriggerClick}>
          <slot name="trigger" />
        </span>
        <div class={menuClasses} role="menu" {...getAriaAttributes(this.aria)}>
          {this.getItems().map(item => {
            if (item.separator) {
              return <div class="menu__separator" role="separator"></div>;
            }
            if (item.groupLabel) {
              return <div class="menu__group-label">{item.groupLabel}</div>;
            }
            return (
              <button
                class={{ 'menu__item': true, 'menu__item--destructive': !!item.destructive }}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => this.select(item)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </Host>
    );
  }
}
