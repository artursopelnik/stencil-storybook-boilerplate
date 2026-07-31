import { Component, Element, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbCommandAriaAttribute = {
  'aria-label': string;
};

export type CommandItem = {
  label: string;
  value: string;
  group?: string;
  shortcut?: string;
  disabled?: boolean;
};

@Component({
  tag: 'ssb-command',
  styleUrl: 'ssb-command.css',
  shadow: true,
})
export class SsbCommand {
  @Element() el: HTMLElement;

  /**
   * Commands to render (array of `{ label, value, group?, shortcut?, disabled? }` objects or a JSON string when used as an attribute).
   */
  @Prop() items: CommandItem[] | string = [];

  /**
   * Placeholder of the search input.
   */
  @Prop() placeholder: string = 'Type a command or search…';

  /**
   * Message shown when no command matches the search query.
   */
  @Prop() emptyMessage: string = 'No results found.';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbCommandAriaAttribute>;

  /**
   * Emitted when a command is selected. Detail contains the command's value.
   */
  @Event() ssbSelect: EventEmitter<{ value: string }>;

  @State() query: string = '';

  @State() highlightedIndex: number = 0;

  private parseItems(): CommandItem[] {
    if (typeof this.items !== 'string') {
      return this.items || [];
    }
    try {
      const parsed = JSON.parse(this.items);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      console.error('Invalid items: Expected a JSON array of { label, value } objects');
      return [];
    }
  }

  private filteredItems(): CommandItem[] {
    const query = this.query.trim().toLowerCase();
    const items = this.parseItems();
    if (!query) {
      return items;
    }
    return items.filter(item => item.label.toLowerCase().includes(query));
  }

  private groupedItems(): { group: string; items: CommandItem[] }[] {
    const groups: { group: string; items: CommandItem[] }[] = [];
    for (const item of this.filteredItems()) {
      const name = item.group ?? '';
      let bucket = groups.find(entry => entry.group === name);
      if (!bucket) {
        bucket = { group: name, items: [] };
        groups.push(bucket);
      }
      bucket.items.push(item);
    }
    return groups;
  }

  private handleSearchInput = (event: InputEvent) => {
    this.query = (event.target as HTMLInputElement).value;
    this.highlightedIndex = 0;
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const items = this.filteredItems();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveHighlight(1, items);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveHighlight(-1, items);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0 && this.highlightedIndex < items.length) {
          this.select(items[this.highlightedIndex]);
        }
        break;
    }
  };

  private moveHighlight(delta: number, items: CommandItem[]) {
    if (!items.length) {
      return;
    }
    let index = this.highlightedIndex;
    for (let step = 0; step < items.length; step++) {
      index = (index + delta + items.length) % items.length;
      if (!items[index].disabled) {
        this.highlightedIndex = index;
        return;
      }
    }
  }

  private select(item: CommandItem) {
    if (item.disabled) {
      return;
    }
    this.ssbSelect.emit({ value: item.value });
  }

  render() {
    const flat = this.filteredItems();
    const groups = this.groupedItems();

    return (
      <Host onKeyDown={this.handleKeyDown}>
        <div class="command" {...getAriaAttributes(this.aria)}>
          <div class="command__search-row">
            <svg class="command__search-icon" aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5" />
              <path d="M10.5 10.5 L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input class="command__search" type="text" placeholder={this.placeholder} value={this.query} onInput={this.handleSearchInput} aria-label={this.placeholder} />
          </div>
          <div class="command__list" role="listbox">
            {flat.length === 0 && <div class="command__empty">{this.emptyMessage}</div>}
            {groups.map(group => (
              <div class="command__group">
                {group.group && <div class="command__group-label">{group.group}</div>}
                {group.items.map(item => {
                  const index = flat.indexOf(item);
                  return (
                    <div
                      class={{
                        'command__item': true,
                        'command__item--highlighted': index === this.highlightedIndex,
                        'command__item--disabled': !!item.disabled,
                      }}
                      role="option"
                      aria-selected={index === this.highlightedIndex ? 'true' : 'false'}
                      aria-disabled={item.disabled ? 'true' : undefined}
                      onClick={() => this.select(item)}
                      onMouseEnter={() => {
                        if (!item.disabled) {
                          this.highlightedIndex = index;
                        }
                      }}
                    >
                      <span class="command__item-label">{item.label}</span>
                      {item.shortcut && <span class="command__shortcut">{item.shortcut}</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
