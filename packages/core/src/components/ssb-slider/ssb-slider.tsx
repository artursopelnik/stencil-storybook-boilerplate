import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbSliderAriaAttribute = {
  'aria-label': string;
  'aria-describedby': string;
};

@Component({
  tag: 'ssb-slider',
  styleUrl: 'ssb-slider.css',
  shadow: true,
})
export class SsbSlider {
  /**
   * Current value of the slider.
   */
  @Prop({ mutable: true }) value: number = 50;

  /**
   * Minimum selectable value.
   */
  @Prop() min: number = 0;

  /**
   * Maximum selectable value.
   */
  @Prop() max: number = 100;

  /**
   * Granularity of the value.
   */
  @Prop() step: number = 1;

  /**
   * Disables the slider.
   */
  @Prop() disabled: boolean = false;

  /**
   * Renders the current value to the right of the track.
   */
  @Prop() showValue: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbSliderAriaAttribute>;

  /**
   * Emitted continuously while the thumb is dragged.
   */
  @Event() ssbInput: EventEmitter<{ value: number }>;

  /**
   * Emitted when the value is committed, e.g. when the drag ends.
   */
  @Event() ssbChange: EventEmitter<{ value: number }>;

  private handleInput = (event: globalThis.Event) => {
    this.value = parseFloat((event.target as HTMLInputElement).value);
    this.ssbInput.emit({ value: this.value });
  };

  private handleChange = (event: globalThis.Event) => {
    this.value = parseFloat((event.target as HTMLInputElement).value);
    this.ssbChange.emit({ value: this.value });
  };

  render() {
    const range = this.max - this.min;
    const percentage = range > 0 ? Math.min(100, Math.max(0, ((this.value - this.min) / range) * 100)) : 0;

    return (
      <Host>
        <div class={{ 'slider': true, 'slider--disabled': this.disabled }}>
          <input
            class="slider__input"
            type="range"
            min={this.min}
            max={this.max}
            step={this.step}
            value={this.value}
            disabled={this.disabled}
            style={{
              background: `linear-gradient(to right, var(--ssb-color-foreground, #1a202c) ${percentage}%, var(--ssb-color-muted, #edf2f7) ${percentage}%)`,
            }}
            onInput={this.handleInput}
            onChange={this.handleChange}
            {...getAriaAttributes(this.aria)}
          />
          {this.showValue && <span class="slider__value">{this.value}</span>}
        </div>
      </Host>
    );
  }
}
