export interface IEditorProps {
  width: number;
  height: number;
  code: string;
  language: string;
  onChange: (editor: any) => void;
}
