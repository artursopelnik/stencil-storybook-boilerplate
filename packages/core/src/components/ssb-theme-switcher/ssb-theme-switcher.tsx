import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';
import { getAriaAttributes } from '../../utils';
import { SelectedAriaAttributes } from '../../types';

type SsbThemeSwitcherAriaAttribute = {
  'aria-label': string;
};

export type Theme = 'light' | 'dark';

export type ThemeChangeDetail = {
  theme: Theme;
};

@Component({
  tag: 'ssb-theme-switcher',
  styleUrl: 'ssb-theme-switcher.css',
  shadow: true,
})
export class SsbThemeSwitcher {
  /**
   * Currently active theme. Initialized from the `ssb-theme--dark` class on the document element.
   */
  @Prop({ mutable: true, reflect: true }) theme: Theme = 'light';

  /**
   * ARIA attributes (JSON string or object). Prefer this over spreading individual aria-* attributes.
   */
  @Prop() aria?: SelectedAriaAttributes<SsbThemeSwitcherAriaAttribute>;

  /**
   * Emitted after the theme has been toggled.
   */
  @Event() ssbThemeChange: EventEmitter<ThemeChangeDetail>;

  componentWillLoad() {
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('ssb-theme--dark')) {
      this.theme = 'dark';
    }
  }

  private toggleTheme = () => {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';

    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('ssb-theme--dark', this.theme === 'dark');
      document.documentElement.classList.toggle('ssb-theme--light', this.theme === 'light');
    }

    this.ssbThemeChange.emit({ theme: this.theme });
  };

  render() {
    const isDark = this.theme === 'dark';

    return (
      <Host>
        <button
          class="theme-switcher"
          type="button"
          onClick={this.toggleTheme}
          aria-pressed={isDark ? 'true' : 'false'}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          {...getAriaAttributes(this.aria)}
        >
          <span class="theme-switcher__icon" aria-hidden="true">
            {isDark ? '\u{1F319}' : '☀'}
          </span>
        </button>
      </Host>
    );
  }
}
