import { Component, Prop, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbBreadcrumbAriaAttribute = {
  'aria-label': string;
};

export type BreadcrumbItem = { label: string; href?: string };

@Component({
  tag: 'ssb-breadcrumb',
  styleUrl: 'ssb-breadcrumb.css',
  shadow: true,
})
export class SsbBreadcrumb {
  /**
   * Breadcrumb items as an array or a JSON string.
   * Shape: `[{ "label": "Home", "href": "/" }, { "label": "Current page" }]`.
   * The last item is rendered as the current page.
   */
  @Prop() items: BreadcrumbItem[] | string = [];

  /**
   * Separator rendered between items.
   */
  @Prop() separator: string = '/';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbBreadcrumbAriaAttribute>;

  private parseItems(): BreadcrumbItem[] {
    if (typeof this.items !== 'string') {
      return this.items ?? [];
    }
    try {
      const parsed = JSON.parse(this.items);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  render() {
    const items = this.parseItems();

    return (
      <Host>
        <nav aria-label="Breadcrumb" {...getAriaAttributes(this.aria)}>
          <ol class="list">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return [
                <li class="item">
                  {isLast ? (
                    <span class="page" aria-current="page">
                      {item.label}
                    </span>
                  ) : item.href ? (
                    <a class="link" href={item.href}>
                      {item.label}
                    </a>
                  ) : (
                    <span class="link">{item.label}</span>
                  )}
                </li>,
                !isLast && (
                  <li class="separator" aria-hidden="true">
                    <span>{this.separator}</span>
                  </li>
                ),
              ];
            })}
          </ol>
        </nav>
      </Host>
    );
  }
}
