# ssb-table



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                                                    | Type                                  | Default     |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ----------- |
| `aria`    | `aria`    | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.                              | `string \| { 'aria-label': string; }` | `undefined` |
| `caption` | `caption` | Optional caption rendered muted below the table.                                                                               | `string`                              | `undefined` |
| `columns` | `columns` | Column definitions as an array or a JSON string. Shape: `[{ "key": "name", "header": "Name", "align": "left" }]`.              | `TableColumn[] \| string`             | `[]`        |
| `compact` | `compact` | Reduces cell padding for dense data.                                                                                           | `boolean`                             | `false`     |
| `rows`    | `rows`    | Row data as an array or a JSON string. Each row is a record keyed by column key. Shape: `[{ "name": "Jane", "amount": 250 }]`. | `TableRow[] \| string`                | `[]`        |
| `striped` | `striped` | Applies a muted background to even rows.                                                                                       | `boolean`                             | `false`     |


----------------------------------------------


