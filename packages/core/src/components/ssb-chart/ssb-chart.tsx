import { Component, Host, Prop, h } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbChartAriaAttribute = {
  'aria-label': string;
};

export type ChartDatum = {
  label: string;
  value: number;
};

const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 300;
const PADDING_Y = 10;
const GRID_LINES = 4;

@Component({
  tag: 'ssb-chart',
  styleUrl: 'ssb-chart.css',
  shadow: true,
})
export class SsbChart {
  /**
   * Kind of chart to render.
   */
  @Prop() type: 'bar' | 'line' | 'area' = 'bar';

  /**
   * Data points to render (array of `{ label, value }` objects or a JSON string when used as an attribute).
   */
  @Prop() data: ChartDatum[] | string = [];

  /**
   * Height of the plot area (any CSS length).
   */
  @Prop() chartHeight: string = '16rem';

  /**
   * Renders horizontal gridlines.
   */
  @Prop() showGrid: boolean = true;

  /**
   * Renders the data labels below the chart.
   */
  @Prop() showLabels: boolean = true;

  /**
   * Uses the accent color instead of the foreground color for the series.
   */
  @Prop() accent: boolean = false;

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbChartAriaAttribute>;

  private parseData(): ChartDatum[] {
    if (typeof this.data !== 'string') {
      return this.data || [];
    }
    try {
      const parsed = JSON.parse(this.data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      console.error('Invalid data: Expected a JSON array of { label, value } objects');
      return [];
    }
  }

  private scaleY(value: number, max: number): number {
    const plotHeight = VIEW_HEIGHT - PADDING_Y * 2;
    return VIEW_HEIGHT - PADDING_Y - (value / max) * plotHeight;
  }

  private renderGrid() {
    if (!this.showGrid) {
      return null;
    }
    const lines = [];
    for (let index = 0; index <= GRID_LINES; index++) {
      const y = PADDING_Y + ((VIEW_HEIGHT - PADDING_Y * 2) / GRID_LINES) * index;
      lines.push(<line class="chart__grid" x1={0} y1={y} x2={VIEW_WIDTH} y2={y} />);
    }
    return lines;
  }

  private renderBars(data: ChartDatum[], max: number) {
    const slot = VIEW_WIDTH / data.length;
    const barWidth = slot * 0.6;
    return data.map((datum, index) => {
      const y = this.scaleY(Math.max(datum.value, 0), max);
      return (
        <rect class="chart__bar" x={slot * index + (slot - barWidth) / 2} y={y} width={barWidth} height={VIEW_HEIGHT - PADDING_Y - y} rx={4}>
          <title>{`${datum.label}: ${datum.value}`}</title>
        </rect>
      );
    });
  }

  private renderLine(data: ChartDatum[], max: number, filled: boolean) {
    const slot = VIEW_WIDTH / data.length;
    const points = data.map((datum, index) => ({
      x: slot * index + slot / 2,
      y: this.scaleY(Math.max(datum.value, 0), max),
    }));
    const polyline = points.map(point => `${point.x},${point.y}`).join(' ');
    const areaPath = `M ${points[0].x} ${VIEW_HEIGHT - PADDING_Y} L ${polyline.split(' ').join(' L ')} L ${points[points.length - 1].x} ${VIEW_HEIGHT - PADDING_Y} Z`;

    return [
      filled && <path class="chart__area" d={areaPath} />,
      <polyline class="chart__line" points={polyline} />,
      ...points.map((point, index) => (
        <circle class="chart__dot" cx={point.x} cy={point.y} r={3.5}>
          <title>{`${data[index].label}: ${data[index].value}`}</title>
        </circle>
      )),
    ];
  }

  render() {
    const data = this.parseData();
    const max = Math.max(...data.map(datum => datum.value), 1);
    const defaultLabel = `${this.type === 'bar' ? 'Bar' : this.type === 'line' ? 'Line' : 'Area'} chart with ${data.length} data points`;

    return (
      <Host>
        <div class={{ 'chart': true, 'chart--accent': this.accent }} role="img" aria-label={defaultLabel} {...getAriaAttributes(this.aria)}>
          {data.length === 0 ? (
            <div class="chart__empty">No data</div>
          ) : (
            <div class="chart__plot" style={{ height: this.chartHeight }}>
              <svg class="chart__svg" viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                {this.renderGrid()}
                {this.type === 'bar' ? this.renderBars(data, max) : this.renderLine(data, max, this.type === 'area')}
              </svg>
            </div>
          )}
          {this.showLabels && data.length > 0 && (
            <div class="chart__labels" aria-hidden="true">
              {data.map(datum => (
                <span class="chart__label">{datum.label}</span>
              ))}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
