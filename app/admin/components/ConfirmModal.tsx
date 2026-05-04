"use client";

import React from "react";
import { AlertCircle, X, ShieldAlert } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  isDestructive?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Execute_Action",
  isDestructive = true,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-[450px] border-t-[8px] border-black shadow-2xl relative overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <ShieldAlert size={120} />
        </div>

        <div className="p-10 relative z-10">
           <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 flex items-center justify-center ${isDestructive ? "bg-red-500 text-white" : "bg-black text-white"}`}>
                 <AlertCircle size={24} />
              </div>
              <div>
                 <h3 className="font-black uppercase tracking-tighter text-xl leading-none">{title}</h3>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Protocol_Authorization_Required</p>
              </div>
           </div>

           <p className="text-sm font-medium leading-relaxed text-gray-600 mb-10 italic">
              // {message}
           </p>

           <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`w-full py-4 text-[11px] font-black uppercase tracking-widest transition-all shadow-[6px_6px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${
                  isDestructive ? "bg-red-600 text-white hover:bg-red-700" : "bg-[#4ec9b0] text-black hover:bg-[#3db89f]"
                }`}
              >
                {confirmLabel}
              </button>
              <button 
                onClick={onClose}
                className="w-full py-4 text-[11px] font-black uppercase tracking-widest bg-gray-100 text-gray-400 hover:bg-black hover:text-white transition-all underline decoration-dotted underline-offset-4"
              >
                Abort_Protocol
              </button>
           </div>
        </div>

        {/* Footer decoration */}
        <div className="bg-gray-50 p-4 border-t border-black/5 flex justify-center">
           <p className="text-[8px] font-bold text-gray-300 uppercase tracking-[0.4em]">SYSTEM_SECURITY_VERIFIED</p>
        </div>

      </div>
    </div>
  );
}
