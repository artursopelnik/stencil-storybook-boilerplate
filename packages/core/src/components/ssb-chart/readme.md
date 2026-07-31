# ssb-chart



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                             | Type                                  | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------- |
| `accent`      | `accent`       | Uses the accent color instead of the foreground color for the series.                                   | `boolean`                             | `false`     |
| `aria`        | `aria`         | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.       | `string \| { 'aria-label': string; }` | `undefined` |
| `chartHeight` | `chart-height` | Height of the plot area (any CSS length).                                                               | `string`                              | `'16rem'`   |
| `data`        | `data`         | Data points to render (array of `{ label, value }` objects or a JSON string when used as an attribute). | `ChartDatum[] \| string`              | `[]`        |
| `showGrid`    | `show-grid`    | Renders horizontal gridlines.                                                                           | `boolean`                             | `true`      |
| `showLabels`  | `show-labels`  | Renders the data labels below the chart.                                                                | `boolean`                             | `true`      |
| `type`        | `type`         | Kind of chart to render.                                                                                | `"area" \| "bar" \| "line"`           | `'bar'`     |


----------------------------------------------


