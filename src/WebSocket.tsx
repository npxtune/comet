// WebSocketContext.tsx
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import WebSocket from '@tauri-apps/plugin-websocket';

interface WebSocketContextProps {
    ws: WebSocket | null;
    sendMessage: (message: string) => void;
    loginError: boolean;
    loginErrorMsg: string;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState('');
    const wsRef = useRef<WebSocket | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const setupWebSocket = async () => {
            try {
                const websocket = await WebSocket.connect('ws://192.168.80.222:5007/ws');
                wsRef.current = websocket;
                setWs(websocket);

                websocket.addListener((msg) => {
                    console.log('Received WebSocket Message:', msg);
                    try {
                        const parsedData = JSON.parse(msg.data as string);

                        if (parsedData.Success === false) {
                            console.log('Login was not successful');
                            setLoginError(true);
                            setLoginErrorMsg('Could not log in.');
                        } else {
                            console.log('Login was successful');
                            setLoginError(false);
                            setLoginErrorMsg('');
                            navigate('/chat', { replace: true });
                        }
                    } catch (error) {
                        console.error('Failed to parse JSON message:', error);
                    }
                });
            } catch (error) {
                console.error('WebSocket Error:', error);
            }
        };

        setupWebSocket();

        return () => {
            // Do not disconnect here if you want the connection to persist.
            // wsRef.current?.disconnect();
        };
    }, [navigate]);

    const sendMessage = async (message: string) => {
        if (wsRef.current) {
            await wsRef.current.send(message);
        } else {
            console.error('WebSocket is not connected');
        }
    };

    return (
        <WebSocketContext.Provider value={{ ws, sendMessage, loginError, loginErrorMsg }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextProps => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
