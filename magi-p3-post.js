const tsDep = `"scripts": {
    "generate-typings": "gen-typescript-declarations --outDir ."
  },
  "devDependencies": {
    "@polymer/gen-typescript-declarations": "^1.6.2",`;

const rootExport = `import './theme/lumo/vaadin-progress-bar.js';

export * from './src/vaadin-progress-bar.js';
`;

module.exports = {
  files: [
    'package.json',
    'src/vaadin-progress-bar.js',
    'vaadin-progress-bar.js'
  ],
  from: [
    '"devDependencies": {',
    '@mixes Vaadin.ProgressMixin',
    '@mixes Vaadin.ThemableMixin',
    '@mixes Vaadin.ElementMixin',
    '@memberof Vaadin',
    `import './theme/lumo/vaadin-progress-bar.js';`
  ],
  to: [
    tsDep,
    '@mixes ProgressMixin',
    '@mixes ThemableMixin',
    '@mixes ElementMixin',
    '@extends PolymerElement',
    rootExport
  ]
};
