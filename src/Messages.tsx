import React, { createContext, useContext, useState } from 'react';

export interface MessageModel {
    Id: number;
    Timestamp: number;
    RoomId: number;
    SenderId: number;
    Text: String;
}

interface MessageContextType {
    messages: MessageModel[];
    setMessages: (messages: MessageModel[]) => void;
    // fetchMessages: () => Promise<void>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<MessageModel[]>([]);
    // const { sendMessage } = useWebSocket();
    // const fetchMessages = async () => {};
    //
    // useEffect(() => {
    //     fetchMessages();
    // }, []);

    return (
        <MessageContext.Provider value={{ messages, setMessages }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessages = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessages must be used within a MessageProvider');
    }
    return context;
};