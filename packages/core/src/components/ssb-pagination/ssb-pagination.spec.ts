import { newSpecPage } from '@stencil/core/testing';
import { SsbPagination } from './ssb-pagination';

describe('ssb-pagination', () => {
  it('renders page buttons with the current page marked', async () => {
    const page = await newSpecPage({
      components: [SsbPagination],
      html: '<ssb-pagination page="2" total-pages="5"></ssb-pagination>',
    });
    const current = page.root.shadowRoot.querySelector('[aria-current="page"]');
    expect(current).toBeTruthy();
    expect(current.textContent).toBe('2');
    expect(page.root.shadowRoot.querySelector('nav').getAttribute('aria-label')).toBe('Pagination');
  });

  it('collapses long ranges into ellipsis entries', async () => {
    const page = await newSpecPage({
      components: [SsbPagination],
      html: '<ssb-pagination page="5" total-pages="10"></ssb-pagination>',
    });
    const ellipses = page.root.shadowRoot.querySelectorAll('.ellipsis');
    expect(ellipses.length).toBe(2);
    const buttons = Array.from(page.root.shadowRoot.querySelectorAll('button')).map(button => button.textContent);
    expect(buttons).toEqual(['Previous', '1', '4', '5', '6', '10', 'Next']);
  });

  it('disables Previous on the first page and Next on the last page', async () => {
    const first = await newSpecPage({
      components: [SsbPagination],
      html: '<ssb-pagination page="1" total-pages="3"></ssb-pagination>',
    });
    const firstButtons = first.root.shadowRoot.querySelectorAll('button');
    expect(firstButtons[0].hasAttribute('disabled')).toBe(true);
    expect(firstButtons[firstButtons.length - 1].hasAttribute('disabled')).toBe(false);

    const last = await newSpecPage({
      components: [SsbPagination],
      html: '<ssb-pagination page="3" total-pages="3"></ssb-pagination>',
    });
    const lastButtons = last.root.shadowRoot.querySelectorAll('button');
    expect(lastButtons[0].hasAttribute('disabled')).toBe(false);
    expect(lastButtons[lastButtons.length - 1].hasAttribute('disabled')).toBe(true);
  });

  it('emits ssbPageChange when a page button is clicked', async () => {
    const page = await newSpecPage({
      components: [SsbPagination],
      html: '<ssb-pagination page="1" total-pages="3"></ssb-pagination>',
    });
    const changeSpy = jest.fn();
    page.root.addEventListener('ssbPageChange', changeSpy);
    const buttons = Array.from(page.root.shadowRoot.querySelectorAll('button'));
    const pageTwo = buttons.find(button => button.textContent === '2');
    pageTwo.click();
    await page.waitForChanges();
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ page: 2 });
  });
});
