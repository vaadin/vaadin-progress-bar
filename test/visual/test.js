gemini.suite('vaadin-progress-bar', rootSuite => {
  function wait(actions, find) {
    return actions.waitForJSCondition(window => {
      return window.webComponentsAreReady;
    }, 80000);
  }

  rootSuite.before(wait);

  ['lumo', 'material'].forEach(theme => {
    gemini.suite(`default-tests-${theme}`, suite => {
      suite
        .setUrl(`default.html?theme=${theme}`)
        .setCaptureElements('#default-tests')
        .capture('vaadin-progress-bar');
    });

    gemini.suite(`default-rtl-${theme}`, suite => {
      suite
        .setUrl(`rtl.html?theme=${theme}`)
        .setCaptureElements('#rtl-tests')
        .capture('vaadin-progress-bar');
    });
  });
});
