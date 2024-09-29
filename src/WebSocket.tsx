import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

interface WebSocketContextType {
    sendMessage: (message: string) => void;
    clientId: string | null;
    message: string | null;
    disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// WebSocket Provider Component
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clientId, setClientId] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const ws = useRef<WebSocket | null>(null);
    const reconnectInterval = useRef<number | null>(null);
    const [isReconnecting, setIsReconnecting] = useState(false);

    const messages = useMessages();

    const connectWebSocket = () => {
        ws.current = new WebSocket('ws://192.168.80.222:5007/ws');

        ws.current.onopen = () => {
            console.log('WebSocket connected');
            setIsReconnecting(false); // Reset reconnecting flag on successful connection
            clearInterval(reconnectInterval.current!); // Clear reconnect attempts
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('WebSocket message received:', data);

            if (data.ClientId) {
                setClientId(data.ClientId);
            }
        
            if (data.messages) {
                messages.setMessages(data.messages);
            }

            if (data) {
                console.log('Success:', data);
                setMessage(event.data);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
            if (!isReconnecting) {
                attemptReconnect(); // Attempt to reconnect if it wasn't intentional
            }
        };
    };

    const attemptReconnect = () => {
        setIsReconnecting(true);
        if (reconnectInterval.current) {
            clearInterval(reconnectInterval.current);
        }

        reconnectInterval.current = window.setInterval(() => { // Use window.setInterval
            console.log('Attempting to reconnect...');
            connectWebSocket();
        }, 3000); // Try to reconnect every 3 seconds
    };

    useEffect(() => {
        connectWebSocket(); // Initial connection on mount

        return () => {
            // Clean up and close WebSocket when the provider unmounts
            if (ws.current) {
                ws.current.close();
            }
            if (reconnectInterval.current) {
                clearInterval(reconnectInterval.current); // Clear reconnect interval on unmount
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
            setIsReconnecting(false); // Reset reconnecting flag
            if (reconnectInterval.current) {
                clearInterval(reconnectInterval.current); // Clear reconnect attempts
            }
        }
    };

    return (
        <WebSocketContext.Provider value={{ sendMessage, clientId, message, disconnect }}>
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