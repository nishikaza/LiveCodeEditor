import React from "react";
import {
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  Stack,
  Label,
} from "office-ui-fabric-react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
require("prismjs/components/prism-typescript");
import "./prism-modified.css";
initializeIcons();

const babel =  require('@babel/standalone');

const options: IDropdownOption[] = [
  { key: "12", text: "12" },
  { key: "14", text: "14" },
  { key: "16", text: "16" },
  { key: "18", text: "18" },
  { key: "20", text: "20" },
  { key: "22", text: "22" },
  { key: "24", text: "24" }
];

const babelOptions: babel.TransformOptions = {
  filename: 'fake.tsx',
  presets: ['typescript', 'react', 'es2015'],
  plugins: ['proposal-class-properties', 'proposal-object-rest-spread'],
  parserOpts: {
    strictMode: true
  }
}

const JScode = '';
const fontSize = 18;
const editorHidden = true;
const error = undefined;
const TScode =
`
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
const ExampleButton = () => <DefaultButton>Click</DefaultButton>
export default ExampleButton;`;

interface IAppState {
  code: string,
  error?: string,
  TScode: string,
  JScode: string,
  options?: IDropdownOption[],
  fontSize?: string,
  editorHidden?: boolean
}

export class App extends React.Component {

  public state: IAppState = {
    code: '',
    TScode: '',
    JScode: '',
    options: options
  }

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
    if (this.state.editorHidden == true) {
      this.setState({ editorHidden: false });
    } else {
      this.setState({ editorHidden: true });
    }
  };

  public componentDidMount() {
    this.updateCode(TScode);
  }

  public componentDidUpdate(prevProps: {}, prevState: IAppState) {
    if (prevState.code != this.state.code) {
      this.evaluateCode();
    }
  }

  // private returnEditor = (): Editor => {
  //   this.render() {
  //     <Editor
  //         hidden={this.state.editorHidden}
  //         value={this.state.TScode}
  //         onValueChange={code => this.updateCode(code)}
  //         highlight={code =>
  //           Prism.highlight(code, Prism.languages.typescript, "typescript")
  //         }
  //         style={{
  //           fontFamily: "Consolas",
  //           fontSize: this.state.fontSize,
  //           color: "black",
  //           background: "#F3F2F0",
  //         }}
  //       />
  //   }
  //       }

  private updateCode = (code: string) => {
    try{
      this.setState({
        TScode: code,
        JScode: babel.transform(code, babelOptions)!.code!,
        // code: transform(code, {plugins:["@babel/plugin-transform-runtime"]})!.code!,
        error: undefined
      })
      console.log("made it to update");
    }catch(ex){
      this.setState({
        TScode: TScode,
        error: ex.message
      })
    }
  }

  private evaluateCode() {
    try {
      console.log("made it to eval");
      eval(this.state.JScode);
      // console.log(eval(this.state.JScode));
      this.setState({error: undefined});
    } catch (ex) {
      this.setState({error: ex.message})
    }
  }

  render() {
    let dropdown = (
      <Stack horizontal padding={10} gap={10}>
        <Stack.Item>
          <Label>
            Select code font size:
          </Label>
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
          <Label>Typescript + React editor</Label>
          <Editor
          hidden={this.state.editorHidden}
          value={this.state.TScode}
          onValueChange={code => this.updateCode(code)}
          highlight={code =>
            Prism.highlight(code, Prism.languages.typescript, "typescript")
          }
          style={{
            fontFamily: "Consolas",
            fontSize: this.state.fontSize,
            color: "black",
            background: "#F3F2F0",
          }}
        />
        </div>
    );
    let JSeditor = (
      <div>
        <Label>Javascript Code</Label>
        <Editor
          hidden={this.state.editorHidden}
          value={this.state.JScode}
          onValueChange={code => code}
          highlight={code =>
            Prism.highlight(code, Prism.languages.typescript, "typescript")
          }
          style={{
            fontFamily: "Consolas",
            fontSize: this.state.fontSize,
            color: "black",
            background: "#F3F2F0"
          }}
        />
      </div>
  );

  let ExampleButton = (
    JScode
  );
  let editor = (
    <Stack  style={{backgroundColor:'lightgray'}} gap={4}>
      <Stack.Item >
        {dropdown}
      </Stack.Item>
      <Stack.Item>
        <Stack horizontal gap={40} padding={10}>
          <Stack.Item>{TSeditor}</Stack.Item>
          <Stack.Item>{JSeditor}</Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item>
        {this.state.error !== undefined && (<Label style={{backgroundColor: '#FEF0F0', color: '#FF5E79'}}>`{this.state.error}`</Label>)}
      </Stack.Item>
    </Stack>
  )

    return (
      <div>
        {/* <ExampleButton></ExampleButton> */}
        <PrimaryButton
            onClick={this.buttonClicked}
          />
        {!this.state.editorHidden && editor}
        <div id = "output"/>
      </div>

    );
  }
}
