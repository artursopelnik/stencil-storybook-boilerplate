# ssb-dropdown-menu



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                                                     | Type                                                             | Default     |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------- |
| `align`  | `align`   | Alignment of the menu relative to the trigger.                                                                                                                  | `"end" \| "start"`                                               | `'start'`   |
| `aria`   | `aria`    | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.                                                               | `string \| { 'aria-label': string; 'aria-labelledby': string; }` | `undefined` |
| `items`  | `items`   | Menu entries (array or JSON string). Entries with `separator` render a divider, entries with `groupLabel` render a group heading, all others render menu items. | `DropdownMenuItem[] \| string`                                   | `[]`        |
| `open`   | `open`    | Controls whether the menu is shown.                                                                                                                             | `boolean`                                                        | `false`     |


## Events

| Event           | Description                                                                  | Type                              |
| --------------- | ---------------------------------------------------------------------------- | --------------------------------- |
| `ssbOpenChange` | Emitted whenever the open state changes. Detail contains the new open state. | `CustomEvent<{ open: boolean; }>` |
| `ssbSelect`     | Emitted when a menu item is selected. Detail contains the item value.        | `CustomEvent<{ value: string; }>` |


----------------------------------------------


