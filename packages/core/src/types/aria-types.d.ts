import { Booleanish } from './booleanish';
import { ARIA } from '../utils';

export type AriaAttributes = {
  [ARIA.AriaActiveDescendant]?: string;
  [ARIA.AriaAtomic]?: Booleanish;
  [ARIA.AriaAutocomplete]?: 'none' | 'inline' | 'list' | 'both';
  [ARIA.AriaBraillelabel]?: string;
  [ARIA.AriaBrailleroledescription]?: string;
  [ARIA.AriaBusy]?: Booleanish;
  [ARIA.AriaChecked]?: Booleanish | 'mixed';
  [ARIA.AriaColcount]?: number;
  [ARIA.AriaColindex]?: number;
  [ARIA.AriaColindextext]?: string;
  [ARIA.AriaColspan]?: number;
  [ARIA.AriaControls]?: string;
  [ARIA.AriaCurrent]?: Booleanish | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time';
  [ARIA.AriaDescribedby]?: string;
  [ARIA.AriaDescription]?: string;
  [ARIA.AriaDetails]?: string;
  [ARIA.AriaDisabled]?: Booleanish;
  [ARIA.AriaDropeffect]?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
  [ARIA.AriaErrormessage]?: string;
  [ARIA.AriaExpanded]?: Booleanish;
  [ARIA.AriaFlowto]?: string;
  [ARIA.AriaGrabbed]?: Booleanish;
  [ARIA.AriaHaspopup]?: Booleanish | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  [ARIA.AriaHidden]?: Booleanish;
  [ARIA.AriaInvalid]?: Booleanish | 'grammar' | 'spelling';
  [ARIA.AriaKeyshortcuts]?: string;
  [ARIA.AriaLabel]?: string;
  [ARIA.AriaLabelledby]?: string;
  [ARIA.AriaLevel]?: number;
  [ARIA.AriaLive]?: 'off' | 'assertive' | 'polite';
  [ARIA.AriaModal]?: Booleanish;
  [ARIA.AriaMultiline]?: Booleanish;
  [ARIA.AriaMultiselectable]?: Booleanish;
  [ARIA.AriaOrientation]?: 'horizontal' | 'vertical';
  [ARIA.AriaOwns]?: string;
  [ARIA.AriaPlaceholder]?: string;
  [ARIA.AriaPosinset]?: number;
  [ARIA.AriaPressed]?: Booleanish | 'mixed';
  [ARIA.AriaReadonly]?: Booleanish;
  [ARIA.AriaRelevant]?: 'additions' | 'removals' | 'text' | 'all';
  [ARIA.AriaRequired]?: Booleanish;
  [ARIA.AriaRoledescription]?: string;
  [ARIA.AriaRowcount]?: number;
  [ARIA.AriaRowindex]?: number;
  [ARIA.AriaRowindextext]?: string;
  [ARIA.AriaRowspan]?: number;
  [ARIA.AriaSelected]?: Booleanish;
  [ARIA.AriaSetsize]?: number;
  [ARIA.AriaSort]?: 'none' | 'ascending' | 'descending' | 'other';
  [ARIA.AriaValuemax]?: number;
  [ARIA.AriaValuemin]?: number;
  [ARIA.AriaValuenow]?: number;
  [ARIA.AriaValuetext]?: string;
  [ARIA.Role]?: AriaRole;
};

export type SelectedAriaAttributes<T extends keyof AriaAttributes> = Pick<AriaAttributes, T> | string;

type AriaRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'button'
  | 'cell'
  | 'checkbox'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'feed'
  | 'figure'
  | 'form'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'note'
  | 'option'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem';
