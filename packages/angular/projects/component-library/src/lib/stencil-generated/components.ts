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
  inputs: ['aria', 'multiple']
})
@Component({
  selector: 'ssb-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'multiple'],
  standalone: false
})
export class SsbAccordion {
  protected el: HTMLSsbAccordionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbAccordion extends Components.SsbAccordion {}


@ProxyCmp({
  inputs: ['aria', 'disabled', 'heading', 'open']
})
@Component({
  selector: 'ssb-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'disabled', 'heading', 'open'],
  outputs: ['ssbToggle'],
  standalone: false
})
export class SsbAccordionItem {
  protected el: HTMLSsbAccordionItemElement;
  @Output() ssbToggle = new EventEmitter<SsbAccordionItemCustomEvent<ISsbAccordionItemAccordionItemToggleDetail>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbAccordionItemCustomEvent } from '@stencil-storybook-boilerplate/core';
import type { AccordionItemToggleDetail as ISsbAccordionItemAccordionItemToggleDetail } from '@stencil-storybook-boilerplate/core';

export declare interface SsbAccordionItem extends Components.SsbAccordionItem {
  /**
   * Emitted after the user toggles the item. Detail: `{ open: boolean }`.
   */
  ssbToggle: EventEmitter<SsbAccordionItemCustomEvent<ISsbAccordionItemAccordionItemToggleDetail>>;
}


@ProxyCmp({
  inputs: ['aria', 'variant']
})
@Component({
  selector: 'ssb-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'variant'],
  standalone: false
})
export class SsbAlert {
  protected el: HTMLSsbAlertElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbAlert extends Components.SsbAlert {}


@ProxyCmp({
  inputs: ['aria', 'cancelLabel', 'confirmLabel', 'description', 'destructive', 'dialogTitle', 'open']
})
@Component({
  selector: 'ssb-alert-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'cancelLabel', 'confirmLabel', 'description', 'destructive', 'dialogTitle', 'open'],
  outputs: ['ssbConfirm', 'ssbCancel', 'ssbOpenChange'],
  standalone: false
})
export class SsbAlertDialog {
  protected el: HTMLSsbAlertDialogElement;
  @Output() ssbConfirm = new EventEmitter<SsbAlertDialogCustomEvent<void>>();
  @Output() ssbCancel = new EventEmitter<SsbAlertDialogCustomEvent<void>>();
  @Output() ssbOpenChange = new EventEmitter<SsbAlertDialogCustomEvent<{ open: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbAlertDialogCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbAlertDialog extends Components.SsbAlertDialog {
  /**
   * Emitted when the confirm button is pressed.
   */
  ssbConfirm: EventEmitter<SsbAlertDialogCustomEvent<void>>;
  /**
   * Emitted when the cancel button is pressed or Escape is used.
   */
  ssbCancel: EventEmitter<SsbAlertDialogCustomEvent<void>>;
  /**
   * Emitted whenever the open state changes. Detail contains the new open state.
   */
  ssbOpenChange: EventEmitter<SsbAlertDialogCustomEvent<{ open: boolean }>>;
}


@ProxyCmp({
  inputs: ['alt', 'aria', 'initials', 'shape', 'size', 'src']
})
@Component({
  selector: 'ssb-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alt', 'aria', 'initials', 'shape', 'size', 'src'],
  standalone: false
})
export class SsbAvatar {
  protected el: HTMLSsbAvatarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbAvatar extends Components.SsbAvatar {}


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
  inputs: ['aria', 'items', 'separator']
})
@Component({
  selector: 'ssb-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'items', 'separator'],
  standalone: false
})
export class SsbBreadcrumb {
  protected el: HTMLSsbBreadcrumbElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbBreadcrumb extends Components.SsbBreadcrumb {}


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


@ProxyCmp({
  inputs: ['aria']
})
@Component({
  selector: 'ssb-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria'],
  standalone: false
})
export class SsbButtonGroup {
  protected el: HTMLSsbButtonGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbButtonGroup extends Components.SsbButtonGroup {}


@ProxyCmp({
  inputs: ['aria']
})
@Component({
  selector: 'ssb-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria'],
  standalone: false
})
export class SsbCard {
  protected el: HTMLSsbCardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbCard extends Components.SsbCard {}


@ProxyCmp({
  inputs: ['aria', 'checked', 'disabled', 'indeterminate', 'label', 'name', 'value']
})
@Component({
  selector: 'ssb-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'checked', 'disabled', 'indeterminate', 'label', 'name', 'value'],
  outputs: ['ssbChange'],
  standalone: false
})
export class SsbCheckbox {
  protected el: HTMLSsbCheckboxElement;
  @Output() ssbChange = new EventEmitter<SsbCheckboxCustomEvent<{ checked: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbCheckboxCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbCheckbox extends Components.SsbCheckbox {
  /**
   * Emitted when the checked state changes. Detail contains the new checked state.
   */
  ssbChange: EventEmitter<SsbCheckboxCustomEvent<{ checked: boolean }>>;
}


@ProxyCmp({
  inputs: ['aria', 'description', 'dialogTitle', 'hideClose', 'open']
})
@Component({
  selector: 'ssb-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'description', 'dialogTitle', 'hideClose', 'open'],
  outputs: ['ssbOpenChange'],
  standalone: false
})
export class SsbDialog {
  protected el: HTMLSsbDialogElement;
  @Output() ssbOpenChange = new EventEmitter<SsbDialogCustomEvent<{ open: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbDialogCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbDialog extends Components.SsbDialog {
  /**
   * Emitted whenever the open state changes. Detail contains the new open state.
   */
  ssbOpenChange: EventEmitter<SsbDialogCustomEvent<{ open: boolean }>>;
}


@ProxyCmp({
  inputs: ['align', 'aria', 'items', 'open']
})
@Component({
  selector: 'ssb-dropdown-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'aria', 'items', 'open'],
  outputs: ['ssbSelect', 'ssbOpenChange'],
  standalone: false
})
export class SsbDropdownMenu {
  protected el: HTMLSsbDropdownMenuElement;
  @Output() ssbSelect = new EventEmitter<SsbDropdownMenuCustomEvent<{ value: string }>>();
  @Output() ssbOpenChange = new EventEmitter<SsbDropdownMenuCustomEvent<{ open: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbDropdownMenuCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbDropdownMenu extends Components.SsbDropdownMenu {
  /**
   * Emitted when a menu item is selected. Detail contains the item value.
   */
  ssbSelect: EventEmitter<SsbDropdownMenuCustomEvent<{ value: string }>>;
  /**
   * Emitted whenever the open state changes. Detail contains the new open state.
   */
  ssbOpenChange: EventEmitter<SsbDropdownMenuCustomEvent<{ open: boolean }>>;
}


@ProxyCmp({
  inputs: ['aria']
})
@Component({
  selector: 'ssb-empty',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria'],
  standalone: false
})
export class SsbEmpty {
  protected el: HTMLSsbEmptyElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbEmpty extends Components.SsbEmpty {}


@ProxyCmp({
  inputs: ['aria', 'description', 'error', 'fieldId', 'label', 'required']
})
@Component({
  selector: 'ssb-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'description', 'error', 'fieldId', 'label', 'required'],
  standalone: false
})
export class SsbField {
  protected el: HTMLSsbFieldElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbField extends Components.SsbField {}


@ProxyCmp({
  inputs: ['aria', 'disabled', 'invalid', 'name', 'placeholder', 'readonly', 'required', 'type', 'value']
})
@Component({
  selector: 'ssb-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'disabled', 'invalid', 'name', 'placeholder', 'readonly', 'required', 'type', 'value'],
  outputs: ['ssbInput', 'ssbChange'],
  standalone: false
})
export class SsbInput {
  protected el: HTMLSsbInputElement;
  @Output() ssbInput = new EventEmitter<SsbInputCustomEvent<{ value: string }>>();
  @Output() ssbChange = new EventEmitter<SsbInputCustomEvent<{ value: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbInputCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbInput extends Components.SsbInput {
  /**
   * Emitted on every keystroke while the user types. Detail contains the current value.
   */
  ssbInput: EventEmitter<SsbInputCustomEvent<{ value: string }>>;
  /**
   * Emitted when the value is committed (native change). Detail contains the current value.
   */
  ssbChange: EventEmitter<SsbInputCustomEvent<{ value: string }>>;
}


@ProxyCmp({
  inputs: ['aria']
})
@Component({
  selector: 'ssb-input-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria'],
  standalone: false
})
export class SsbInputGroup {
  protected el: HTMLSsbInputGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbInputGroup extends Components.SsbInputGroup {}


@ProxyCmp({
  inputs: ['aria', 'href', 'interactive', 'variant']
})
@Component({
  selector: 'ssb-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'href', 'interactive', 'variant'],
  standalone: false
})
export class SsbItem {
  protected el: HTMLSsbItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbItem extends Components.SsbItem {}


@ProxyCmp({
  inputs: ['aria']
})
@Component({
  selector: 'ssb-kbd',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria'],
  standalone: false
})
export class SsbKbd {
  protected el: HTMLSsbKbdElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbKbd extends Components.SsbKbd {}


@ProxyCmp({
  inputs: ['aria', 'disabled', 'htmlFor', 'required']
})
@Component({
  selector: 'ssb-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'disabled', 'htmlFor', 'required'],
  standalone: false
})
export class SsbLabel {
  protected el: HTMLSsbLabelElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbLabel extends Components.SsbLabel {}


@ProxyCmp({
  inputs: ['aria', 'disabled', 'name', 'options', 'placeholder', 'required', 'size', 'value']
})
@Component({
  selector: 'ssb-native-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'disabled', 'name', 'options', 'placeholder', 'required', 'size', 'value'],
  outputs: ['ssbChange'],
  standalone: false
})
export class SsbNativeSelect {
  protected el: HTMLSsbNativeSelectElement;
  @Output() ssbChange = new EventEmitter<SsbNativeSelectCustomEvent<{ value: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbNativeSelectCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbNativeSelect extends Components.SsbNativeSelect {
  /**
   * Emitted when the selection changes. Detail contains the selected value.
   */
  ssbChange: EventEmitter<SsbNativeSelectCustomEvent<{ value: string }>>;
}


@ProxyCmp({
  inputs: ['aria', 'page', 'siblingCount', 'totalPages']
})
@Component({
  selector: 'ssb-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'page', 'siblingCount', 'totalPages'],
  outputs: ['ssbPageChange'],
  standalone: false
})
export class SsbPagination {
  protected el: HTMLSsbPaginationElement;
  @Output() ssbPageChange = new EventEmitter<SsbPaginationCustomEvent<ISsbPaginationPaginationPageChangeDetail>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbPaginationCustomEvent } from '@stencil-storybook-boilerplate/core';
import type { PaginationPageChangeDetail as ISsbPaginationPaginationPageChangeDetail } from '@stencil-storybook-boilerplate/core';

export declare interface SsbPagination extends Components.SsbPagination {
  /**
   * Emitted when the user selects a different page. Detail: `{ page: number }`.
   */
  ssbPageChange: EventEmitter<SsbPaginationCustomEvent<ISsbPaginationPaginationPageChangeDetail>>;
}


@ProxyCmp({
  inputs: ['align', 'aria', 'open', 'position']
})
@Component({
  selector: 'ssb-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'aria', 'open', 'position'],
  outputs: ['ssbOpenChange'],
  standalone: false
})
export class SsbPopover {
  protected el: HTMLSsbPopoverElement;
  @Output() ssbOpenChange = new EventEmitter<SsbPopoverCustomEvent<{ open: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbPopoverCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbPopover extends Components.SsbPopover {
  /**
   * Emitted whenever the open state changes. Detail contains the new open state.
   */
  ssbOpenChange: EventEmitter<SsbPopoverCustomEvent<{ open: boolean }>>;
}


@ProxyCmp({
  inputs: ['aria', 'label', 'max', 'value']
})
@Component({
  selector: 'ssb-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'label', 'max', 'value'],
  standalone: false
})
export class SsbProgress {
  protected el: HTMLSsbProgressElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbProgress extends Components.SsbProgress {}


@ProxyCmp({
  inputs: ['aria', 'checked', 'disabled', 'value']
})
@Component({
  selector: 'ssb-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'checked', 'disabled', { name: 'value', required: true }],
  outputs: ['ssbRadioSelect'],
  standalone: false
})
export class SsbRadio {
  protected el: HTMLSsbRadioElement;
  @Output() ssbRadioSelect = new EventEmitter<SsbRadioCustomEvent<{ value: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbRadioCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbRadio extends Components.SsbRadio {
  /**
   * Emitted when the radio is selected. Bubbles so a surrounding `ssb-radio-group` can coordinate the selection.
   */
  ssbRadioSelect: EventEmitter<SsbRadioCustomEvent<{ value: string }>>;
}


@ProxyCmp({
  inputs: ['aria', 'disabled', 'name', 'orientation', 'value']
})
@Component({
  selector: 'ssb-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'disabled', 'name', 'orientation', 'value'],
  outputs: ['ssbChange'],
  standalone: false
})
export class SsbRadioGroup {
  protected el: HTMLSsbRadioGroupElement;
  @Output() ssbChange = new EventEmitter<SsbRadioGroupCustomEvent<{ value: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbRadioGroupCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbRadioGroup extends Components.SsbRadioGroup {
  /**
   * Emitted when the selected value changes.
   */
  ssbChange: EventEmitter<SsbRadioGroupCustomEvent<{ value: string }>>;
}


@ProxyCmp({
  inputs: ['aria', 'maxHeight', 'orientation']
})
@Component({
  selector: 'ssb-scroll-area',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'maxHeight', 'orientation'],
  standalone: false
})
export class SsbScrollArea {
  protected el: HTMLSsbScrollAreaElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbScrollArea extends Components.SsbScrollArea {}


@ProxyCmp({
  inputs: ['aria', 'height', 'rounded', 'width']
})
@Component({
  selector: 'ssb-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'height', 'rounded', 'width'],
  standalone: false
})
export class SsbSkeleton {
  protected el: HTMLSsbSkeletonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbSkeleton extends Components.SsbSkeleton {}


@ProxyCmp({
  inputs: ['aria', 'disabled', 'max', 'min', 'showValue', 'step', 'value']
})
@Component({
  selector: 'ssb-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'disabled', 'max', 'min', 'showValue', 'step', 'value'],
  outputs: ['ssbInput', 'ssbChange'],
  standalone: false
})
export class SsbSlider {
  protected el: HTMLSsbSliderElement;
  @Output() ssbInput = new EventEmitter<SsbSliderCustomEvent<{ value: number }>>();
  @Output() ssbChange = new EventEmitter<SsbSliderCustomEvent<{ value: number }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbSliderCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbSlider extends Components.SsbSlider {
  /**
   * Emitted continuously while the thumb is dragged.
   */
  ssbInput: EventEmitter<SsbSliderCustomEvent<{ value: number }>>;
  /**
   * Emitted when the value is committed, e.g. when the drag ends.
   */
  ssbChange: EventEmitter<SsbSliderCustomEvent<{ value: number }>>;
}


@ProxyCmp({
  inputs: ['aria', 'label', 'size']
})
@Component({
  selector: 'ssb-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'label', 'size'],
  standalone: false
})
export class SsbSpinner {
  protected el: HTMLSsbSpinnerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbSpinner extends Components.SsbSpinner {}


@ProxyCmp({
  inputs: ['aria', 'checked', 'disabled', 'name']
})
@Component({
  selector: 'ssb-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'checked', 'disabled', 'name'],
  outputs: ['ssbChange'],
  standalone: false
})
export class SsbSwitch {
  protected el: HTMLSsbSwitchElement;
  @Output() ssbChange = new EventEmitter<SsbSwitchCustomEvent<{ checked: boolean }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbSwitchCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbSwitch extends Components.SsbSwitch {
  /**
   * Emitted when the switch is toggled. Detail contains the new checked state.
   */
  ssbChange: EventEmitter<SsbSwitchCustomEvent<{ checked: boolean }>>;
}


@ProxyCmp({
  inputs: ['aria', 'caption', 'columns', 'compact', 'rows', 'striped']
})
@Component({
  selector: 'ssb-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'caption', 'columns', 'compact', 'rows', 'striped'],
  standalone: false
})
export class SsbTable {
  protected el: HTMLSsbTableElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbTable extends Components.SsbTable {}


@ProxyCmp({
  inputs: ['aria', 'tabs', 'value']
})
@Component({
  selector: 'ssb-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'tabs', 'value'],
  outputs: ['ssbChange'],
  standalone: false
})
export class SsbTabs {
  protected el: HTMLSsbTabsElement;
  @Output() ssbChange = new EventEmitter<SsbTabsCustomEvent<ISsbTabsTabsChangeDetail>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbTabsCustomEvent } from '@stencil-storybook-boilerplate/core';
import type { TabsChangeDetail as ISsbTabsTabsChangeDetail } from '@stencil-storybook-boilerplate/core';

export declare interface SsbTabs extends Components.SsbTabs {
  /**
   * Emitted when the selected tab changes. Detail: `{ value: string }`.
   */
  ssbChange: EventEmitter<SsbTabsCustomEvent<ISsbTabsTabsChangeDetail>>;
}


@ProxyCmp({
  inputs: ['aria', 'disabled', 'invalid', 'name', 'placeholder', 'readonly', 'required', 'rows', 'value']
})
@Component({
  selector: 'ssb-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'disabled', 'invalid', 'name', 'placeholder', 'readonly', 'required', 'rows', 'value'],
  outputs: ['ssbInput', 'ssbChange'],
  standalone: false
})
export class SsbTextarea {
  protected el: HTMLSsbTextareaElement;
  @Output() ssbInput = new EventEmitter<SsbTextareaCustomEvent<{ value: string }>>();
  @Output() ssbChange = new EventEmitter<SsbTextareaCustomEvent<{ value: string }>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbTextareaCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbTextarea extends Components.SsbTextarea {
  /**
   * Emitted on every keystroke while the user types. Detail contains the current value.
   */
  ssbInput: EventEmitter<SsbTextareaCustomEvent<{ value: string }>>;
  /**
   * Emitted when the value is committed (native change). Detail contains the current value.
   */
  ssbChange: EventEmitter<SsbTextareaCustomEvent<{ value: string }>>;
}


@ProxyCmp({
  inputs: ['aria', 'theme']
})
@Component({
  selector: 'ssb-theme-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'theme'],
  outputs: ['ssbThemeChange'],
  standalone: false
})
export class SsbThemeSwitcher {
  protected el: HTMLSsbThemeSwitcherElement;
  @Output() ssbThemeChange = new EventEmitter<SsbThemeSwitcherCustomEvent<ISsbThemeSwitcherThemeChangeDetail>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbThemeSwitcherCustomEvent } from '@stencil-storybook-boilerplate/core';
import type { ThemeChangeDetail as ISsbThemeSwitcherThemeChangeDetail } from '@stencil-storybook-boilerplate/core';

export declare interface SsbThemeSwitcher extends Components.SsbThemeSwitcher {
  /**
   * Emitted after the theme has been toggled.
   */
  ssbThemeChange: EventEmitter<SsbThemeSwitcherCustomEvent<ISsbThemeSwitcherThemeChangeDetail>>;
}


@ProxyCmp({
  inputs: ['aria', 'description', 'dismissible', 'duration', 'open', 'toastTitle', 'variant']
})
@Component({
  selector: 'ssb-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'description', 'dismissible', 'duration', 'open', 'toastTitle', 'variant'],
  outputs: ['ssbClose'],
  standalone: false
})
export class SsbToast {
  protected el: HTMLSsbToastElement;
  @Output() ssbClose = new EventEmitter<SsbToastCustomEvent<void>>();
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


import type { SsbToastCustomEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SsbToast extends Components.SsbToast {
  /**
   * Emitted when the toast is closed, either by the user or by the auto-dismiss timer.
   */
  ssbClose: EventEmitter<SsbToastCustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['aria', 'openDelay', 'position', 'text']
})
@Component({
  selector: 'ssb-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['aria', 'openDelay', 'position', 'text'],
  standalone: false
})
export class SsbTooltip {
  protected el: HTMLSsbTooltipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SsbTooltip extends Components.SsbTooltip {}


