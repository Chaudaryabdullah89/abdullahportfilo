"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      console.log("📡 [SOCKET_INIT]: Attempting connection to http://localhost:3005...");
      
      const socketInstance = new (ClientIO as any)("http://localhost:3005", {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
        timeout: 10000,
      });

      socketInstance.on("connect", () => {
        setIsConnected(true);
        console.log("🌐 [SOCKET_LIVE]: Connected to high-fidelity sync server at port 3005.");
      });

      socketInstance.on("connect_error", (error: any) => {
        console.error("❌ [SOCKET_ERROR]: Handshake failed. Details:", error.message);
      });

      socketInstance.on("disconnect", (reason: string) => {
        setIsConnected(false);
        console.log("⚠️ [SOCKET_OFFLINE]: Sync connection severed. Reason:", reason);
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
