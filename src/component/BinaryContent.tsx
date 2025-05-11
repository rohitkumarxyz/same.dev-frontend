import { Icon } from '@iconify/react';

export function BinaryContent() {
  return (
    <div className="flex flex-col items-center justify-center absolute inset-0 z-10 text-sm bg-tk-elements-app-backgroundColor text-tk-elements-app-textColor">
      <Icon icon="mdi:file-image-outline" width={48} height={48} className="mb-2 opacity-60" />
      <div className="font-medium opacity-80">File format cannot be displayed.</div>
    </div>
  );
}
  