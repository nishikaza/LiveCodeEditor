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
import "prismjs/themes/prism.css";
import * as babel from '@babel/core';
import LiveEditor from './Editor'
initializeIcons();

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
  plugins: ['proposal-class-properties', 'proposal-object-rest-spread', "transform-class-properties"],
  parserOpts: {
    strictMode: true
  }
}

const fontSize = 18;
const editorHidden = true;
const error = undefined;
const code = `import React from 'react';
import { css, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { getStyles, IButtonBasicExampleStyleProps, IButtonBasicExampleStyles } from './Button.Basic.Example.styles';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
const getClassNames = classNamesFunction<IButtonBasicExampleStyleProps, IButtonBasicExampleStyles>();
export class ButtonDefaultExample extends React.Component<IButtonProps, {}> {
  public render(): JSX.Element {
    const { disabled, checked } = this.props;
    const classNames = getClassNames(getStyles, {});
    return (
      <div className={css(classNames.twoup)}>
        <div>
          <Label>Standard</Label>
          <DefaultButton
            data-automation-id="test"
            allowDisabledFocus={true}
            disabled={disabled}
            checked={checked}
            text="Button"
            onClick={this._alertClicked}
          />
        </div>
        <div>
          <Label>Primary</Label>
          <PrimaryButton
            data-automation-id="test"
            disabled={disabled}
            checked={checked}
            text="Button"
            onClick={this._alertClicked}
            allowDisabledFocus={true}
          />
        </div>
      </div>
    );
  }
  private _alertClicked(): void {
    alert('Clicked');
  }
}`;

// interface IAppState {
//   error: string,
//   code: string,
//   options: IDropdownOption[],
//   fontSize: string,
//   editorHidden: boolean
// <{}, IAppState> }

export class App extends React.Component {
  state = { error, code, options, fontSize, editorHidden };

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

  private updateCode = (code: string) => {
    try{
      this.setState({
        code: babel.transform(code, babelOptions)!.code!,
        error: undefined
      })
    }catch(ex){
      this.setState({
        code: code,
        error: ex.message
      })
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
          <LiveEditor/>
          {/* <Editor
          hidden={this.state.editorHidden}
          value={this.state.code}
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
        /> */}
        </div>
    );
    let JSeditor = (
      <div>
        <Label>Javascript Code</Label>
        <Editor
          hidden={this.state.editorHidden}
          value={this.state.code}
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
        <PrimaryButton
            onClick={this.buttonClicked}
          />
        {!this.state.editorHidden && editor}
      </div>
    );
  }
}
