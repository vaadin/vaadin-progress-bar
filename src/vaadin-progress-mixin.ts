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
    @property({ type: Number })
    value: number | null | undefined;

    @property({ type: Number })
    min = 0;

    @property({ type: Number })
    max = 1;

    @property({ type: Boolean, reflect: true })
    indeterminate = false;

    protected firstUpdated() {
      this.setAttribute('role', 'progressbar');
    }

    protected updated(props: PropertyValues) {
      super.updated(props);

      const minChanged = props.has('min');
      if (minChanged) {
        this.min && this._minChanged(this.min);
      }

      const maxChanged = props.has('max');
      if (maxChanged) {
        this.max && this._maxChanged(this.max);
      }

      const valueChanged = props.has('value');
      if (valueChanged) {
        this.value && this._valueChanged(this.value);
      }

      if (valueChanged || minChanged || maxChanged) {
        this.value && this.min && this.max && this._normalizedValueChanged(this.value, this.min, this.max);
      }
    }

    private _normalizedValueChanged(value: number, min: number, max: number) {
      const newValue = this._normalizeValue(value, min, max);
      const prop = '--vaadin-progress-value';

      this.style.setProperty(prop, newValue.toString());
    }

    private _valueChanged(value: number) {
      this.setAttribute('aria-valuenow', value.toString());
    }

    private _minChanged(value: number) {
      this.setAttribute('aria-valuemin', value.toString());
    }

    private _maxChanged(value: number) {
      this.setAttribute('aria-valuemax', value.toString());
    }

    /**
     * Percent of current progress relative to whole progress bar (max - min)
     */
    private _normalizeValue(value: number, min: number, max: number): number {
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
