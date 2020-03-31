import { css } from 'lit-element';

export const progressBarStyles = css`
  :host {
    display: block;
    width: 100%; /* prevent collapsing inside non-stretching column flex */
    height: 8px;
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='bar'] {
    height: 100%;
  }

  [part='value'] {
    height: 100%;
    transform-origin: 0 50%;
    transform: scaleX(var(--vaadin-progress-value));
  }

  /* RTL specific styles */
  :host([dir='rtl']) [part='value'] {
    transform-origin: 100% 50%;
  }
`;
