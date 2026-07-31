# ssb-drawer



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                       | Type                                                                                         | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------- |
| `aria`        | `aria`         | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; 'aria-labelledby': string; 'aria-describedby': string; }` | `undefined` |
| `description` | `description`  | Supporting description shown below the title.                                                     | `string`                                                                                     | `undefined` |
| `drawerTitle` | `drawer-title` | Heading text of the drawer, also used as the accessible name.                                     | `string`                                                                                     | `undefined` |
| `hideClose`   | `hide-close`   | Hides the close (✕) button in the top right corner.                                               | `boolean`                                                                                    | `false`     |
| `open`        | `open`         | Controls whether the drawer is shown.                                                             | `boolean`                                                                                    | `false`     |
| `side`        | `side`         | Edge of the viewport the drawer slides in from.                                                   | `"bottom" \| "left" \| "right" \| "top"`                                                     | `'bottom'`  |


## Events

| Event           | Description                                                                  | Type                              |
| --------------- | ---------------------------------------------------------------------------- | --------------------------------- |
| `ssbOpenChange` | Emitted whenever the open state changes. Detail contains the new open state. | `CustomEvent<{ open: boolean; }>` |


----------------------------------------------


