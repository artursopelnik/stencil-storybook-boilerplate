# ssb-pagination



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                       | Type                                  | Default     |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------- |
| `aria`         | `aria`          | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; }` | `undefined` |
| `page`         | `page`          | Currently selected page (1-based).                                                                | `number`                              | `1`         |
| `siblingCount` | `sibling-count` | Number of pages shown on each side of the current page before collapsing into an ellipsis.        | `number`                              | `1`         |
| `totalPages`   | `total-pages`   | Total number of pages.                                                                            | `number`                              | `1`         |


## Events

| Event           | Description                                                                 | Type                             |
| --------------- | --------------------------------------------------------------------------- | -------------------------------- |
| `ssbPageChange` | Emitted when the user selects a different page. Detail: `{ page: number }`. | `CustomEvent<{ page: number; }>` |


----------------------------------------------


