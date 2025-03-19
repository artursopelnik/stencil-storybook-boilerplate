import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './my-component';

describe('my-component', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: '<my-component></my-component>',
    });
    expect(root).toEqualHtml(`
      <my-component>
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
    const { root } = await newSpecPage({
      components: [MyComponent],
      html: `<my-component first="Stencil" middle="'Don't call me a framework'" last="JS"></my-component>`,
    });
    expect(root).toEqualHtml(`
      <my-component first="Stencil" middle="'Don't call me a framework'" last="JS">
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
});
