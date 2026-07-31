import { Component, Element, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbSelectAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

@Component({
  tag: 'ssb-select',
  styleUrl: 'ssb-select.css',
  shadow: true,
})
export class SsbSelect {
  @Element() el: HTMLElement;

  /**
   * Options to render (array of `{ label, value, disabled? }` objects or a JSON string when used as an attribute).
   */
  @Prop() options: SelectOption[] | string = [];

  /**
   * Currently selected value.
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Text shown in the trigger while no option is selected.
   */
  @Prop() placeholder: string = 'Select an option';

  /**
   * Disables the select.
   */
  @Prop() disabled: boolean = false;

  /**
   * Name of the control. Note: controls inside shadow DOM do not participate in surrounding forms.
   */
  @Prop() name?: string;

  /**
   * Controls whether the listbox is shown.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbSelectAriaAttribute>;

  /**
   * Emitted when the selection changes. Detail contains the selected value.
   */
  @Event() ssbChange: EventEmitter<{ value: string }>;

  /**
   * Emitted whenever the open state changes. Detail contains the new open state.
   */
  @Event() ssbOpenChange: EventEmitter<{ open: boolean }>;

  @State() highlightedIndex: number = -1;

  @Watch('open')
  handleOpenChange(open: boolean) {
    if (open) {
      this.addDocumentListeners();
      const options = this.parseOptions();
      this.highlightedIndex = options.findIndex(option => option.value === this.value && !option.disabled);
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
    const options = this.parseOptions();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.moveHighlight(1, options);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveHighlight(-1, options);
        break;
      case 'Home':
        event.preventDefault();
        this.highlightedIndex = this.findEnabledIndex(options, 0, 1);
        break;
      case 'End':
        event.preventDefault();
        this.highlightedIndex = this.findEnabledIndex(options, options.length - 1, -1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.highlightedIndex >= 0 && this.highlightedIndex < options.length) {
          this.select(options[this.highlightedIndex]);
        }
        break;
    }
  };

  private moveHighlight(delta: number, options: SelectOption[]) {
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

  private findEnabledIndex(options: SelectOption[], start: number, delta: number): number {
    for (let index = start; index >= 0 && index < options.length; index += delta) {
      if (!options[index].disabled) {
        return index;
      }
    }
    return -1;
  }

  private handleTriggerClick = () => {
    if (this.disabled) {
      return;
    }
    this.setOpen(!this.open);
  };

  private setOpen(open: boolean) {
    if (this.open === open) {
      return;
    }
    this.open = open;
    this.ssbOpenChange.emit({ open });
  }

  private parseOptions(): SelectOption[] {
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

  private select(option: SelectOption) {
    if (option.disabled) {
      return;
    }
    this.value = option.value;
    this.ssbChange.emit({ value: option.value });
    this.setOpen(false);
  }

  render() {
    const options = this.parseOptions();
    const selected = options.find(option => option.value === this.value);

    return (
      <Host onKeyDown={this.handleKeyDown}>
        <button
          class="select__trigger"
          type="button"
          role="combobox"
          name={this.name}
          disabled={this.disabled}
          aria-expanded={this.open ? 'true' : 'false'}
          aria-haspopup="listbox"
          onClick={this.handleTriggerClick}
          {...getAriaAttributes(this.aria)}
        >
          <span class={{ 'select__value': true, 'select__value--placeholder': !selected }}>{selected ? selected.label : this.placeholder}</span>
          <svg class={{ 'select__chevron': true, 'select__chevron--open': this.open }} aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6 L8 10 L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div class={{ 'select__listbox': true, 'select__listbox--open': this.open }} role="listbox">
          {options.map((option, index) => (
            <div
              class={{
                'select__option': true,
                'select__option--highlighted': index === this.highlightedIndex,
                'select__option--selected': option.value === this.value,
                'select__option--disabled': !!option.disabled,
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
              <span class="select__option-label">{option.label}</span>
              {option.value === this.value && (
                <svg class="select__check" aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
