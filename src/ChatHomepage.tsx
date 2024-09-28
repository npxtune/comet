import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AppTheme from './AppTheme.tsx';
import SignIn from './SignIn.tsx';
import MuiCard from "@mui/material/Card";
import ColorModeSelect from "./ColorModeSelect.tsx";
import Stack from "@mui/material/Stack";
import {
    AppBar,
    Container,
    Drawer,
    Icon, List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {ChatBubble, Send} from "@mui/icons-material"; // Import the SignIn component


const ChatArea = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
}));

const ChatName = styled(Toolbar)(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
}));

const MessageInput = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
}));

const MessageList = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto',
    padding: theme.spacing(1),
}));

// const Message = styled(Typography)(({ children, theme }) => {
//
//     return (<Typography style="margin">{children}</Typography>);
// });

const Sidebar = styled(Box)(({ theme }) => ({
    width: '250px', // Fixed width for the sidebar
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
}));

const ChatContainer = styled(Stack)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function ChatHomePage() {
    const [messages, setMessages] = React.useState([
        { id: 1, text: 'Hello! How are you?' },
        { id: 2, text: 'I’m good, thanks! What about you?' },
    ]);
    const [newMessage, setNewMessage] = React.useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { id: messages.length + 1, text: newMessage }]);
            setNewMessage('');
        }
    };

    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: '10'}} />
            <ChatContainer>
                {/* Sidebar */}
                <Sidebar marginTop={2}>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                        Chats
                    </Typography>
                    <List>
                        <ListItem key="1" disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ChatBubble />
                                </ListItemIcon>
                                <ListItemText primary="Chat 1" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="2" disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ChatBubble />
                                </ListItemIcon>
                                <ListItemText primary="Chat 2" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="3" disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ChatBubble />
                                </ListItemIcon>
                                <ListItemText primary="Chat 3" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Sidebar>

                {/* Chat Area */}
                <ChatArea>
                    <AppBar position="static">
                        <ChatName>
                            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                Chat Room
                            </Typography>
                        </ChatName>
                    </AppBar>
                    {/*<MessageList>*/}
                    {/*   /!*{messages.map((msg) => (*!/*/}
                    {/*   /!*    <Message key={msg.id}>{msg.text}</Message>*!/*/}
                    {/*   /!*))}*!/*/}
                    {/*</MessageList>*/}
                    <MessageInput>
                        <TextField
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            variant="outlined" // Added variant for consistency
                            fullWidth
                        />
                        <Button variant="contained" onClick={handleSendMessage} sx={{ marginLeft: 1 }}>
                            <Send />
                        </Button>
                    </MessageInput>
                </ChatArea>
            </ChatContainer>
        </AppTheme>
    );
}
