export type FileNode = {
    name: string;
    projectName?: string;
    type: 'file' | 'folder';
    children?: FileWithContent[];
  };
  
  export type FileWithContent = FileNode & {
    content?: string;
    isBinary?: boolean;
  };
  
  export const fileTreeData: FileWithContent[] = [];