import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbDrawerAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
  'aria-describedby': string;
};

@Component({
  tag: 'ssb-drawer',
  styleUrl: 'ssb-drawer.css',
  shadow: true,
})
export class SsbDrawer {
  /**
   * Controls whether the drawer is shown.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Edge of the viewport the drawer slides in from.
   */
  @Prop() side: 'left' | 'right' | 'top' | 'bottom' = 'bottom';

  /**
   * Heading text of the drawer, also used as the accessible name.
   */
  @Prop() drawerTitle?: string;

  /**
   * Supporting description shown below the title.
   */
  @Prop() description?: string;

  /**
   * Hides the close (✕) button in the top right corner.
   */
  @Prop() hideClose: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbDrawerAriaAttribute>;

  /**
   * Emitted whenever the open state changes. Detail contains the new open state.
   */
  @Event() ssbOpenChange: EventEmitter<{ open: boolean }>;

  @Watch('open')
  handleOpenChange(open: boolean) {
    if (open) {
      this.addKeydownListener();
    } else {
      this.removeKeydownListener();
    }
  }

  connectedCallback() {
    if (this.open) {
      this.addKeydownListener();
    }
  }

  disconnectedCallback() {
    this.removeKeydownListener();
  }

  private addKeydownListener() {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  private removeKeydownListener() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeydown);
    }
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.close();
    }
  };

  private handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      this.close();
    }
  };

  private close() {
    this.open = false;
    this.ssbOpenChange.emit({ open: false });
  }

  render() {
    const overlayClasses = {
      'drawer__overlay': true,
      'drawer__overlay--open': this.open,
    };

    const panelClasses = {
      drawer__panel: true,
      [`drawer__panel--${this.side}`]: true,
    };

    return (
      <Host>
        <div class={overlayClasses} onClick={this.handleBackdropClick}>
          <div class={panelClasses} role="dialog" aria-modal="true" aria-label={this.drawerTitle} {...getAriaAttributes(this.aria)}>
            {this.side === 'bottom' && <div class="drawer__handle" aria-hidden="true"></div>}
            {!this.hideClose && (
              <button class="drawer__close" type="button" aria-label="Close" onClick={() => this.close()}>
                &#10005;
              </button>
            )}
            {(this.drawerTitle || this.description) && (
              <div class="drawer__header">
                {this.drawerTitle && <h2 class="drawer__title">{this.drawerTitle}</h2>}
                {this.description && <p class="drawer__description">{this.description}</p>}
              </div>
            )}
            <div class="drawer__content">
              <slot />
            </div>
            <div class="drawer__footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
