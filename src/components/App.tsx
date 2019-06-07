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

const babel = require("@babel/standalone");

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
  filename: "fake.tsx",
  presets: ["typescript", "react", "es2015"],
  plugins: ["proposal-class-properties", "proposal-object-rest-spread"],
  parserOpts: {
    strictMode: true
  }
};

// const JScode = "";
// const fontSize = 18;
// const editorHidden = true;
// const error = undefined;
const TScode = `const text: string = "hello world";
ReactDOM.render(<div>{text}</div>, document.getElementById('output'));`;

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
  }
});

interface IAppState {
  code: string,
  JScode: string,
  error?: string,
  options: IDropdownOption[],
  fontSize?: string,
  editorHidden?: boolean,
}

export class App extends React.Component {
  public state: IAppState = {
    code: '',
    JScode: '',
    options: options,
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
    console.log("mount");
    this.updateCode(TScode);
  }

  public componentDidUpdate(prevProps: {}, prevState: IAppState) {
    console.log("update");
    if (prevState.code != this.state.code) {
      this.evaluateCode();
    }
  }

  private updateCode = (code: string) => {
    try {
      this.setState({
        code: code,
        JScode: babel.transform(code, babelOptions)!.code!,
        error: undefined
      });
    } catch (ex) {
      this.setState({
        code: code,
        error: ex.message
      });
    }
  };

  private _eval = () => {
    try{
      eval(this.state.JScode);
      this.setState({error: undefined});
    } catch (ex) {
      this.setState({error: ex.message})
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
        <Label>Typescript + React editor</Label>
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
        {!this.state.editorHidden && editor}
      </div>
    );


  }
}
