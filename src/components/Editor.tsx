//import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React from 'react';

class Editor extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.createEditor();
  }

  componentDidUpdate() {
    if (this.props)
  }

  createEditor(initialValue?: string) {
    return monaco.editor.create(document.getElementById("editor") as HTMLElement, {
      value: initialValue,
      language: "typescript"
    });
  }




}

export default Editor;
