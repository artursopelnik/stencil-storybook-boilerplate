# ssb-accordion-item



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                       | Type                                  | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------- |
| `aria`     | `aria`     | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; }` | `undefined` |
| `disabled` | `disabled` | Disables the item so it can no longer be toggled.                                                 | `boolean`                             | `false`     |
| `heading`  | `heading`  | Heading text shown in the trigger button.                                                         | `string`                              | `''`        |
| `open`     | `open`     | Whether the item content is expanded.                                                             | `boolean`                             | `false`     |


## Events

| Event       | Description                                                           | Type                              |
| ----------- | --------------------------------------------------------------------- | --------------------------------- |
| `ssbToggle` | Emitted after the user toggles the item. Detail: `{ open: boolean }`. | `CustomEvent<{ open: boolean; }>` |


----------------------------------------------


