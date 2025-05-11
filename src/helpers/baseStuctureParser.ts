import type { FileWithContent } from "../data/folderStucture";

export function parseBoltArtifact(input: string) {
    const fileTree: FileWithContent[] = [];
  
    const actionRegex = /<boltAction type="file" filePath="([^"]+)">([\s\S]*?)<\/boltAction>/g;
    let match;
  
    function addToTree(tree: FileWithContent[], filePath: string, content: string) {
      const parts = filePath.split('/');
      let current = tree;
  
      parts.forEach((part: string, index: number) => {
        const existing = current.find((node) => node.name === part);
  
        if (index === parts.length - 1) {
          if (!existing) {
            current.push({
              name: part,
              type: 'file',
              isBinary: false,
              content,
            });
          }
        } else {
          if (!existing) {
            const folder = {
              name: part,
              type: 'folder',
              children: [],
            };
            current.push(folder as FileWithContent);
            current = folder.children as FileWithContent[];
          } else {
            current = existing.children as FileWithContent[];
          }
        }
      });
    }
  
    while ((match = actionRegex.exec(input))) {
      const [, filePath, content] = match;
      addToTree(fileTree, filePath, content);
    }
  
    return fileTree;
  }
  