import React from 'react';
import { DefaultButton, Stack, Text, Link, FontWeights, PrimaryButton } from 'office-ui-fabric-react';
import Editor from 'react-simple-code-editor';
const boldStyle = { root: { fontWeight: FontWeights.semibold } };
//const prismLang = require('prismjs/components/prism-typescript');
const prismHighlight = require('prismjs').highlight
const code =
`import React from 'react';
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


export class App extends React.Component{
  state = { code};
  render() {
    return(
      <Editor
      value = { code }
      onValueChange = {code => this.setState({code})}
      highlight = {prismHighlight}
      ></Editor>
    )
  }
}

// export const App: React.FunctionComponent = () => {
//   let state = { code };

//   return (
//     <Editor
//       value = { code }
//       onValueChange = {code => this.setState({code})}
//       highlight = prismHighlight
//       ></Editor>

//     // <Stack
//     //   horizontalAlign="center"
//     //   verticalAlign="center"
//     //   verticalFill
//     //   styles={{
//     //     root: {
//     //       width: '960px',
//     //       margin: '0 auto',
//     //       textAlign: 'center',
//     //       color: '#605e5c'
//     //     }
//     //   }}
//     //   gap={15}
//     // >
//     //   <img src={logo} alt="logo" />
//     //   <Text variant="xxLarge" styles={boldStyle}>
//     //     Welcome to Your UI Fabric App
//     //   </Text>
//     //   <Text variant="large">For a guide on how to customize this project, check out the UI Fabric documentation.</Text>
//     //   <Text variant="large" styles={boldStyle}>
//     //     Essential Links
//     //   </Text>
//     //   <Stack horizontal gap={15} horizontalAlign="center">
//     //     <Link href="https://developer.microsoft.com/en-us/fabric">Docs</Link>
//     //     <Link href="https://stackoverflow.com/questions/tagged/office-ui-fabric">Stack Overflow</Link>
//     //     <Link href="https://github.com/officeDev/office-ui-fabric-react/">Github</Link>
//     //     <Link href="https://twitter.com/officeuifabric">Twitter</Link>
//     //   </Stack>
//     //   <Text variant="large" styles={boldStyle}>
//     //     Design System
//     //   </Text>
//     //   <Stack horizontal gap={15} horizontalAlign="center">
//     //     <Link href="https://developer.microsoft.com/en-us/fabric#/styles/icons">Icons</Link>
//     //     <Link href="https://developer.microsoft.com/en-us/fabric#/styles/typography">Typography</Link>
//     //     <Link href="https://developer.microsoft.com/en-us/fabric#/styles/themegenerator">Theme</Link>
//     //   </Stack>
//     // </Stack>

//   );
// };
