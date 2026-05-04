"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateAvailability } from "../actions";

interface AvailabilityToggleProps {
  initialStatus: boolean;
}

export default function AvailabilityToggle({ initialStatus }: AvailabilityToggleProps) {
  const [isAvailable, setIsAvailable] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (status: boolean) => {
    if (isPending) return;
    if (status === isAvailable) return;
    
    setIsAvailable(status);
    startTransition(async () => {
      const result = await updateAvailability(status);
      if (result.success) {
        toast.success(`SYSTEM_UPDATE: Availability set to ${status ? "AVAILABLE" : "BUSY"}`);
      } else {
        // Revert on failure
        setIsAvailable(!status);
        toast.error("DATABASE_ERROR: FAILED_TO_UPDATE_STATUS");
      }
    });
  };


  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4">Availability Status</p>
      <div className={`flex p-1 bg-white/5 border border-white/10 transition-opacity ${isPending ? 'opacity-50' : ''}`}>
        <button 
          onClick={() => handleToggle(true)}
          className={`flex-1 py-3 text-[10px] font-bold uppercase transition-all ${
            isAvailable ? "bg-white text-black" : "text-white opacity-30 hover:opacity-100"
          }`}
        >
          Available
        </button>
        <button 
          onClick={() => handleToggle(false)}
          className={`flex-1 py-3 text-[10px] font-bold uppercase transition-all ${
            !isAvailable ? "bg-white text-black" : "text-white opacity-30 hover:opacity-100"
          }`}
        >
          Busy
        </button>
      </div>
      <p className="mt-4 text-[9px] font-bold text-white/20 uppercase tracking-widest">
        {isAvailable ? "// Status: ACTIVE_HIRE" : "// Status: DO_NOT_DISTURB"}
      </p>
    </div>
  );
}
