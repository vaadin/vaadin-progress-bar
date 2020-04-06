import { Constructor } from '@vaadin/mixin-utils';
import { LitElement, property, PropertyValues } from 'lit-element';

export interface ProgressMixinInterface {
  value: number | null | undefined;

  min: number;

  max: number;

  indeterminate: boolean;
}

export const ProgressMixin = <T extends Constructor<LitElement>>(base: T): T & Constructor<ProgressMixinInterface> => {
  class Progress extends base {
    /**
     * Current progress value.
     */
    @property({ type: Number })
    value: number | null | undefined;

    /**
     * Minimum bound of the progress bar.
     */
    @property({ type: Number })
    min = 0;

    /**
     * Maximum bound of the progress bar.
     */
    @property({ type: Number })
    max = 1;

    /**
     * Indeterminate state of the progress bar.
     * This property takes precedence over other state properties (min, max, value).
     */
    @property({ type: Boolean, reflect: true })
    indeterminate = false;

    protected firstUpdated(props: PropertyValues) {
      super.firstUpdated(props);

      this.setAttribute('role', 'progressbar');
    }

    protected updated(props: PropertyValues) {
      super.updated(props);

      const minChanged = props.has('min');
      if (minChanged) {
        this._minChanged(this.min);
      }

      const maxChanged = props.has('max');
      if (maxChanged) {
        this._maxChanged(this.max);
      }

      const valueChanged = props.has('value');
      if (valueChanged) {
        this._valueChanged(this.value);
      }

      if (valueChanged || minChanged || maxChanged) {
        this._normalizedValueChanged(this.value, this.min, this.max);
      }
    }

    private _normalizedValueChanged(value: number | null | undefined, min: number, max: number) {
      const newValue = this._normalizeValue(value, min, max);
      this.style.setProperty('--vaadin-progress-value', String(newValue));
    }

    private _valueChanged(value: number | null | undefined) {
      this.setAttribute('aria-valuenow', String(value));
    }

    private _minChanged(min: number) {
      this.setAttribute('aria-valuemin', String(min));
    }

    private _maxChanged(max: number) {
      this.setAttribute('aria-valuemax', String(max));
    }

    /**
     * Percent of current progress relative to whole progress bar (max - min)
     */
    private _normalizeValue(value: number | null | undefined, min: number, max: number): number {
      let nV;

      if (!value && value !== 0) {
        nV = 0;
      } else if (min >= max) {
        nV = 1;
      } else {
        nV = (value - min) / (max - min);

        nV = Math.min(Math.max(nV, 0), 1);
      }

      return nV;
    }
  }

  return Progress;
};
