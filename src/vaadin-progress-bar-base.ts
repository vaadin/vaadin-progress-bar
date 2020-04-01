import { html } from 'lit-element';
import { VaadinElement } from '@vaadin/element-base/vaadin-element.js';
import { progressBarStyles } from './vaadin-progress-bar-css';

export class ProgressBarBase extends VaadinElement {
  static get styles() {
    return progressBarStyles;
  }

  protected render() {
    return html`
      <div part="bar">
        <div part="value"></div>
      </div>
    `;
  }
}
