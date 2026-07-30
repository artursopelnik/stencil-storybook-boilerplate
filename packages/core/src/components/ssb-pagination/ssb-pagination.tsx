import { Component, Event, EventEmitter, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbPaginationAriaAttribute = {
  'aria-label': string;
};

export type PaginationPageChangeDetail = { page: number };

type PageEntry = number | 'ellipsis';

@Component({
  tag: 'ssb-pagination',
  styleUrl: 'ssb-pagination.css',
  shadow: true,
})
export class SsbPagination {
  /**
   * Currently selected page (1-based).
   */
  @Prop({ mutable: true }) page: number = 1;

  /**
   * Total number of pages.
   */
  @Prop() totalPages: number = 1;

  /**
   * Number of pages shown on each side of the current page before collapsing into an ellipsis.
   */
  @Prop() siblingCount: number = 1;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbPaginationAriaAttribute>;

  /**
   * Emitted when the user selects a different page. Detail: `{ page: number }`.
   */
  @Event() ssbPageChange: EventEmitter<PaginationPageChangeDetail>;

  private get clampedTotal(): number {
    return Math.max(1, this.totalPages);
  }

  private get clampedPage(): number {
    return Math.min(Math.max(1, this.page), this.clampedTotal);
  }

  private getRange(): PageEntry[] {
    const total = this.clampedTotal;
    const current = this.clampedPage;
    const start = Math.max(current - this.siblingCount, 1);
    const end = Math.min(current + this.siblingCount, total);
    const range: PageEntry[] = [1];

    if (start > 2) {
      range.push('ellipsis');
    }
    for (let i = Math.max(start, 2); i <= Math.min(end, total - 1); i++) {
      range.push(i);
    }
    if (end < total - 1) {
      range.push('ellipsis');
    }
    if (total > 1) {
      range.push(total);
    }
    return range;
  }

  private selectPage(page: number) {
    const next = Math.min(Math.max(1, page), this.clampedTotal);
    if (next === this.clampedPage) {
      return;
    }
    this.page = next;
    this.ssbPageChange.emit({ page: next });
  }

  render() {
    const current = this.clampedPage;
    const total = this.clampedTotal;

    return (
      <Host>
        <nav class="pagination" aria-label="Pagination" {...getAriaAttributes(this.aria)}>
          <button class="button button--text" type="button" disabled={current <= 1} onClick={() => this.selectPage(current - 1)}>
            Previous
          </button>
          {this.getRange().map(entry =>
            entry === 'ellipsis' ? (
              <span class="ellipsis" aria-hidden="true">
                &#8230;
              </span>
            ) : (
              <button
                class={{ 'button': true, 'button--current': entry === current }}
                type="button"
                aria-current={entry === current ? 'page' : undefined}
                onClick={() => this.selectPage(entry)}
              >
                {entry}
              </button>
            ),
          )}
          <button class="button button--text" type="button" disabled={current >= total} onClick={() => this.selectPage(current + 1)}>
            Next
          </button>
        </nav>
      </Host>
    );
  }
}
