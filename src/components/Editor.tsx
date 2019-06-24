import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import React from 'react';
import { IEditorProps } from './Editor.types';

export class Editor extends React.Component<IEditorProps> {
  private editor: monaco.editor.IStandaloneCodeEditor;
  private editorRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.ES2015,
      jsx: monaco.languages.typescript.JsxEmit.React,
      alwaysStrict: true,
      jsxFactory: 'React.createElement',
      experimentalDecorators: true,
      preserveConstEnums: true,
      outDir: 'lib',
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      lib: ['es5', 'dom'],
    });
    this._createEditor();
  }

  public componentWillUnmount() {
    this._closeEditor();
  }

  public render() {
    const { width, height } = this.props;

    const style = {
      width: width,
      height: height
    };

    return <div style={style} ref={this.editorRef} />;
  }

  private _createEditor() {
    console.log('creating editor')
    this.editor = monaco.editor.create(this.editorRef.current!, {
      value: this.props.code,
      language: this.props.language
    });

    this.editor.onDidChangeModelContent(event => {
      this.props.onChange(this.editor.getModel().uri);
    });

    console.log(this.editor.getModel().uri)
  }

  private _closeEditor() {
    if (this.editor) {
      this.editor.dispose();
    }
  }
}
