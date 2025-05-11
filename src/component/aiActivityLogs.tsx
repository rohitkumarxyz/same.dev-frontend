import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Log = {
  id: number;
  message: string;
  timestamp: string;
};

interface AIActivityLogsProps {
  open: boolean;
  onClose: () => void;
  logs: Log[];
}

export default function AIActivityLogs({ open, onClose, logs }: AIActivityLogsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-[#111] border-l border-neutral-800 z-50 shadow-lg flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
            <h2 className="text-white text-lg font-semibold">AI Activity Logs</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition">
              <X size={20} />
            </button>
          </div>

          {/* Logs */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-4 text-sm text-gray-300 bg-[#0c0c0c]"
          >
            {logs.length === 0 ? (
              <div className="text-neutral-500 text-center mt-10">No activity yet...</div>
            ) : (
              logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-l-4 border-indigo-500 pl-3"
                >
                  <div className="text-sm text-white">{log.message}</div>
                  <div className="text-xs text-neutral-500 mt-1">{log.timestamp}</div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
