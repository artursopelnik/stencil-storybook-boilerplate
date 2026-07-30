# ssb-breadcrumb



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                                             | Type                                  | Default     |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------- |
| `aria`      | `aria`      | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.                                                                       | `string \| { 'aria-label': string; }` | `undefined` |
| `items`     | `items`     | Breadcrumb items as an array or a JSON string. Shape: `[{ "label": "Home", "href": "/" }, { "label": "Current page" }]`. The last item is rendered as the current page. | `BreadcrumbItem[] \| string`          | `[]`        |
| `separator` | `separator` | Separator rendered between items.                                                                                                                                       | `string`                              | `'/'`       |


----------------------------------------------


