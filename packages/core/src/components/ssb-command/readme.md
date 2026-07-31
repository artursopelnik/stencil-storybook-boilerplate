# ssb-command



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                        | Type                                  | Default                       |
| -------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------------------------- |
| `aria`         | `aria`          | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.                                  | `string \| { 'aria-label': string; }` | `undefined`                   |
| `emptyMessage` | `empty-message` | Message shown when no command matches the search query.                                                                            | `string`                              | `'No results found.'`         |
| `items`        | `items`         | Commands to render (array of `{ label, value, group?, shortcut?, disabled? }` objects or a JSON string when used as an attribute). | `CommandItem[] \| string`             | `[]`                          |
| `placeholder`  | `placeholder`   | Placeholder of the search input.                                                                                                   | `string`                              | `'Type a command or search…'` |


## Events

| Event       | Description                                                              | Type                              |
| ----------- | ------------------------------------------------------------------------ | --------------------------------- |
| `ssbSelect` | Emitted when a command is selected. Detail contains the command's value. | `CustomEvent<{ value: string; }>` |


----------------------------------------------


