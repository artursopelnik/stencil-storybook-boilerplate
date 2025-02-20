import { Component, Prop, h, Host, EventEmitter, Event } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  /**
   * The number of times the button has been clicked.
   */
  @Prop() count: number = 0

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
   * Emitted when button is clicked. */
  @Event({ bubbles: false }) public buttonClick: EventEmitter

  private _onClick(): void {
    this.buttonClick.emit()

    this.count++
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return (
      <Host>
        <div>Hello World! I'm {this.getText()}</div><br />
        <div><button onClick={this._onClick.bind(this)}>count is {this.count}</button></div>
      </Host>
    )
  }
}
