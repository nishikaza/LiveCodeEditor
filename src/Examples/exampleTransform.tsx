import * as babylon from 'babylon';
import * as prettier from 'prettier';
import * as fs from 'fs';
import * as path from 'path';

// recast and jscodeshift have no @types :(
	const recast: Recast = require('recast');
	const jscodeshift: {
		withParser: (parser: string) => JSCodeShift;
	} = require('jscodeshift');

import { Recast, JSCodeShift, IASTPath, IASTSpecifier, IASTNode } from './interfaces';


// These files are copied to lib in the pre-copy step (see config/pre-copy.json)
const exampleDataFiles = {
  exampleData: { name: 'exampleData', contents: '' },
  testImages: { name: 'TestImages', contents: '' },
  peopleExampleData: { name: 'PeopleExampleData', contents: '' }
};

const exampleDataRegex = new RegExp(
  Object.values(exampleDataFiles)
    // tslint:disable-next-line:typedef
    .map(fileInfo => `\\b${fileInfo.name}\\b`)
    .join('|') + '$'
);

for (const fileInfo of Object.values(exampleDataFiles)) {
  // Read each file and remove all export statements (to avoid confusing the logic later that
  // determines which exported thing is the actual example component)
  let contents = fs
    .readFileSync(path.resolve(__dirname, '../lib', fileInfo.name + '.ts'))
    .toString();

  // Strip the first few lines of comments from the files--they all have notes at the top which
  // don't need to be in the resulting codepen
  while (contents.startsWith('//')) {
    contents = contents.replace(/^.*?\r?\n/, '');
  }
  // Hack to quickly get rid of exports
  contents = contents.replace(/^export /gm, '');
  fileInfo.contents = contents;
}

const j = jscodeshift.withParser('babylon');

const parse = (source: string) =>
  babylon.parse(source, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript', 'classProperties', 'objectRestSpread']
  });

export function transformExample(file: string): string {
  let sourceStr = file;

  // If example data files were imported, append the file contents
  for (const fileInfo of Object.values(exampleDataFiles)) {
    if (file.includes(`/${fileInfo.name}'`)) {
      sourceStr += `\n${fileInfo.contents}\n`;
    }
	}

	const source = j(recast.parse(sourceStr, { parser: { parse } }));

	// Make a list of imported identifiers, and remove all imports
  const identifiers: string[] = [];
  source.find(j.ImportDeclaration).forEach((p: IASTPath) => {
    const importPath = p.node.source.value;
    // Ignore identifiers from:
    // - the React import (which will be a global)
    // - css/scss
    // - example data files which will be appended if needed
    if (
      importPath !== 'react' &&
      !/\.s?css$/.test(importPath) &&
      !exampleDataRegex.test(importPath)
    ) {
      p.node.specifiers.forEach((spec: IASTSpecifier) => {
        identifiers.push(spec.local.loc.identifierName);
      });
    }

    // Remove the import
    p.prune();
  });

  let exampleName;
  // remove exports and replace with variable or class declarations, whichever the original example used
  source
    .find(
      j.ExportNamedDeclaration,
      (node: IASTNode) =>
        node.declaration.type === 'VariableDeclaration' ||
        node.declaration.type === 'FunctionDeclaration'
    )
    .replaceWith((p: IASTPath) => {
      if (p.node.declaration.type === 'VariableDeclaration') {
        exampleName = p.node.declaration.declarations[0].id.name;
      }
      return p.node.declaration;
    });

  source
    .find(
      j.ExportNamedDeclaration,
      (node: IASTNode) =>
        node.declaration.type === 'ClassDeclaration' ||
        node.declaration.type === 'TSInterfaceDeclaration'
    )
    .replaceWith((p: IASTPath) => {
      if (p.node.declaration.type === 'ClassDeclaration') {
        exampleName = p.node.declaration.id.name;
      }
      console.log(p.node.declaration)
      return p.node.declaration;
    });

  let attachedWindowString = 'const {';
  if (identifiers.length > 0) {
    attachedWindowString += identifiers.join(',') + ',';
  }
  attachedWindowString += 'Fabric} = window.Fabric;\n';

  // add imports and React render footer (with the component wrapped in a <Fabric> for styling)
  const sourceWithFooter = [
    attachedWindowString,
    source.toSource(),
    `ReactDOM.render(<Fabric><${exampleName}/></Fabric>, document.getElementById("content"));`
  ].join('\n');

  return sourceWithFooter;
}
