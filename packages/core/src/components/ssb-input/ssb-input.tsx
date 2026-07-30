import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbInputAriaAttribute = {
  'aria-label': string;
  'aria-describedby': string;
  'aria-invalid': boolean;
};

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

@Component({
  tag: 'ssb-input',
  styleUrl: 'ssb-input.css',
  shadow: true,
})
export class SsbInput {
  /**
   * Native input type of the control.
   */
  @Prop() type: InputType = 'text';

  /**
   * Current value of the input.
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Placeholder text shown while the input is empty.
   */
  @Prop() placeholder?: string;

  /**
   * Name forwarded to the native input. Note: inputs inside shadow DOM do not participate in surrounding forms.
   */
  @Prop() name?: string;

  /**
   * Disables the input.
   */
  @Prop() disabled: boolean = false;

  /**
   * Makes the input read-only.
   */
  @Prop() readonly: boolean = false;

  /**
   * Marks the input as required.
   */
  @Prop() required: boolean = false;

  /**
   * Marks the input as invalid, sets `aria-invalid` and applies a destructive border.
   */
  @Prop() invalid: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbInputAriaAttribute>;

  /**
   * Emitted on every keystroke while the user types. Detail contains the current value.
   */
  @Event() ssbInput: EventEmitter<{ value: string }>;

  /**
   * Emitted when the value is committed (native change). Detail contains the current value.
   */
  @Event() ssbChange: EventEmitter<{ value: string }>;

  private handleInput = (event: globalThis.Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.ssbInput.emit({ value: this.value });
  };

  private handleChange = (event: globalThis.Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.ssbChange.emit({ value: this.value });
  };

  render() {
    const classes = {
      'input': true,
      'input--invalid': this.invalid,
    };

    return (
      <Host>
        <input
          class={classes}
          type={this.type}
          value={this.value}
          placeholder={this.placeholder}
          name={this.name}
          disabled={this.disabled}
          readonly={this.readonly}
          required={this.required}
          aria-invalid={this.invalid ? 'true' : undefined}
          onInput={this.handleInput}
          onChange={this.handleChange}
          {...getAriaAttributes(this.aria)}
        />
      </Host>
    );
  }
}
