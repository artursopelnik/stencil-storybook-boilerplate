import { newSpecPage } from '@stencil/core/testing';
import { SsbTooltip } from './ssb-tooltip';

describe('ssb-tooltip', () => {
  it('renders the bubble hidden by default with the top position', async () => {
    const page = await newSpecPage({
      components: [SsbTooltip],
      html: '<ssb-tooltip text="Add to library"><button>Hover me</button></ssb-tooltip>',
    });
    const bubble = page.root.shadowRoot.querySelector('.tooltip');
    expect(bubble).toBeTruthy();
    expect(bubble.classList.contains('tooltip--top')).toBe(true);
    expect(bubble.classList.contains('tooltip--visible')).toBe(false);
  });

  it('renders the tooltip text and role', async () => {
    const page = await newSpecPage({
      components: [SsbTooltip],
      html: '<ssb-tooltip text="Add to library"><button>Hover me</button></ssb-tooltip>',
    });
    const bubble = page.root.shadowRoot.querySelector('.tooltip');
    expect(bubble.textContent).toBe('Add to library');
    expect(bubble.getAttribute('role')).toBe('tooltip');
  });

  it('applies the position class', async () => {
    const page = await newSpecPage({
      components: [SsbTooltip],
      html: '<ssb-tooltip text="Right side" position="right"><button>Hover me</button></ssb-tooltip>',
    });
    const bubble = page.root.shadowRoot.querySelector('.tooltip');
    expect(bubble.classList.contains('tooltip--right')).toBe(true);
    expect(bubble.classList.contains('tooltip--top')).toBe(false);
  });
});
