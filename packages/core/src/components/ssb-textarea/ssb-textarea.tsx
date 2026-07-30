import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbTextareaAriaAttribute = {
  'aria-label': string;
  'aria-describedby': string;
  'aria-invalid': boolean;
};

@Component({
  tag: 'ssb-textarea',
  styleUrl: 'ssb-textarea.css',
  shadow: true,
})
export class SsbTextarea {
  /**
   * Current value of the textarea.
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Placeholder text shown while the textarea is empty.
   */
  @Prop() placeholder?: string;

  /**
   * Name forwarded to the native textarea. Note: controls inside shadow DOM do not participate in surrounding forms.
   */
  @Prop() name?: string;

  /**
   * Number of visible text rows.
   */
  @Prop() rows: number = 3;

  /**
   * Disables the textarea.
   */
  @Prop() disabled: boolean = false;

  /**
   * Makes the textarea read-only.
   */
  @Prop() readonly: boolean = false;

  /**
   * Marks the textarea as required.
   */
  @Prop() required: boolean = false;

  /**
   * Marks the textarea as invalid, sets `aria-invalid` and applies a destructive border.
   */
  @Prop() invalid: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbTextareaAriaAttribute>;

  /**
   * Emitted on every keystroke while the user types. Detail contains the current value.
   */
  @Event() ssbInput: EventEmitter<{ value: string }>;

  /**
   * Emitted when the value is committed (native change). Detail contains the current value.
   */
  @Event() ssbChange: EventEmitter<{ value: string }>;

  private handleInput = (event: globalThis.Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.ssbInput.emit({ value: this.value });
  };

  private handleChange = (event: globalThis.Event) => {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.ssbChange.emit({ value: this.value });
  };

  render() {
    const classes = {
      'textarea': true,
      'textarea--invalid': this.invalid,
    };

    return (
      <Host>
        <textarea
          class={classes}
          placeholder={this.placeholder}
          name={this.name}
          rows={this.rows}
          disabled={this.disabled}
          readonly={this.readonly}
          required={this.required}
          aria-invalid={this.invalid ? 'true' : undefined}
          onInput={this.handleInput}
          onChange={this.handleChange}
          {...getAriaAttributes(this.aria)}
        >
          {this.value}
        </textarea>
      </Host>
    );
  }
}
