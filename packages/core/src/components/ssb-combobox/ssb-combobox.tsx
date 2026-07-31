import { Component, Element, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbComboboxAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

export type ComboboxOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

@Component({
  tag: 'ssb-combobox',
  styleUrl: 'ssb-combobox.css',
  shadow: true,
})
export class SsbCombobox {
  @Element() el: HTMLElement;

  /**
   * Options to render (array of `{ label, value, disabled? }` objects or a JSON string when used as an attribute).
   */
  @Prop() options: ComboboxOption[] | string = [];

  /**
   * Currently selected value.
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Text shown in the trigger while no option is selected.
   */
  @Prop() placeholder: string = 'Select an option';

  /**
   * Placeholder of the search input inside the panel.
   */
  @Prop() searchPlaceholder: string = 'Search…';

  /**
   * Message shown when no option matches the search query.
   */
  @Prop() emptyMessage: string = 'No results found.';

  /**
   * Disables the combobox.
   */
  @Prop() disabled: boolean = false;

  /**
   * Controls whether the panel is shown.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbComboboxAriaAttribute>;

  /**
   * Emitted when the selection changes. Detail contains the selected value.
   */
  @Event() ssbChange: EventEmitter<{ value: string }>;

  /**
   * Emitted whenever the open state changes. Detail contains the new open state.
   */
  @Event() ssbOpenChange: EventEmitter<{ open: boolean }>;

  @State() query: string = '';

  @State() highlightedIndex: number = -1;

  private shouldFocusSearch: boolean = false;

  @Watch('open')
  handleOpenChange(open: boolean) {
    if (open) {
      this.addDocumentListeners();
      this.shouldFocusSearch = true;
      this.highlightedIndex = this.filteredOptions().findIndex(option => option.value === this.value && !option.disabled);
    } else {
      this.removeDocumentListeners();
      this.query = '';
      this.highlightedIndex = -1;
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

  componentDidRender() {
    if (this.shouldFocusSearch) {
      this.shouldFocusSearch = false;
      try {
        const input = this.el.shadowRoot?.querySelector<HTMLInputElement>('.combobox__search');
        input?.focus();
      } catch {
        // focus is unavailable in non-browser environments (e.g. spec tests)
      }
    }
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
    if (this.disabled) {
      return;
    }
    if (!this.open) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.setOpen(true);
      }
      return;
    }
    const options = this.filteredOptions();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveHighlight(1, options);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveHighlight(-1, options);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0 && this.highlightedIndex < options.length) {
          this.select(options[this.highlightedIndex]);
        }
        break;
    }
  };

  private moveHighlight(delta: number, options: ComboboxOption[]) {
    if (!options.length) {
      return;
    }
    let index = this.highlightedIndex;
    for (let step = 0; step < options.length; step++) {
      index = (index + delta + options.length) % options.length;
      if (!options[index].disabled) {
        this.highlightedIndex = index;
        return;
      }
    }
  }

  private handleTriggerClick = () => {
    if (this.disabled) {
      return;
    }
    this.setOpen(!this.open);
  };

  private handleSearchInput = (event: InputEvent) => {
    this.query = (event.target as HTMLInputElement).value;
    this.highlightedIndex = this.filteredOptions().length ? 0 : -1;
  };

  private setOpen(open: boolean) {
    if (this.open === open) {
      return;
    }
    this.open = open;
    this.ssbOpenChange.emit({ open });
  }

  private parseOptions(): ComboboxOption[] {
    if (typeof this.options !== 'string') {
      return this.options || [];
    }
    try {
      const parsed = JSON.parse(this.options);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      console.error('Invalid options: Expected a JSON array of { label, value } objects');
      return [];
    }
  }

  private filteredOptions(): ComboboxOption[] {
    const query = this.query.trim().toLowerCase();
    const options = this.parseOptions();
    if (!query) {
      return options;
    }
    return options.filter(option => option.label.toLowerCase().includes(query));
  }

  private select(option: ComboboxOption) {
    if (option.disabled) {
      return;
    }
    this.value = option.value;
    this.ssbChange.emit({ value: option.value });
    this.setOpen(false);
  }

  render() {
    const options = this.filteredOptions();
    const selected = this.parseOptions().find(option => option.value === this.value);

    return (
      <Host onKeyDown={this.handleKeyDown}>
        <button
          class="combobox__trigger"
          type="button"
          role="combobox"
          disabled={this.disabled}
          aria-expanded={this.open ? 'true' : 'false'}
          aria-haspopup="listbox"
          onClick={this.handleTriggerClick}
          {...getAriaAttributes(this.aria)}
        >
          <span class={{ 'combobox__value': true, 'combobox__value--placeholder': !selected }}>{selected ? selected.label : this.placeholder}</span>
          <svg class={{ 'combobox__chevron': true, 'combobox__chevron--open': this.open }} aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6 L8 10 L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div class={{ 'combobox__panel': true, 'combobox__panel--open': this.open }}>
          <div class="combobox__search-row">
            <svg class="combobox__search-icon" aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.5" />
              <path d="M10.5 10.5 L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input
              class="combobox__search"
              type="text"
              placeholder={this.searchPlaceholder}
              value={this.query}
              onInput={this.handleSearchInput}
              aria-label={this.searchPlaceholder}
            />
          </div>
          <div class="combobox__listbox" role="listbox">
            {options.length === 0 && <div class="combobox__empty">{this.emptyMessage}</div>}
            {options.map((option, index) => (
              <div
                class={{
                  'combobox__option': true,
                  'combobox__option--highlighted': index === this.highlightedIndex,
                  'combobox__option--selected': option.value === this.value,
                  'combobox__option--disabled': !!option.disabled,
                }}
                role="option"
                aria-selected={option.value === this.value ? 'true' : 'false'}
                aria-disabled={option.disabled ? 'true' : undefined}
                onClick={() => this.select(option)}
                onMouseEnter={() => {
                  if (!option.disabled) {
                    this.highlightedIndex = index;
                  }
                }}
              >
                <span class="combobox__option-label">{option.label}</span>
                {option.value === this.value && (
                  <svg class="combobox__check" aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
