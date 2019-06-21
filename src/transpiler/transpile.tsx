import { ITranspileOutput, IEvalCode } from './transpile.types';
import * as monaco from 'monaco-editor';
import { TypeScriptWorker, EmitOutput } from './monacoTypescriptWorker';

export function transpileTSW(model: any): ITranspileOutput {
    let transpiledOutput: ITranspileOutput ={
        outputString: undefined,
        error: undefined
    };
    try{
        monaco.languages.typescript.getTypeScriptWorker()
            .then(_worker=>{_worker(model)
                .then((worker: TypeScriptWorker)=>{ worker.getEmitOutput(model.toString())
                    .then((output: EmitOutput) =>{
                        transpiledOutput.outputString = output.outputFiles[0].text;
                    });
                });
            });
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