import * as ts from 'typescript';
import { ITranspileOutput, IEvalCode } from './transpile.types';
// import * as typescriptServices from 'monaco-editor/esm/vs/language/typescript/lib/typescriptServices';
import * as monaco from 'monaco-editor';

export function transpile(code: string): ITranspileOutput {
    let output: ITranspileOutput ={
        outputString: undefined,
        error: undefined
    };
    try{
        output.outputString =
            ts.transpileModule(code, {
            compilerOptions: {
                module: ts.ModuleKind.ES2015
            }
        }).outputText;
        return output
    }catch(ex){
        output.error = ex.message;
        return output;
    }
}


export function transpileTSW(code: string, model: monaco.editor.ITextModel) {
    try{
        monaco.languages.typescript.getTypeScriptWorker()
            .then(_worker=>{_worker(model.uri)
                .then((worker:any)=>{

                console.log(worker)
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
        output.outputHTML = ex.message;
    }
    return output;
}