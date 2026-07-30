# ssb-popover



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                       | Type                                                             | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------- |
| `align`    | `align`    | Alignment of the panel relative to the trigger.                                                   | `"center" \| "end" \| "start"`                                   | `'center'`  |
| `aria`     | `aria`     | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; 'aria-labelledby': string; }` | `undefined` |
| `open`     | `open`     | Controls whether the popover panel is shown.                                                      | `boolean`                                                        | `false`     |
| `position` | `position` | Side of the trigger on which the panel is placed.                                                 | `"bottom" \| "top"`                                              | `'bottom'`  |


## Events

| Event           | Description                                                                  | Type                              |
| --------------- | ---------------------------------------------------------------------------- | --------------------------------- |
| `ssbOpenChange` | Emitted whenever the open state changes. Detail contains the new open state. | `CustomEvent<{ open: boolean; }>` |


----------------------------------------------


