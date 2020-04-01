import { customElement } from 'lit-element';
import { ProgressBarBase } from './vaadin-progress-bar-base';
import { ProgressMixin } from './vaadin-progress-mixin';

@customElement('vaadin-progress-bar')
export class VaadinProgressBar extends ProgressMixin(ProgressBarBase) {
  static is = 'vaadin-progress-bar';

  static get version() {
    return '1.2.0-alpha1';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vaadin-progress-bar': VaadinProgressBar;
  }
}
