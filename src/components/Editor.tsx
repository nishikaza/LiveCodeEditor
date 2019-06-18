import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";
import { IEditorProps } from "./Editor.types";

interface IEditorState {
  editor: any,
  codeValue: string
}

export class Editor extends React.Component<IEditorProps> {

  public state: IEditorState = {
    editor: undefined,
    codeValue: ""
  }
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.createEditor();
    this.setState({codeVal: this.props.code})
  }

  componentWillUnmount() {
    this.closeEditor();
  }

  componentDidUpdate() {
    if (this.props.code != this.state.codeValue) {
      this.state.codeValue = this.props.code;
      if (this.state.editor) {
        this.state.editor.setValue(this.state.codeValue);
      }
    }
  }

  createEditor() {
    this.setState({editor: monaco.editor.create(
      document.getElementById("editor") as HTMLElement,
      {
        value: this.props.code,
        language: this.props.language
      }
    )})
    console.log(this.state.editor)
  }

  closeEditor() {
    if (this.state.editor) {
      this.setState({editor: null});
      this.state.editor.dispose();
    }
  }

  render() {
    const { width, height } = this.props;
    const style = {
      width: width,
      height: height
    };
    return <div style={style} id="editor" />;
  }
}
