//import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React from 'react';

interface IEditorProps {
  width: number,
  height: number,
  value: string,
  language: string
}

class Editor extends React.Component<IEditorProps> {

  private editor: monaco.editor.IStandaloneCodeEditor | undefined;
  private codeValue: string;

  constructor(props: any) {
    super(props);
    this.editor = undefined;
    this.codeValue = this.props.value;

  }

  componentDidMount() {
    this.createEditor();
  }

  componentWillUnmount() {
    this.closeEditor();
  }

  componentDidUpdate() {
    if (this.props.value != this.codeValue) {
      this.codeValue = this.props.value;
      if (this.editor) {
        this.editor.setValue(this.codeValue);
      }
    }
  }

  createEditor() {
    this.editor = monaco.editor.create(document.getElementById("editor") as HTMLElement, {
      value: this.props.value,
      language: this.props.language
    });
  }

  closeEditor() {
    if (this.editor) {
      this.editor.dispose();
    }
  }

  render() {
    const { width, height } = this.props;
    const style = {
      width: width,
      height: height
    }
    return (
      <div style = {style} id = "editor" />
    )
  }



}

export default Editor;
