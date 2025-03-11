# Vite Workaround for Themeable CSS

Since Stencil does not natively support multiple global styles, we can use a Vite workaround to generate and handle multiple CSS files before passing them to Stencil for processing.

## Steps:

- Build the CSS Files: Use Vite to create CSS files for each theme (light, dark, etc.).

- Copy the CSS Files: After building, copy the generated CSS files into the appropriate directories for use with Stencil.
