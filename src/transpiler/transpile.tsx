import * as monaco from 'monaco-editor';
import { ITranspiledOutput, IEvalCode } from './transpile.types';
import { TypeScriptWorker, EmitOutput } from './monacoTypescriptWorker';

export function transpileTSW(model: any): Promise<ITranspiledOutput> {
    const ret = new Promise<ITranspiledOutput>((resolve) => {
    monaco.languages.typescript.getTypeScriptWorker()
        .then(_worker=>{_worker(model)
            .then((worker: TypeScriptWorker)=>{ worker.getEmitOutput(model.toString())
                .then((output: EmitOutput) =>{
                    let transpiledOutput: ITranspiledOutput = { error: undefined, outputString: undefined};
                    if(output.outputFiles[0]){
                        transpiledOutput.outputString = output.outputFiles[0].text;
                    }else{
                        transpiledOutput.error = 'Could not transpile code';
                    }
                    resolve(transpiledOutput);
                });
            });
        });
    });
    return ret;
}

export function _evalCode(code: string): IEvalCode {
    let output: IEvalCode = {
        eval: undefined,
        error: undefined
    };
    try{
        output.eval = eval(code);
    }catch(ex){
        output.error = ex.message;
    }
    return output;
}