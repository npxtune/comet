// WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

// Define types for WebSocket context
interface WebSocketContextType {
    sendMessage: (message: string) => void;
    clientId: string | null;
    disconnect: () => void;
}

// Create the WebSocket context
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// WebSocket Provider Component
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clientId, setClientId] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Open WebSocket connection on mount
        ws.current = new WebSocket('wss://thouchat.langrock.info/ws');

        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('WebSocket message received:', data);

            if (data.ClientId) {
                setClientId(data.ClientId); // Assuming clientId is sent from the server
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            // Clean up and close WebSocket when the provider unmounts
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const sendMessage = (message: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        } else {
            console.error('WebSocket is not open');
        }
    };

    const disconnect = () => {
        if (ws.current) {
            ws.current.close();
            ws.current = null;
            console.log('WebSocket disconnected');
        }
    };

    return (
        <WebSocketContext.Provider value={{ sendMessage, clientId, disconnect }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to use the WebSocketContext
export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
