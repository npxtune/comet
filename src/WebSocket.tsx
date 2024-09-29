import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

interface WebSocketContextType {
    sendMessage: (message: string) => void;
    clientId: string | null;
    message: string | null;
    disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clientId, setClientId] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket('wss://thouchat.langrock.info/ws');

        ws.current.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('WebSocket message received:', data);

            if (data.ClientId) {
                setClientId(data.ClientId);
            }

            if (data) {
                console.log('Success:', data);
                setMessage(event.data);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
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
        <WebSocketContext.Provider value={{ sendMessage, clientId, message, disconnect }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};