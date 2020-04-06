import { registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import { progressBarStyles } from './vaadin-progress-bar-css';

registerStyles('vaadin-progress-bar', progressBarStyles, { moduleId: 'material-progress-bar' });
