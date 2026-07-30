import { newSpecPage } from '@stencil/core/testing';
import { SsbTable } from './ssb-table';

describe('ssb-table', () => {
  it('renders columns and rows from JSON string attributes', async () => {
    const page = await newSpecPage({
      components: [SsbTable],
      html: `<ssb-table
        columns='[{"key":"name","header":"Name"},{"key":"amount","header":"Amount","align":"right"}]'
        rows='[{"name":"Jane","amount":250},{"name":"John","amount":150}]'
      ></ssb-table>`,
    });
    const headers = page.root.shadowRoot.querySelectorAll('th');
    expect(headers.length).toBe(2);
    expect(headers[0].textContent).toBe('Name');
    expect(page.root.shadowRoot.querySelectorAll('tbody tr').length).toBe(2);
    expect(page.root.shadowRoot.querySelectorAll('td')[1].textContent).toBe('250');
  });

  it('renders a caption when provided', async () => {
    const page = await newSpecPage({
      components: [SsbTable],
      html: `<ssb-table caption="A list of invoices" columns='[{"key":"name","header":"Name"}]' rows='[]'></ssb-table>`,
    });
    const caption = page.root.shadowRoot.querySelector('caption');
    expect(caption).toBeTruthy();
    expect(caption.textContent).toBe('A list of invoices');
  });

  it('applies striped and compact classes', async () => {
    const page = await newSpecPage({
      components: [SsbTable],
      html: `<ssb-table striped compact columns='[{"key":"name","header":"Name"}]' rows='[{"name":"Jane"}]'></ssb-table>`,
    });
    const table = page.root.shadowRoot.querySelector('table');
    expect(table.classList.contains('table--striped')).toBe(true);
    expect(table.classList.contains('table--compact')).toBe(true);
  });

  it('renders no rows for invalid JSON', async () => {
    const page = await newSpecPage({
      components: [SsbTable],
      html: `<ssb-table columns="not-json" rows="also-not-json"></ssb-table>`,
    });
    expect(page.root.shadowRoot.querySelectorAll('th').length).toBe(0);
    expect(page.root.shadowRoot.querySelectorAll('tbody tr').length).toBe(0);
  });
});
