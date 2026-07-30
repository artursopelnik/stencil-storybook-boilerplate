import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbCheckboxAriaAttribute = {
  'aria-label': string;
  'aria-describedby': string;
};

@Component({
  tag: 'ssb-checkbox',
  styleUrl: 'ssb-checkbox.css',
  shadow: true,
})
export class SsbCheckbox {
  private inputEl?: HTMLInputElement;

  /**
   * Whether the checkbox is checked.
   */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /**
   * Disables the checkbox.
   */
  @Prop() disabled: boolean = false;

  /**
   * Shows the indeterminate (mixed) state. Cleared as soon as the user toggles the checkbox.
   */
  @Prop({ mutable: true }) indeterminate: boolean = false;

  /**
   * Name forwarded to the native checkbox. Note: controls inside shadow DOM do not participate in surrounding forms.
   */
  @Prop() name?: string;

  /**
   * Value forwarded to the native checkbox.
   */
  @Prop() value: string = 'on';

  /**
   * Text rendered next to the box. Alternatively use the default slot.
   */
  @Prop() label?: string;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbCheckboxAriaAttribute>;

  /**
   * Emitted when the checked state changes. Detail contains the new checked state.
   */
  @Event() ssbChange: EventEmitter<{ checked: boolean }>;

  componentDidRender() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  private handleChange = (event: globalThis.Event) => {
    const target = event.target as HTMLInputElement;
    this.indeterminate = false;
    this.checked = target.checked;
    this.ssbChange.emit({ checked: this.checked });
  };

  render() {
    const classes = {
      'checkbox': true,
      'checkbox--disabled': this.disabled,
    };

    return (
      <Host>
        <label class={classes}>
          <input
            ref={el => (this.inputEl = el)}
            class="checkbox__input"
            type="checkbox"
            checked={this.checked}
            disabled={this.disabled}
            name={this.name}
            value={this.value}
            onChange={this.handleChange}
            {...getAriaAttributes(this.aria)}
          />
          <span class="checkbox__box" aria-hidden="true">
            <svg class="checkbox__icon checkbox__icon--check" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg class="checkbox__icon checkbox__icon--dash" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8 L12 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </span>
          <span class="checkbox__label">{this.label ? this.label : <slot />}</span>
        </label>
      </Host>
    );
  }
}
