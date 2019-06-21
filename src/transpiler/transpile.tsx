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

export function transpileTSW(code: string, model: any): ITranspileOutput {
    let transpiledOutput: ITranspileOutput ={
        outputString: undefined,
        error: undefined
    };
    try{
        monaco.languages.typescript.getTypeScriptWorker()
            .then(_worker=>{_worker(model)
                .then((worker: TypeScriptWorker)=>{
                    worker.getEmitOutput(model.toString()).then((output: ts.EmitOutput) =>{ transpiledOutput.outputString =  output.outputFiles[0].text});
            })})
    }catch(ex){
        transpiledOutput.error = ex.message;
    }
    return transpiledOutput;
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