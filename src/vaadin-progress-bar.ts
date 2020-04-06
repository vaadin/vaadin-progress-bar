import { customElement } from 'lit-element';
import { ProgressBarBase } from './vaadin-progress-bar-base';
import { ProgressMixin } from './vaadin-progress-mixin';

/**
 * `<vaadin-progress-bar>` is a Web Component for progress bars.
 *
 * @csspart part="bar" - Progress-bar's background
 * @csspart part="value" - Progress-bar's foreground
 */
@customElement('vaadin-progress-bar')
export class VaadinProgressBar extends ProgressMixin(ProgressBarBase) {
  static is = 'vaadin-progress-bar';

  static get version() {
    return '2.0.0-alpha1';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-progress-bar': VaadinProgressBar;
  }
}
