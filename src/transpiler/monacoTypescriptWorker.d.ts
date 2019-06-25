import * as ts from 'typescript';
import * as monaco from 'monaco-editor';
import IWorkerContext = monaco.worker.IWorkerContext;
export interface IExtraLib {
    content: string;
    version: number;
}
export interface IExtraLibs {
    [path: string]: IExtraLib;
}
export declare class TypeScriptWorker implements ts.LanguageServiceHost {
    private _ctx;
    private _extraLibs;
    private _languageService;
    private _compilerOptions;
    constructor(ctx: IWorkerContext, createData: ICreateData);
    getCompilationSettings(): ts.CompilerOptions;
    getScriptFileNames(): string[];
    private _getModel;
    getScriptVersion(fileName: string): string;
    getScriptSnapshot(fileName: string): ts.IScriptSnapshot;
    getScriptKind?(fileName: string): ts.ScriptKind;
    getCurrentDirectory(): string;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
    isDefaultLibFileName(fileName: string): boolean;
    private static clearFiles;
    getSyntacticDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
    getSemanticDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
    getCompilerOptionsDiagnostics(fileName: string): Promise<ts.Diagnostic[]>;
    getCompletionsAtPosition(fileName: string, position: number): Promise<ts.CompletionInfo>;
    getCompletionEntryDetails(fileName: string, position: number, entry: string): Promise<ts.CompletionEntryDetails>;
    getSignatureHelpItems(fileName: string, position: number): Promise<ts.SignatureHelpItems>;
    getQuickInfoAtPosition(fileName: string, position: number): Promise<ts.QuickInfo>;
    getOccurrencesAtPosition(fileName: string, position: number): Promise<ReadonlyArray<ts.ReferenceEntry>>;
    getDefinitionAtPosition(fileName: string, position: number): Promise<ReadonlyArray<ts.DefinitionInfo>>;
    getReferencesAtPosition(fileName: string, position: number): Promise<ts.ReferenceEntry[]>;
    getNavigationBarItems(fileName: string): Promise<ts.NavigationBarItem[]>;
    getFormattingEditsForDocument(fileName: string, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
    getFormattingEditsForRange(fileName: string, start: number, end: number, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
    getFormatEditsAfterKeystroke(fileName: string, postion: number, ch: string, options: ts.FormatCodeOptions): Promise<ts.TextChange[]>;
    getEmitOutput(fileName: string): Promise<ts.EmitOutput>;
    updateExtraLibs(extraLibs: IExtraLibs): void;
}
export interface ICreateData {
    compilerOptions: ts.CompilerOptions;
    extraLibs: IExtraLibs;
}
export declare function create(ctx: IWorkerContext, createData: ICreateData): TypeScriptWorker;

export interface EmitOutput {
    outputFiles: OutputFile[];
    emitSkipped: boolean;
}
interface OutputFile {
    name: string;
    writeByteOrderMark: boolean;
    text: string;
}