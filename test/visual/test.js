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
        .capture('vaadin-progress-bar')
        .capture('default')
        .capture('rtl', actions => {
          actions.executeJS(window => {
            window.document.documentElement.setAttribute('dir', 'rtl');
          });
        });
    });
  });

  gemini.suite('lumo-variants', suite => {
    suite
      .setUrl('lumo-variants.html')
      .setCaptureElements('#variants')
      .capture('variants');
  });
});
