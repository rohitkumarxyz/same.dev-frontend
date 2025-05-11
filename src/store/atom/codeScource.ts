import { atom } from "jotai";

export type FileNode = {
  name: string;
  type: 'file' | 'folder';
  children?: FileWithContent[];
};

export type FileWithContent = FileNode & {
  content?: string;
  isBinary?: boolean;
};

export const codeSource = atom<FileWithContent[]>([]);
