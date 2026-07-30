# ssb-tabs



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                                                                                | Type                                  | Default     |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ----------- |
| `aria`   | `aria`    | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.                                                                                          | `string \| { 'aria-label': string; }` | `undefined` |
| `tabs`   | `tabs`    | Tab definitions as an array or a JSON string. Shape: `[{ "value": "tab1", "label": "Tab 1", "disabled": false }]`. The panel content is projected via `<div slot="tab1">…</div>` children. | `TabItem[] \| string`                 | `[]`        |
| `value`  | `value`   | Value of the selected tab. Defaults to the first tab when empty.                                                                                                                           | `string`                              | `''`        |


## Events

| Event       | Description                                                         | Type                              |
| ----------- | ------------------------------------------------------------------- | --------------------------------- |
| `ssbChange` | Emitted when the selected tab changes. Detail: `{ value: string }`. | `CustomEvent<{ value: string; }>` |


----------------------------------------------


