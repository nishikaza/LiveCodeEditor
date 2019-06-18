import * as ts from 'typescript';
import { ITranspileOutput } from './transpile.types';

export function transpile(code: string): ITranspileOutput{
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