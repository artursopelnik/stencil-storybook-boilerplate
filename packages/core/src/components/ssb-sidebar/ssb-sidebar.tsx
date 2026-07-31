import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbSidebarAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

@Component({
  tag: 'ssb-sidebar',
  styleUrl: 'ssb-sidebar.css',
  shadow: true,
})
export class SsbSidebar {
  /**
   * Controls whether the sidebar is collapsed to its narrow width.
   */
  @Prop({ mutable: true, reflect: true }) collapsed: boolean = false;

  /**
   * Which side of the layout the sidebar sits on. Controls which border is drawn.
   */
  @Prop() side: 'left' | 'right' = 'left';

  /**
   * Shows a collapse toggle button in the footer area.
   */
  @Prop() collapsible: boolean = true;

  /**
   * Width of the sidebar in its expanded state. The parent element must size the sidebar's height (the host uses height: 100%).
   */
  @Prop() width: string = '16rem';

  /**
   * Width of the sidebar in its collapsed state.
   */
  @Prop() collapsedWidth: string = '3.5rem';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbSidebarAriaAttribute>;

  /**
   * Emitted whenever the collapsed state changes via the toggle button. Detail contains the new collapsed state.
   */
  @Event() ssbToggle: EventEmitter<{ collapsed: boolean }>;

  private toggle = () => {
    this.collapsed = !this.collapsed;
    this.ssbToggle.emit({ collapsed: this.collapsed });
  };

  render() {
    const sidebarClasses = {
      'sidebar': true,
      [`sidebar--${this.side}`]: true,
      'sidebar--collapsed': this.collapsed,
    };

    return (
      <Host style={{ width: this.collapsed ? this.collapsedWidth : this.width }}>
        <aside class={sidebarClasses} {...getAriaAttributes(this.aria)}>
          <div class="sidebar__header">
            <slot name="header" />
          </div>
          <nav class="sidebar__nav">
            <slot />
          </nav>
          <div class="sidebar__footer">
            <div class="sidebar__footer-content">
              <slot name="footer" />
            </div>
            {this.collapsible && (
              <button class="sidebar__toggle" type="button" aria-label="Toggle sidebar" aria-expanded={this.collapsed ? 'false' : 'true'} onClick={this.toggle}>
                <svg
                  class="sidebar__chevrons"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m11 17-5-5 5-5" />
                  <path d="m18 17-5-5 5-5" />
                </svg>
              </button>
            )}
          </div>
        </aside>
      </Host>
    );
  }
}
