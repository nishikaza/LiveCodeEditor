export interface IEditorProps{
  width: number,
  height: number,
	initialCode?: string,
	code: string,
  language: string,
  onChange: () => string,
}