# ssb-sidebar



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                                                                                                                 | Type                                                             | Default     |
| ---------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------- |
| `aria`           | `aria`            | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.                           | `string \| { 'aria-label': string; 'aria-labelledby': string; }` | `undefined` |
| `collapsed`      | `collapsed`       | Controls whether the sidebar is collapsed to its narrow width.                                                              | `boolean`                                                        | `false`     |
| `collapsedWidth` | `collapsed-width` | Width of the sidebar in its collapsed state.                                                                                | `string`                                                         | `'3.5rem'`  |
| `collapsible`    | `collapsible`     | Shows a collapse toggle button in the footer area.                                                                          | `boolean`                                                        | `true`      |
| `side`           | `side`            | Which side of the layout the sidebar sits on. Controls which border is drawn.                                               | `"left" \| "right"`                                              | `'left'`    |
| `width`          | `width`           | Width of the sidebar in its expanded state. The parent element must size the sidebar's height (the host uses height: 100%). | `string`                                                         | `'16rem'`   |


## Events

| Event       | Description                                                                                                  | Type                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `ssbToggle` | Emitted whenever the collapsed state changes via the toggle button. Detail contains the new collapsed state. | `CustomEvent<{ collapsed: boolean; }>` |


----------------------------------------------


