import { atom } from 'jotai'
import type { FileWithContent } from '../../data/folderStucture'



const activeFile = atom<FileWithContent|null>(null)

export default activeFile
