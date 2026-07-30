import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbSwitchAriaAttribute = {
  'aria-label': string;
  'aria-describedby': string;
};

@Component({
  tag: 'ssb-switch',
  styleUrl: 'ssb-switch.css',
  shadow: true,
})
export class SsbSwitch {
  /**
   * Whether the switch is on.
   */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /**
   * Disables the switch.
   */
  @Prop() disabled: boolean = false;

  /**
   * Name forwarded to the native checkbox. Note: controls inside shadow DOM do not participate in surrounding forms.
   */
  @Prop() name?: string;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbSwitchAriaAttribute>;

  /**
   * Emitted when the switch is toggled. Detail contains the new checked state.
   */
  @Event() ssbChange: EventEmitter<{ checked: boolean }>;

  private handleChange = (event: globalThis.Event) => {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.ssbChange.emit({ checked: this.checked });
  };

  render() {
    const classes = {
      switch: true,
      'switch--disabled': this.disabled,
    };

    return (
      <Host>
        <label class={classes}>
          <input
            class="switch__input"
            type="checkbox"
            role="switch"
            checked={this.checked}
            disabled={this.disabled}
            name={this.name}
            onChange={this.handleChange}
            {...getAriaAttributes(this.aria)}
          />
          <span class="switch__track" aria-hidden="true">
            <span class="switch__thumb"></span>
          </span>
          <span class="switch__label">
            <slot />
          </span>
        </label>
      </Host>
    );
  }
}
