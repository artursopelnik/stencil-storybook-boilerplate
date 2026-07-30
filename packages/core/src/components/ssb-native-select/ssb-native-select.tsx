import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbNativeSelectAriaAttribute = {
  'aria-label': string;
  'aria-describedby': string;
};

export type NativeSelectOption = { label: string; value: string; disabled?: boolean };
export type NativeSelectSize = 'sm' | 'md';

@Component({
  tag: 'ssb-native-select',
  styleUrl: 'ssb-native-select.css',
  shadow: true,
})
export class SsbNativeSelect {
  /**
   * Options to render (array of `{ label, value, disabled? }` objects or a JSON string when used as an attribute).
   */
  @Prop() options: NativeSelectOption[] | string = [];

  /**
   * Currently selected value.
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Name forwarded to the native select. Note: controls inside shadow DOM do not participate in surrounding forms.
   */
  @Prop() name?: string;

  /**
   * Disables the select.
   */
  @Prop() disabled: boolean = false;

  /**
   * Marks the select as required.
   */
  @Prop() required: boolean = false;

  /**
   * Renders a disabled empty first option as placeholder text.
   */
  @Prop() placeholder?: string;

  /**
   * Size of the select.
   */
  @Prop() size: NativeSelectSize = 'md';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbNativeSelectAriaAttribute>;

  /**
   * Emitted when the selection changes. Detail contains the selected value.
   */
  @Event() ssbChange: EventEmitter<{ value: string }>;

  private parseOptions(): NativeSelectOption[] {
    if (typeof this.options !== 'string') {
      return this.options;
    }

    try {
      const parsed = JSON.parse(this.options);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      console.error('Invalid options: Expected a JSON array of { label, value } objects');
      return [];
    }
  }

  private handleChange = (event: globalThis.Event) => {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.ssbChange.emit({ value: this.value });
  };

  render() {
    const options = this.parseOptions();
    const classes = {
      select__control: true,
      [`select__control--${this.size}`]: true,
    };

    return (
      <Host>
        <div class="select">
          <select
            class={classes}
            name={this.name}
            disabled={this.disabled}
            required={this.required}
            onChange={this.handleChange}
            {...getAriaAttributes(this.aria)}
          >
            {this.placeholder && (
              <option value="" disabled selected={this.value === ''}>
                {this.placeholder}
              </option>
            )}
            {options.map(option => (
              <option value={option.value} disabled={option.disabled} selected={option.value === this.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg class="select__chevron" aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6 L8 10 L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </Host>
    );
  }
}
