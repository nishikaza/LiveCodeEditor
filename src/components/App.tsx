import React from "react";
import {
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  Stack,
  Label,
  mergeStyleSets
} from "office-ui-fabric-react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
initializeIcons();

//import * as monacoEditor from "./Editor";

//import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import * as typescript from "typescript";
declare const ts: typeof typescript;
//const ts = require('monaco-editor/esm/vs/language/typescript/lib/typescriptServices.js');

//import * as worker from '../../editor/editor.worker.js';

const options: IDropdownOption[] = [
  { key: "12", text: "12" },
  { key: "14", text: "14" },
  { key: "16", text: "16" },
  { key: "18", text: "18" },
  { key: "20", text: "20" },
  { key: "22", text: "22" },
  { key: "24", text: "24" }
];

// const JScode = "";
// const fontSize = 18;
// const editorHidden = true;
// const error = undefined;
const initialCode = `const text: string = "hello world";
ReactDOM.render(<div>{text}</div>, document.getElementById('output'));`;


const monacoEditor1 = React.lazy(() =>
  import("./Editor")
);

const classNames = mergeStyleSets({
  code: {
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: "1.5"
  },
  renderSection: {
    backgroundColor: "red"
  },
  error: {
    backgroundColor: "#FEF0F0",
    color: "#FF5E79"
  },
  editor: {
    width: 800,
    height: 500
  }
});

interface IAppState {
  code: string;
  JScode: string;
  error?: string;
  options: IDropdownOption[];
  fontSize?: string;
  editorHidden?: boolean;
  editor: any;
  currentTime: number;
}

export class App extends React.Component {
  public state: IAppState = {
    code: "",
    JScode: "",
    options: options,
    editor: undefined,
    currentTime: 0
  };

  private timer: any;

  // private createEditor = () => {
  //   this.setState({
  //     editor: monaco.editor.create(
  //       document.getElementById("editor") as HTMLElement,
  //       {
  //         value: initialCode,
  //         language: "typescript"
  //       }
  //     )
  //   })
  // };

  private changeFontSize = (
    event: React.FormEvent,
    option: IDropdownOption | undefined,
    index: number | undefined
  ): void => {
    if (typeof index != "undefined") {
      this.setState({ fontSize: parseInt(options[index].key as string) });
    }
  };

  private buttonClicked = (): void => {
    import("./Editor").then(() => {
      this.setState({
        editor: monacoEditor.createEditor("")
      });
    });
    if (this.state.editor == undefined) {
      console.log(this.state.editor);
      this.setState({
        editor: monacoEditor.createEditor("")
      });
      console.log(this.state.editor);
    }
    if (this.state.editorHidden) {
      this.setState({
        editorHidden: false,
        editor: monacoEditor.createEditor("tsdfdsfdsfdsfdsfdsfdsfdsfsdfdsfdsfdsfdsfdsest")
      });
    } else {
      this.setState({
         editorHidden: true,
         editor: undefined
        });
    }
  };

  decrementTimeRemaining = () => {
    if (this.state.currentTime < 1) {
      this.setState({
        currentTime: this.state.currentTime + 1
      });
    } else {
      if (this.state.editor != undefined) {
        let editorText = this.state.editor.getValue();
        if (this.state.editor !== undefined) {
          if (editorText != this.state.code) {
            this.updateCodeTS(editorText);
          }
        }
        clearInterval(this.timer!);
        this.resetTimer();
      }
    }
  };

  private resetTimer = () => {
    this.setState({
      currentTime: 0
    });
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  };

  public componentDidMount() {
    this.resetTimer();
    //this.createEditor();
    this.updateCodeTS(initialCode);
  }

  public componentDidUpdate(prevProps: {}, prevState: IAppState) {
    if (prevState.code != this.state.code) {
      this._eval();
    }
  }

  private updateCodeTS = (code: string) => {
    try {
      console.log("made it");
      const compilerOptions = { module: ts.ModuleKind.None };
      const transpiled = ts.transpileModule(code, {
        compilerOptions: compilerOptions,
        moduleName: "myMod"
      });
      console.log("made itasdas");
      this.setState({
        code: code,
        JScode: transpiled,
        error: undefined
      });
      console.log(transpiled.outputText);
    } catch (ex) {
      this.setState({
        code: code,
        error: ex.message
      });
    }
  };

  private _eval = () => {
    try {
      eval(this.state.JScode);
      this.setState({ error: undefined });
    } catch (ex) {
      this.setState({ error: ex.message });
    }
  };

  render() {
    let dropdown = (
      <Stack horizontal padding={10} gap={10}>
        <Stack.Item>
          <Label>Select code font size:</Label>
        </Stack.Item>
        <Stack.Item>
          <Dropdown
            options={this.state.options}
            defaultSelectedKey="18"
            onChange={this.changeFontSize}
            styles={{ dropdown: { width: 100 } }}
          />
        </Stack.Item>
      </Stack>
    );
    let TSeditor = (
      <div>
        <div>
          <Label>Typescript + React editor</Label>
        </div>
        <div className={classNames.editor} id="editor" hidden = {this.state.editorHidden}/>
      </div>
    );

    let editor = (
      <Stack style={{ backgroundColor: "lightgray" }} gap={4}>
        <Stack.Item>{dropdown}</Stack.Item>
        <Stack.Item>{TSeditor}</Stack.Item>
        <Stack.Item>
          <div id="output" />
        </Stack.Item>
        <Stack.Item>
          {this.state.error !== undefined && (
            <Label className={classNames.error}>`{this.state.error}`</Label>
          )}
        </Stack.Item>
      </Stack>
    );

    return (
      <div>
        <PrimaryButton onClick={this.buttonClicked} />
        {/* {!this.state.editorHidden && editor} */}
        {editor}
      </div>
    );
  }
}
