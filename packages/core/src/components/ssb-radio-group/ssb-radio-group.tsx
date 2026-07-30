import { Component, Prop, Event, EventEmitter, Element, Listen, Watch, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbRadioGroupAriaAttribute = {
  'aria-label': string;
  'aria-labelledby': string;
};

export type RadioGroupOrientation = 'vertical' | 'horizontal';

@Component({
  tag: 'ssb-radio-group',
  styleUrl: 'ssb-radio-group.css',
  shadow: true,
})
export class SsbRadioGroup {
  @Element() el: HTMLElement;

  /**
   * Value of the currently selected `ssb-radio` child.
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Informational name of the group, e.g. for form integrations.
   */
  @Prop() name: string = '';

  /**
   * Disables the whole group.
   */
  @Prop() disabled: boolean = false;

  /**
   * Layout direction of the radios inside the group.
   */
  @Prop() orientation: RadioGroupOrientation = 'vertical';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbRadioGroupAriaAttribute>;

  /**
   * Emitted when the selected value changes.
   */
  @Event() ssbChange: EventEmitter<{ value: string }>;

  @Watch('value')
  handleValueChange() {
    this.syncRadios();
  }

  @Listen('ssbRadioSelect')
  handleRadioSelect(event: CustomEvent<{ value: string }>) {
    event.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.value = event.detail.value;
    this.ssbChange.emit({ value: this.value });
  }

  componentDidLoad() {
    this.syncRadios();
  }

  private syncRadios() {
    this.el.querySelectorAll('ssb-radio').forEach((radio: Element) => {
      const item = radio as HTMLElement & { checked: boolean; value: string };
      item.checked = item.value === this.value;
    });
  }

  render() {
    const classes = {
      'radio-group': true,
      [`radio-group--${this.orientation}`]: true,
      'radio-group--disabled': this.disabled,
    };

    return (
      <Host role="radiogroup" {...getAriaAttributes(this.aria)}>
        <div class={classes}>
          <slot />
        </div>
      </Host>
    );
  }
}
