import React from 'react';
import { PrimaryButton, Stack, Label, mergeStyleSets } from 'office-ui-fabric-react';
import { ITextModel } from '../components/Editor.types';

interface ITranspiledOutput {
  outputString?: string;
  error?: string;
}

const classNames = mergeStyleSets({
  error: {
    backgroundColor: '#FEF0F0',
    color: '#FF5E79'
  },
  component: {
    backgroundColor: 'lightgray'
  }
});

interface IAppState {
  error?: string;
  editorHidden?: boolean;
  editor?: HTMLElement;
}

export class App extends React.Component {
  public state: IAppState = {
    editorHidden: true
  };

  public render() {
    const editor = (
      <Stack className={classNames.component} gap={4}>
        {this.state.editor}
        {this.state.error !== undefined && <Label className={classNames.error}>{this.state.error}</Label>}
      </Stack>
    );

    return (
      <div>
        <PrimaryButton onClick={this.buttonClicked} />
        {!this.state.editorHidden && editor}
        <div id="output" />
      </div>
    );
  }

  private onChange = (editor: ITextModel) => {
    require.ensure(['../transpiler/transpile'], require => {
      const { evalCode, transpile } = require('../transpiler/transpile');
      transpile(editor).then((output: ITranspiledOutput) => {
        if (output.outputString) {
          const evalCodeError = evalCode(output.outputString);
          if (evalCodeError) {
            this.setState({
              error: evalCodeError.error
            });
          } else {
            this.setState({
              error: undefined
            });
          }
        } else {
          this.setState({
            error: output.error
          });
        }
      });
    });
  };

  private buttonClicked = (): void => {
    if (this.state.editorHidden) {
      require.ensure([], require => {
        const Editor = require('../components/Editor').Editor;
        this.setState({
          editor: (
            <div>
              <div>
                <Label>Typescript + React editor</Label>
              </div>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Editor width={800} height={500} code={example} language="typescript" onChange={this.onChange} />
              </React.Suspense>
            </div>
          ),
          editorHidden: false
        });
      });
    } else {
      this.setState({ editor: null, editorHidden: true });
    }
  };
}


const example = `
import * as React from 'react';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 }
};

const options: IDropdownOption[] = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' }
];

const stackTokens: IStackTokens = { childrenGap: 20 };

export const DropdownBasicExample: React.StatelessComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <Dropdown placeholder="Select an option" label="Basic uncontrolled example" options={options} styles={dropdownStyles} />

      <Dropdown
        label="Disabled example with defaultSelectedKey"
        defaultSelectedKey="broccoli"
        options={options}
        disabled={true}
        styles={dropdownStyles}
      />

      <Dropdown
        placeholder="Select options"
        label="Multi-select uncontrolled example"
        defaultSelectedKeys={['apple', 'banana', 'grape']}
        multiSelect
        options={options}
        styles={dropdownStyles}
      />
    </Stack>
  );
};`;