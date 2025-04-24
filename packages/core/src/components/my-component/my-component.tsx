import { Component, Prop, h, Host, EventEmitter, Event } from '@stencil/core';
import { format, getAriaAttributes } from '../../utils';
import { AriaAttributes } from '../../types';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The number of times the button has been clicked.
   */
  @Prop() count: number = 0;

  /**
   * The first name
   */
  @Prop() first!: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  /**
   * The aria property
   */

  @Prop() aria?: AriaAttributes;

  /**
   * Emitted when button is clicked. */
  @Event({ bubbles: false }) public buttonClick: EventEmitter;

  private _onClick(): void {
    this.buttonClick.emit();

    this.count++;
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return (
      <Host>
        <div>
          <div>Hello World! I'm {this.getText()}</div>
          <br />
          <div>
            <button {...getAriaAttributes(this.aria)} onClick={this._onClick.bind(this)}>
              count is {this.count}
            </button>
          </div>
        </div>
      </Host>
    );
  }
}
