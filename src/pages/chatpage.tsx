import CodeMirrorEditor from "../component/codeEditor";
import type { EditorSettings, ScrollPosition } from "../component/codeEditor";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  type ImperativePanelHandle,
} from "react-resizable-panels";
import { classNames } from "../utils/classNames";
import { memo, useEffect, useState } from "react";
import Filetree from "../component/Filetree";
import { useAtom } from "jotai";
import activeFile from "../store/atom/activeFile";
import { fileTreeData } from "../data/folderStucture";
import { Icon } from "@iconify/react";
import { getFileIcon } from "../data/fileIcons";
import { codeSource } from "../store/atom/codeScource";

const editorSettings: EditorSettings = { tabSize: 2 };
export interface EditorDocument {
  value: string;
  isBinary: boolean;
  filePath: string;
  scroll?: ScrollPosition;
}

function onEditorScroll(position: ScrollPosition) {
  console.log("Editor scrolled to:", position);
}

function onEditorChange(update: { selection: any; content: string }) {
  console.log("Editor content changed:", update);
}

function onFileSave() {
  console.log("File saved!");
}

interface PanelHeaderProps {
  className?: string;
  children: React.ReactNode;
}
//Here is panel header
export const PanelHeader = memo(({ className, children }: PanelHeaderProps) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-2 bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary border-b border-bolt-elements-borderColor px-4 py-1 min-h-[34px] text-sm",
        className
      )}
    >
      {children}
    </div>
  );
});

export default function ChatPage() {
  const theme = "dark";
  const [doc, setDoc] = useAtom(activeFile);
  const [mode, setMode] = useState<'code' | 'preview'>('code');
  const [file, setFile] = useAtom(codeSource);

  useEffect(() => {
    if (!doc && file && file.length >= 0) {
      const firstFile = findFirstFile(file);
      if (firstFile) {
        setDoc({
          name: firstFile.name,
          content: firstFile.content ?? '',
          isBinary: firstFile.isBinary ?? false,
          type: firstFile.type,
        });
      }
    }
  }, [doc, setDoc, file]);

  const findFirstFile = (nodes: typeof fileTreeData): typeof fileTreeData[0] | null => {
    for (const node of nodes) {
      if (node.type === 'file') {
        return node;
      }
      if (node.children) {
        const found = findFirstFile(node.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const editorDoc = doc
    ? {
        value: doc.content ?? '',
        isBinary: doc.isBinary ?? false,
        filePath: doc.name,
      }
    : undefined;

  return (
    <div className="w-full max-h-screen flex flex-col bg-gray-500 text-white flex-1 min-h-0">
      <PanelGroup
        direction="horizontal"
        className="flex-1 w-full max-w-full min-h-0 items-stretch bg-gray-500"
      >
        <Panel
          defaultSize={20}
          minSize={13}
          className="hidden sm:flex flex-col bg-[#181C24] text-white min-w-[120px] max-w-[300px] h-full overflow-hidden border-r border-bolt-elements-borderColor"
        >
          <PanelHeader className="text-[#E0E6F0] bg-[#20232B]">Your Project</PanelHeader>
          <div className="flex-1 h-full min-h-[96vh] overflow-auto">
            <Filetree />
          </div>
        </Panel>
        <PanelResizeHandle className="hidden sm:block w-2 bg-bolt-elements-borderColor cursor-col-resize" />
        <Panel
          defaultSize={40}
          minSize={20}
          className="flex-1 flex flex-col overflow-hidden bg-[#23272E] h-full"
        >
          <PanelHeader className="text-[#F8F8F2] bg-[#282C34] flex justify-between items-center">
            <span className="flex items-center gap-2 font-medium text-base">
              {mode === 'preview' ? (
                <span className="truncate max-w-[180px] " title="Preview">Preview</span>
              ) : (
                <>
                  {doc?.name && getFileIcon(doc.name, false, false)}
                  <span className="truncate max-w-[180px]" title={doc?.name}>{doc?.name ?? <span className="italic text-gray-400">No file selected</span>}</span>
                </>
              )}
            </span>
            <span className="flex gap-2 ml-auto">
              <div className="relative flex items-center bg-[#23272E] rounded-full p-1 shadow-inner border border-[#353A45] transition-all duration-200" style={{ minWidth: 90 }}>
                <button
                  className={`relative z-10 flex items-center cursor-pointer justify-center w-10 h-8 rounded-full transition-colors duration-200 ${mode === 'code' ? 'text-[#23272E]' : 'text-[#A0A0A0] hover:text-[#FFD700]'}`}
                  onClick={() => setMode('code')}
                  title="Code view"
                  aria-label="Code view"
                >
                  <Icon icon="mdi:code-tags" width={24} height={24} />
                </button>
                <button
                  className={`relative z-10 flex items-center cursor-pointer justify-center w-10 h-8 rounded-full transition-colors duration-200 ${mode === 'preview' ? 'text-[#23272E]' : 'text-[#A0A0A0] hover:text-[#FFD700]'}`}
                  onClick={() => setMode('preview')}
                  title="Preview"
                  aria-label="Preview"
                >
                  <Icon icon="mdi:eye" width={24} height={24} />
                </button>
                <span
                  className="absolute top-1 left-1 w-10 h-8 rounded-full bg-[#FFD700] transition-transform duration-200"
                  style={{
                    transform: mode === 'code' ? 'translateX(0)' : 'translateX(40px)',
                    zIndex: 1,
                  }}
                />
              </div>
            </span>
          </PanelHeader>
          <div className="flex-1 min-h-0 overflow-auto">
            {mode === 'preview' ? (
              <div className="w-full h-full flex flex-col items-center justify-start p-0 m-0" style={{height: '100%', width: '100%'}}>
                <iframe
                  src="https://stocktutor.com"
                  title="Preview"
                  className="w-full h-screen min-h-[100vh] border-none"
                  style={{ flex: 1, width: '100%', height: '100%' }}
                  allowFullScreen
                />
              </div>
            ) : (
              <CodeMirrorEditor
                theme={theme}
                doc={!doc?.isBinary ? editorDoc : {isBinary: true, value: 'fd ', filePath: 'fd'}}
                editable={!doc?.isBinary}
                settings={editorSettings}
                onScroll={onEditorScroll}
                onChange={onEditorChange}
                onSave={onFileSave}
              />
            )}
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
