import { newSpecPage } from '@stencil/core/testing';
import { SsbChart } from './ssb-chart';

const DATA = JSON.stringify([
  { label: 'Jan', value: 12 },
  { label: 'Feb', value: 24 },
  { label: 'Mar', value: 18 },
]);

describe('ssb-chart', () => {
  it('renders one bar per datum from a JSON attribute', async () => {
    const page = await newSpecPage({
      components: [SsbChart],
      html: `<ssb-chart data='${DATA}'></ssb-chart>`,
    });
    expect(page.root.shadowRoot.querySelectorAll('.chart__bar').length).toBe(3);
    expect(page.root.shadowRoot.querySelectorAll('.chart__label').length).toBe(3);
  });

  it('renders a line with dots for type="line"', async () => {
    const page = await newSpecPage({
      components: [SsbChart],
      html: `<ssb-chart type="line" data='${DATA}'></ssb-chart>`,
    });
    expect(page.root.shadowRoot.querySelector('.chart__line')).toBeTruthy();
    expect(page.root.shadowRoot.querySelectorAll('.chart__dot').length).toBe(3);
    expect(page.root.shadowRoot.querySelector('.chart__area')).toBeFalsy();
  });

  it('renders a filled area for type="area"', async () => {
    const page = await newSpecPage({
      components: [SsbChart],
      html: `<ssb-chart type="area" data='${DATA}'></ssb-chart>`,
    });
    expect(page.root.shadowRoot.querySelector('.chart__area')).toBeTruthy();
  });

  it('renders an empty state without data', async () => {
    const page = await newSpecPage({
      components: [SsbChart],
      html: '<ssb-chart></ssb-chart>',
    });
    expect(page.root.shadowRoot.querySelector('.chart__empty').textContent).toBe('No data');
  });
});
