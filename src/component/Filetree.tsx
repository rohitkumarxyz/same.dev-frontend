import { useEffect, useState } from 'react';
import activeFile from '../store/atom/activeFile';
import { useAtom } from 'jotai';
import { getFileIcon } from '../data/fileIcons';
import { fileTreeData, type FileWithContent } from '../data/folderStucture';
import { codeSource } from '../store/atom/codeScource';
import { getSourceCode } from '../service/apiCalls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function TreeNode({
  node,
  level = 0,
  setActiveFile,
}: {
  node: FileWithContent;
  level?: number;
  setActiveFile: (file: FileWithContent) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isFolder = node.type === 'folder';

  return (
    <div className={`relative pl-3 ${level > 0 ? 'border-l border-gray-200' : ''}`}>
      <div
        className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer transition-colors duration-150 ${isFolder ? 'font-semibold' : ''} hover:bg-gray-100`}
        style={{ marginLeft: level * 8 }}
        onClick={
          isFolder
            ? () => setExpanded((e) => !e)
            // @ts-ignore
            : () => setActiveFile({ name: node.name, content: node.content ?? "", isBinary: node.isBinary })
        }
      >
        <span className="w-5 text-center">
          {getFileIcon(node.name, isFolder, expanded)}
        </span>
        <span className="truncate select-none">{node.name}</span>
      </div>
      {isFolder && expanded && node.children && (
        <div className="ml-2">
          {node.children.map((child) => (
            <TreeNode key={child.name} node={child} level={level + 1} setActiveFile={setActiveFile} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Filetree() {
  const [file, setFile] = useAtom(activeFile);
  const [source, setSource] = useAtom(codeSource);
  const navigate = useNavigate();

  useEffect(() => {
    const getSource = async () => {
      try {
        const projectId = window.location.pathname.split('/')[2];
        const response = await getSourceCode(projectId);
        if (response.data?.data) {
          setSource(response.data.data);
        } else {
          navigate("/");
        }
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || error?.message || "An unexpected error occurred";
        toast.error(errorMessage);
      }
    };

    if (source.length === 0) {
      getSource();
    }
  }, []);

  return (
    <div className="h-full rounded-lg shadow p-4 text-gray-500 font-sans w-full mx-auto ">
      {source.map((node) => (
        <TreeNode key={node.name} node={node} setActiveFile={setFile} />
      ))}
    </div>
  );
}
