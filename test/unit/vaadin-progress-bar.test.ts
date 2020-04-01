import { expect, fixture, html } from '@vaadin/vaadin-component-dev-dependencies/testing.js';
import { VaadinProgressBar } from '../../src/vaadin-progress-bar';

describe('progress-bar', () => {
  let progress: VaadinProgressBar;
  let value: HTMLElement;
  let tagName: string;

  beforeEach(async () => {
    progress = await fixture(
      html`
        <vaadin-progress-bar></vaadin-progress-bar>
      `
    );
    value = progress.renderRoot.querySelector('[part="value"]') as HTMLElement;
    tagName = progress.tagName.toLowerCase();
  });

  describe('custom element definition', () => {
    it('should be defined in custom element registry', () => {
      expect(customElements.get(tagName)).to.be.ok;
      expect(progress instanceof VaadinProgressBar).to.be.ok;
    });

    it('should have a valid static "is" getter', () => {
      expect(customElements.get(tagName).is).to.equal(tagName);
    });

    it('should have a valid version number', () => {
      expect(customElements.get(tagName).version).to.match(/^(\d+\.)?(\d+\.)?(\d+)(-(alpha|beta)\d+)?$/);
    });
  });

  function getProgressValue(element: VaadinProgressBar) {
    const prop = '--vaadin-progress-value';
    return window.getComputedStyle(element).getPropertyValue(prop);
  }

  describe('properties', () => {
    it('should have proper scale', async () => {
      progress.value = 0.1;
      await progress.updateComplete;
      expect(value.getBoundingClientRect().width / progress.offsetWidth).to.be.closeTo(0.1, 0.002);
    });

    it('should set progress-value CSS custom properly', async () => {
      progress.value = 0.1;
      await progress.updateComplete;
      expect(getProgressValue(progress)).to.equal('0.1');
    });

    it('should have proper scale with custom min and max', async () => {
      progress.max = 20;
      progress.min = 10;
      progress.value = 15;
      await progress.updateComplete;
      expect(value.getBoundingClientRect().width / progress.offsetWidth).to.be.closeTo(0.5, 0.002);
      expect(getProgressValue(progress)).to.equal('0.5');
    });

    it('should set normalized value to 1 in case of wrong bounds', async () => {
      progress.value = 10;
      progress.max = 12;
      progress.min = 13;
      await progress.updateComplete;
      expect(getProgressValue(progress)).to.be.equal('1');
    });

    it('should set normalized value to 1 in case of equal bounds', async () => {
      progress.value = 10;
      progress.max = 10;
      progress.min = 10;
      await progress.updateComplete;
      expect(getProgressValue(progress)).to.be.equal('1');
    });

    it('should set normalized value to 0 if the value is undefined', async () => {
      progress.value = undefined;
      await progress.updateComplete;
      expect(getProgressValue(progress)).to.be.equal('0');
    });

    it('should clamp normalized value between 0 and 1', async () => {
      progress.value = -1;
      await progress.updateComplete;
      expect(getProgressValue(progress)).to.be.equal('0');

      progress.value = 2;
      await progress.updateComplete;
      expect(getProgressValue(progress)).to.be.equal('1');
    });

    it('should set proper aria-valuenow on value change', async () => {
      progress.max = 100;
      progress.value = 50;
      await progress.updateComplete;
      expect(progress.getAttribute('aria-valuenow')).to.equal('50');
    });

    it('should set proper aria-valuemin on min change', async () => {
      progress.max = 100;
      progress.min = 10;
      await progress.updateComplete;
      expect(progress.getAttribute('aria-valuemin')).to.equal('10');
    });

    it('should set proper aria-valuemax on max change', async () => {
      progress.max = 100;
      progress.min = 10;
      await progress.updateComplete;
      expect(progress.getAttribute('aria-valuemax')).to.equal('100');
    });

    it('should set indeterminate attribute', async () => {
      progress.indeterminate = true;
      await progress.updateComplete;
      expect(progress.hasAttribute('indeterminate')).to.be.true;
    });
  });
});

describe('progress-bar in column flex layout', () => {
  let layout: HTMLElement;
  let progress: VaadinProgressBar;

  beforeEach(async () => {
    layout = await fixture(`
      <div style="display: flex; flex-direction: column; align-items: flex-start">
        <vaadin-progress-bar></vaadin-progress-bar>
      </div>
    `);
    progress = layout.firstElementChild as VaadinProgressBar;
  });

  it('should have width of the parent', () => {
    expect(progress.offsetWidth).to.equal(layout.offsetWidth);
  });

  it('should not collapse', () => {
    expect(progress.offsetWidth).to.be.above(100);
  });
});

describe('a11y', () => {
  let progress: VaadinProgressBar;

  beforeEach(async () => {
    progress = await fixture(
      html`
        <vaadin-progress-bar></vaadin-progress-bar>
      `
    );
  });

  it('should pass accessibility test', async () => {
    await expect(progress).to.be.accessible();
  });
});
