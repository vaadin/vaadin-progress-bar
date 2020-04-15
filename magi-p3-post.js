const rootExport = `import './theme/lumo/vaadin-progress-bar.js';

export * from './src/vaadin-progress-bar.js';
`;

module.exports = {
  files: [
    'vaadin-progress-bar.js'
  ],
  from: [
    `import './theme/lumo/vaadin-progress-bar.js';`
  ],
  to: [
    rootExport
  ]
};
