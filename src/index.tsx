import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { mergeStyles } from '@uifabric/styling';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { Customizer } from 'office-ui-fabric-react';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
//require('monaco-editor/esm/vs/basic-languages/ypescript/typescript.contribution');
require('monaco-editor/esm/vs/editor/browser/controller/coreCommands.js');
require('monaco-editor/esm/vs/editor/contrib/find/findController.js');

// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: '100vh'
    }
  }
});


ReactDOM.render(
  <Customizer {...FluentCustomizations}>
    <App />
  </Customizer>,
  document.getElementById('app')
);


