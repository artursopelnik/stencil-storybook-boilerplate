import { newSpecPage } from '@stencil/core/testing';
import { SsbField } from './ssb-field';

describe('ssb-field', () => {
  it('renders label and description around the slotted control', async () => {
    const page = await newSpecPage({
      components: [SsbField],
      html: '<ssb-field label="Email" description="We never share your email." field-id="email"><input id="email" /></ssb-field>',
    });
    const label = page.root.shadowRoot.querySelector('.field__label');
    expect(label.textContent).toBe('Email');
    expect(label.getAttribute('for')).toBe('email');
    const description = page.root.shadowRoot.querySelector('.field__description');
    expect(description.textContent).toBe('We never share your email.');
  });

  it('shows the error and hides the description', async () => {
    const page = await newSpecPage({
      components: [SsbField],
      html: '<ssb-field label="Email" description="We never share your email." error="Email is required."></ssb-field>',
    });
    const error = page.root.shadowRoot.querySelector('.field__error');
    expect(error.textContent).toBe('Email is required.');
    expect(page.root.shadowRoot.querySelector('.field__description')).toBeNull();
  });

  it('shows a required asterisk next to the label', async () => {
    const page = await newSpecPage({
      components: [SsbField],
      html: '<ssb-field label="Email" required></ssb-field>',
    });
    const asterisk = page.root.shadowRoot.querySelector('.field__required');
    expect(asterisk).toBeTruthy();
    expect(asterisk.textContent).toBe('*');
  });

  it('renders without a label element when no label is set', async () => {
    const page = await newSpecPage({
      components: [SsbField],
      html: '<ssb-field></ssb-field>',
    });
    expect(page.root.shadowRoot.querySelector('.field__label')).toBeNull();
    expect(page.root.shadowRoot.querySelector('slot')).toBeTruthy();
  });
});
