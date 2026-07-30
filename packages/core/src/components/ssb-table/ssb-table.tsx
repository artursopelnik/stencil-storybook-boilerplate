import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbTableAriaAttribute = {
  'aria-label': string;
};

export type TableColumn = { key: string; header: string; align?: 'left' | 'center' | 'right' };

export type TableRow = Record<string, string | number>;

@Component({
  tag: 'ssb-table',
  styleUrl: 'ssb-table.css',
  shadow: true,
})
export class SsbTable {
  /**
   * Column definitions as an array or a JSON string.
   * Shape: `[{ "key": "name", "header": "Name", "align": "left" }]`.
   */
  @Prop() columns: TableColumn[] | string = [];

  /**
   * Row data as an array or a JSON string. Each row is a record keyed by column key.
   * Shape: `[{ "name": "Jane", "amount": 250 }]`.
   */
  @Prop() rows: TableRow[] | string = [];

  /**
   * Optional caption rendered muted below the table.
   */
  @Prop() caption?: string;

  /**
   * Applies a muted background to even rows.
   */
  @Prop() striped: boolean = false;

  /**
   * Reduces cell padding for dense data.
   */
  @Prop() compact: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbTableAriaAttribute>;

  private parseJson<T>(value: T[] | string | undefined): T[] {
    if (typeof value !== 'string') {
      return value ?? [];
    }
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  render() {
    const columns = this.parseJson(this.columns);
    const rows = this.parseJson(this.rows);

    return (
      <Host>
        <table class={{ table: true, 'table--striped': this.striped, 'table--compact': this.compact }} {...getAriaAttributes(this.aria)}>
          {this.caption && <caption class="caption">{this.caption}</caption>}
          <thead>
            <tr>
              {columns.map(column => (
                <th style={{ textAlign: column.align ?? 'left' }}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr>
                {columns.map(column => (
                  <td style={{ textAlign: column.align ?? 'left' }}>{row[column.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Host>
    );
  }
}
