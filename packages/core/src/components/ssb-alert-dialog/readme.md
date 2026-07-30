# ssb-alert-dialog



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                       | Type                                                                                         | Default      |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------ |
| `aria`         | `aria`          | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; 'aria-labelledby': string; 'aria-describedby': string; }` | `undefined`  |
| `cancelLabel`  | `cancel-label`  | Label of the cancel button.                                                                       | `string`                                                                                     | `'Cancel'`   |
| `confirmLabel` | `confirm-label` | Label of the confirm button.                                                                      | `string`                                                                                     | `'Continue'` |
| `description`  | `description`   | Supporting description shown below the title.                                                     | `string`                                                                                     | `undefined`  |
| `destructive`  | `destructive`   | Styles the confirm button as destructive for irreversible actions.                                | `boolean`                                                                                    | `false`      |
| `dialogTitle`  | `dialog-title`  | Heading text of the alert dialog, also used as the accessible name.                               | `string`                                                                                     | `undefined`  |
| `open`         | `open`          | Controls whether the alert dialog is shown.                                                       | `boolean`                                                                                    | `false`      |


## Events

| Event           | Description                                                                  | Type                              |
| --------------- | ---------------------------------------------------------------------------- | --------------------------------- |
| `ssbCancel`     | Emitted when the cancel button is pressed or Escape is used.                 | `CustomEvent<void>`               |
| `ssbConfirm`    | Emitted when the confirm button is pressed.                                  | `CustomEvent<void>`               |
| `ssbOpenChange` | Emitted whenever the open state changes. Detail contains the new open state. | `CustomEvent<{ open: boolean; }>` |


----------------------------------------------


