import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbRadioAriaAttribute = {
  'aria-label': string;
  'aria-describedby': string;
};

@Component({
  tag: 'ssb-radio',
  styleUrl: 'ssb-radio.css',
  shadow: true,
})
export class SsbRadio {
  /**
   * Value represented by this radio. Reported to the surrounding `ssb-radio-group` on selection.
   */
  @Prop() value!: string;

  /**
   * Whether the radio is selected. Managed by `ssb-radio-group` when used inside one.
   */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /**
   * Disables the radio.
   */
  @Prop() disabled: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbRadioAriaAttribute>;

  /**
   * Emitted when the radio is selected. Bubbles so a surrounding `ssb-radio-group` can coordinate the selection.
   */
  @Event({ bubbles: true }) ssbRadioSelect: EventEmitter<{ value: string }>;

  private handleChange = () => {
    if (this.disabled) {
      return;
    }
    this.checked = true;
    this.ssbRadioSelect.emit({ value: this.value });
  };

  render() {
    return (
      <Host>
        <label class={{ 'radio': true, 'radio--disabled': this.disabled }}>
          <input
            class="radio__input"
            type="radio"
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            onChange={this.handleChange}
            {...getAriaAttributes(this.aria)}
          />
          <span class={{ 'radio__circle': true, 'radio__circle--checked': this.checked }} aria-hidden="true"></span>
          <span class="radio__label">
            <slot />
          </span>
        </label>
      </Host>
    );
  }
}
