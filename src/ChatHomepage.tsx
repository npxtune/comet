import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import AppTheme from './AppTheme.tsx';
import ChatSettings from "./ChatSettings.tsx";
import Stack from "@mui/material/Stack";
import { useWebSocket } from './WebSocket.tsx'; // Make sure this is set up correctly
import {
    AppBar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChatBubble, Logout, Send, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ChatArea = styled(Box)(({ theme }) => ({
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

const Sidebar = styled(Box)(({ theme }) => ({
    width: '250px',
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
}));

const SettingsButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    marginTop: 'auto',
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
    const [newMessage, setNewMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    // Assuming useWebSocket returns a sendMessage function and is connected
    const { sendMessage } = useWebSocket();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogOut = () => {
        console.log("Disconnecting client...");
        navigate('/', { replace: true });
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            sendMessage(newMessage);  // Send the message using the WebSocket
            setNewMessage('');  // Clear the input after sending
        }
    };

    return (
        <AppTheme>
            <CssBaseline enableColorScheme />
            <ChatContainer>
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
                        {/* Add more chats as needed */}
                    </List>
                    <SettingsButtonContainer>
                        <Button variant="outlined" sx={{ marginLeft: 1 }} onClick={handleClickOpen}>
                            <Settings />
                        </Button>
                        <ChatSettings open={open} handleClose={handleClose} />
                        <Box sx={{ marginLeft: 2, marginRight: 2 }} />
                        <Button variant="outlined" sx={{ marginLeft: 1, color: 'red' }} onClick={handleLogOut}>
                            <Logout />
                        </Button>
                    </SettingsButtonContainer>
                </Sidebar>

                <ChatArea>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: (theme) => theme.palette.text.primary }}>
                                Chat Room
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <MessageList>
                        <Typography>
                            Hello, World! :)
                        </Typography>
                    </MessageList>
                    <MessageInput>
                        <TextField
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.defaultPrevented)  return;
                                if (e.key === "Enter"){
                                    handleSendMessage();
                                    e.preventDefault();
                                }
                            }}
                            placeholder="Type your message..."
                            variant="outlined"
                            fullWidth
                        />
                        <Button variant="contained" sx={{ marginLeft: 1 }} onClick={handleSendMessage}>
                            <Send />
                        </Button>
                    </MessageInput>
                </ChatArea>
            </ChatContainer>
        </AppTheme>
    );
}
