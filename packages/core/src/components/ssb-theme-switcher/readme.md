# ssb-theme-switcher



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                       | Type                                  | Default     |
| -------- | --------- | ------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------- |
| `aria`   | `aria`    | ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes. | `string \| { 'aria-label': string; }` | `undefined` |
| `theme`  | `theme`   | Currently active theme. Initialized from the `ssb-theme--dark` class on the document element.     | `"dark" \| "light"`                   | `'light'`   |


## Events

| Event            | Description                               | Type                             |
| ---------------- | ----------------------------------------- | -------------------------------- |
| `ssbThemeChange` | Emitted after the theme has been toggled. | `CustomEvent<{ theme: Theme; }>` |


----------------------------------------------


