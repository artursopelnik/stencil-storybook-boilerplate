import { newSpecPage } from '@stencil/core/testing';
import { SsbBreadcrumb } from './ssb-breadcrumb';

describe('ssb-breadcrumb', () => {
  it('renders items from a JSON string attribute', async () => {
    const page = await newSpecPage({
      components: [SsbBreadcrumb],
      html: `<ssb-breadcrumb items='[{"label":"Home","href":"/"},{"label":"Library","href":"/library"},{"label":"Data"}]'></ssb-breadcrumb>`,
    });
    const nav = page.root.shadowRoot.querySelector('nav');
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
    expect(page.root.shadowRoot.querySelectorAll('a').length).toBe(2);
  });

  it('marks the last item as the current page', async () => {
    const page = await newSpecPage({
      components: [SsbBreadcrumb],
      html: `<ssb-breadcrumb items='[{"label":"Home","href":"/"},{"label":"Data"}]'></ssb-breadcrumb>`,
    });
    const current = page.root.shadowRoot.querySelector('[aria-current="page"]');
    expect(current).toBeTruthy();
    expect(current.textContent).toBe('Data');
  });

  it('renders custom separators hidden from assistive technology', async () => {
    const page = await newSpecPage({
      components: [SsbBreadcrumb],
      html: `<ssb-breadcrumb separator=">" items='[{"label":"Home","href":"/"},{"label":"Data"}]'></ssb-breadcrumb>`,
    });
    const separator = page.root.shadowRoot.querySelector('.separator');
    expect(separator.getAttribute('aria-hidden')).toBe('true');
    expect(separator.textContent).toBe('>');
  });

  it('renders no items for invalid JSON', async () => {
    const page = await newSpecPage({
      components: [SsbBreadcrumb],
      html: `<ssb-breadcrumb items="not-json"></ssb-breadcrumb>`,
    });
    expect(page.root.shadowRoot.querySelectorAll('li').length).toBe(0);
  });
});
