import { render, describe, it, expect } from '@stencil/vitest';

describe('my-component', () => {
  it('renders', async () => {
    const { root } = await render('<my-component></my-component>');
    await expect(root).toEqualHtml(`
      <my-component class="hydrated">
        <mock:shadow-root>
          <div>
            <div>
              Hello World! I'm
            </div>
            <br>
            <div>
                <button>
                    count is 0
                </button>
            </div>
          </div>
        </mock:shadow-root>
      </my-component>
    `);
  });

  it('renders with values', async () => {
    const { root } = await render(`<my-component first="Stencil" middle="'Don't call me a framework'" last="JS"></my-component>`);
    await expect(root).toEqualHtml(`
      <my-component first="Stencil" middle="'Don't call me a framework'" last="JS" class="hydrated">
        <mock:shadow-root>
          <div>
            <div>
                Hello World! I'm Stencil 'Don't call me a framework' JS
            </div>
            <br>
            <div>
                <button>
                    count is 0
                </button>
            </div>
          </div>
        </mock:shadow-root>
      </my-component>
    `);
  });

  it('increments the count on click', async () => {
    const { root, waitForChanges } = await render('<my-component></my-component>');
    root.shadowRoot.querySelector('button').click();
    await waitForChanges();
    expect(root).toHaveTextContent('count is 1');
  });
});
