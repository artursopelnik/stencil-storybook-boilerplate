# ssb-toast



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                       | Type                                                       | Default     |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `aria`        | `aria`        | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; 'aria-live': string; }` | `undefined` |
| `description` | `description` | Supporting description shown below the title.                                                     | `string`                                                   | `undefined` |
| `dismissible` | `dismissible` | Shows a ✕ button that lets the user dismiss the toast.                                            | `boolean`                                                  | `true`      |
| `duration`    | `duration`    | Auto-dismiss timeout in milliseconds. `0` disables auto-dismiss.                                  | `number`                                                   | `0`         |
| `open`        | `open`        | Controls whether the toast is shown.                                                              | `boolean`                                                  | `false`     |
| `toastTitle`  | `toast-title` | Heading text of the toast.                                                                        | `string`                                                   | `undefined` |
| `variant`     | `variant`     | Visual style of the toast. Use `destructive` for errors.                                          | `"default" \| "destructive"`                               | `'default'` |


## Events

| Event      | Description                                                                        | Type                |
| ---------- | ---------------------------------------------------------------------------------- | ------------------- |
| `ssbClose` | Emitted when the toast is closed, either by the user or by the auto-dismiss timer. | `CustomEvent<void>` |


----------------------------------------------


