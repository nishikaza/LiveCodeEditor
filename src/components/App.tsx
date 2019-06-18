import React from "react";
import {
  PrimaryButton,
  Stack,
  Label,
  mergeStyleSets
} from "office-ui-fabric-react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
initializeIcons();
// import { ITranspileOutput } from '../transpiler/transpile.types';

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
  fontSize?: string;
  editorHidden?: boolean;
  editor: any;
  currentTime: number;
}

export class App extends React.Component {
  public state: IAppState = {
    code: "",
    JScode: "",
    editor: undefined,
    currentTime: 0,
    editorHidden: true
  };

  // private timer: any;

  private buttonClicked = (): void => {
    if (this.state.editorHidden) {
      import("./Editor").then((editor) => {
        this.setState({
          editor: (
            <div>
              <div>
                <Label>Typescript + React editor</Label>
              </div>
              <React.Suspense fallback={<div>Loading...</div>}>
              <editor.Editor
                width = {800}
                height = {500}
                code = ''
                language = "typescript"
              />
              </React.Suspense>
            </div>
          ),
          editorHidden: false
        })
      });
    } else {
      this.setState({editor: null, editorHidden: true})
    }
  }

  public componentDidMount() {
  }

  public componentDidUpdate(prevProps: {}, prevState: IAppState) {
  }

  // private updateCodeTS = (code: string) => {
  //   let transpiled: ITranspileOutput = {
  //     outputString: undefined,
  //     error:undefined
  //   };
  //   import('../transpiler/transpile').then((transpiler) => {
  //     transpiled = transpiler.transpile(code)
  //   });
  //   if(transpiled !== undefined){
  //     if(transpiled.outputString){
  //       this.setState({
  //         code: code,
  //         JScode: transpiled.outputString,
  //         error: undefined
  //       });
  //     }
  //     else{
  //       this.setState({
  //         code: code,
  //         error: transpiled.error
  //       });
  //     }
  //   }else{
  //     console.log('error: unable to load transpiler')
  //   }
  // };

  // private _eval = () => {
  //   try {
  //     eval(this.state.JScode);
  //     this.setState({ error: undefined });
  //   } catch (ex) {
  //     this.setState({ error: ex.message });
  //   }
  // };

  render() {

    let editor = (
      <Stack style={{ backgroundColor: "lightgray" }} gap={4}>
        <Stack.Item>{!this.state.editorHidden && this.state.editor}</Stack.Item>
        <Stack.Item>
          {this.state.error !== undefined && (
            <Label className={classNames.error}>`{this.state.error}`</Label>
          )}
        </Stack.Item>
      </Stack>
    );

    return (
      <div>
        {<PrimaryButton onClick={this.buttonClicked} />}
        {!this.state.editorHidden && editor}
      </div>
    );
  }
}
