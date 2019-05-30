import React from "react";
import { Dropdown, IDropdownOption, PrimaryButton } from "office-ui-fabric-react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
require("prismjs/components/prism-typescript");
import "prismjs/themes/prism-tomorrow.css";
initializeIcons();

const options: IDropdownOption[] = [
  { key: "12", text: "12" },
  { key: "14", text: "14" },
  { key: "16", text: "16" },
  { key: "18", text: "18" },
  { key: "20", text: "20" },
  { key: "22", text: "22" },
  { key: "24", text: "24" },
];

const fontSize = 14;
const editorHidden = true;
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

export class App extends React.Component {
  state = { code, options, fontSize, editorHidden };

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
      this.setState({editorHidden: false})
    } else {
      this.setState({editorHidden: true})
    }
  }

  render() {
    return (
      <div>
        <PrimaryButton
          text = "Edit component code"
          onClick = {this.buttonClicked}
        />
        <Editor
          hidden = {this.state.editorHidden}
          value={this.state.code}
          onValueChange={code => this.setState({ code })}
          highlight={code =>
            Prism.highlight(code, Prism.languages.typescript, "typescript")
          }
          style={{
            fontFamily: "Consolas",
            fontSize: this.state.fontSize,
            color: "white",
            background: "Black"
          }}
        />
        <Dropdown
          hidden = {this.state.editorHidden}
          label = "Select code font size:"
          options={this.state.options}
          defaultSelectedKey="14"
          onChange={this.changeFontSize}
          styles={{ dropdown: { width: 100 } }}
        />
      </div>
    );
  }
}
