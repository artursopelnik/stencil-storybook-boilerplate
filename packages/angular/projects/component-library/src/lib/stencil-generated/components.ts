/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, NgZone } from '@angular/core';

import { ProxyCmp } from './angular-component-lib/utils';

import { Components } from '@stencil-storybook-boilerplate/core';


@ProxyCmp({
  inputs: ['aria', 'count', 'first', 'last', 'middle']
})
@Component({
  selector: 'my-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'count', { name: 'first', required: true }, 'last', 'middle'],
  outputs: ['buttonClick'],
  standalone: false
})
export class MyComponent {
  protected el: HTMLMyComponentElement;
  @Output() buttonClick = new EventEmitter<MyComponentCustomEvent<any>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { MyComponentCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface MyComponent extends Components.MyComponent {
  /**
   * Emitted when button is clicked.
   */
  buttonClick: EventEmitter<MyComponentCustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['aria', 'variant']
})
@Component({
  selector: 'ssb-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'variant'],
  standalone: false
})
export class SsbBadge {
  protected el: HTMLSsbBadgeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbBadge extends Components.SsbBadge {}


@ProxyCmp({
  inputs: ['aria', 'disabled', 'href', 'size', 'target', 'type', 'variant']
})
@Component({
  selector: 'ssb-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'disabled', 'href', 'size', 'target', 'type', 'variant'],
  standalone: false
})
export class SsbButton {
  protected el: HTMLSsbButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbButton extends Components.SsbButton {}


