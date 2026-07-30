import { Component, Element, Event, EventEmitter, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbTabsAriaAttribute = {
  'aria-label': string;
};

export type TabItem = { value: string; label: string; disabled?: boolean };

export type TabsChangeDetail = { value: string };

@Component({
  tag: 'ssb-tabs',
  styleUrl: 'ssb-tabs.css',
  shadow: true,
})
export class SsbTabs {
  @Element() el: HTMLElement;

  /**
   * Tab definitions as an array or a JSON string.
   * Shape: `[{ "value": "tab1", "label": "Tab 1", "disabled": false }]`.
   * The panel content is projected via `<div slot="tab1">…</div>` children.
   */
  @Prop() tabs: TabItem[] | string = [];

  /**
   * Value of the selected tab. Defaults to the first tab when empty.
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbTabsAriaAttribute>;

  /**
   * Emitted when the selected tab changes. Detail: `{ value: string }`.
   */
  @Event() ssbChange: EventEmitter<TabsChangeDetail>;

  componentWillLoad() {
    const tabs = this.parseTabs();
    if (!this.value && tabs.length > 0) {
      this.value = tabs[0].value;
    }
  }

  private parseTabs(): TabItem[] {
    if (typeof this.tabs !== 'string') {
      return this.tabs ?? [];
    }
    try {
      const parsed = JSON.parse(this.tabs);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private selectTab(value: string) {
    if (value === this.value) {
      return;
    }
    this.value = value;
    this.ssbChange.emit({ value });
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }
    const enabledTabs = this.parseTabs().filter(tab => !tab.disabled);
    if (enabledTabs.length === 0) {
      return;
    }
    event.preventDefault();
    const currentIndex = enabledTabs.findIndex(tab => tab.value === this.value);
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextTab = enabledTabs[(currentIndex + delta + enabledTabs.length) % enabledTabs.length];
    this.selectTab(nextTab.value);
    const button = this.el.shadowRoot?.querySelector<HTMLButtonElement>(`button[data-value="${nextTab.value}"]`);
    button?.focus();
  };

  render() {
    const tabs = this.parseTabs();
    const activeTab = tabs.find(tab => tab.value === this.value);

    return (
      <Host>
        <div class="tablist" role="tablist" onKeyDown={this.handleKeyDown} {...getAriaAttributes(this.aria)}>
          {tabs.map(tab => (
            <button
              class={{ 'tab': true, 'tab--active': tab.value === this.value }}
              type="button"
              role="tab"
              id={`tab-${tab.value}`}
              data-value={tab.value}
              disabled={tab.disabled}
              aria-selected={tab.value === this.value ? 'true' : 'false'}
              aria-controls={`panel-${tab.value}`}
              tabindex={tab.value === this.value ? 0 : -1}
              onClick={() => this.selectTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab && (
          <div class="panel" role="tabpanel" id={`panel-${activeTab.value}`} aria-labelledby={`tab-${activeTab.value}`}>
            <slot name={activeTab.value} />
          </div>
        )}
      </Host>
    );
  }
}
