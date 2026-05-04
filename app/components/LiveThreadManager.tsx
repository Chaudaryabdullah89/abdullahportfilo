"use client";

import { useEffect } from "react";
import { useSocket } from "@/app/components/providers/SocketProvider";
import { useRouter } from "next/navigation";

export default function LiveThreadManager({ inquiryId }: { inquiryId?: string }) {
  const { socket } = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    socket.on("new-message", (data: { inquiryId: string }) => {
      // If we provided an ID, only refresh if it matches. 
      // If no ID provided (global), refresh everything (for admin dashboard).
      if (!inquiryId || data.inquiryId === inquiryId) {
        console.log("📨 [SOCKET_SIGNAL]: New protocol content detected. Syncing...");
        router.refresh();
      }
    });

    return () => {
      socket.off("new-message");
    };
  }, [socket, inquiryId, router]);

  return null;
}
