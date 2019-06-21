import * as ts from 'typescript';
import { ITranspileOutput, IEvalCode } from './transpile.types';
// import * as typescriptServices from 'monaco-editor/esm/vs/language/typescript/lib/typescriptServices';
import * as monaco from 'monaco-editor';
import {TypeScriptWorker} from './monacoTypescriptWorker';

export function transpile(code: string): ITranspileOutput {
    let output: ITranspileOutput ={
        outputString: undefined,
        error: undefined
    };
    try{
        output.outputString =
        //     ts.transpile(code, )
            ts.transpileModule(code, {
            compilerOptions: {
                module: ts.ModuleKind.ES2015,
                alwaysStrict: true,
                jsxFactory: 'React.createElement',
                jsx: ts.JsxEmit.React,
            }
        }).outputText;
        return output
    }catch(ex){
        output.error = ex.message;
        return output;
    }
}

//const text: string = "hello world";
// ReactDOM.render(<div>{text}</div>, document.getElementById('output'));

export function setCompilerOptions(){
    const configuration: monaco.languages.LanguageConfiguration = {

    }
    monaco.languages.setLanguageConfiguration('typescript', configuration);
}

export function transpileTSW(code: string, model: any) {
    try{
        // console.log('dsf')
        monaco.languages.typescript.getTypeScriptWorker()
            .then(_worker=>{_worker(model)
                .then((worker: TypeScriptWorker)=>{
                    // console.log(worker.getEmitOutput());
                    worker.getEmitOutput(model.toString()).then((output: ts.EmitOutput) => console.log(output.outputFiles[0].text))
                    // debugger
                    // console.log(worker.getScriptFileNames())
            })})
    }catch(ex){
        console.log(ex)
    }
}

export function _evalCode(code: string): IEvalCode {
    let output: IEvalCode = {
        outputHTML: undefined,
        error: undefined
    };
    try{
        output.outputHTML = eval(code);
    }catch(ex){
        output.error = ex.message;
    }
    return output;
}