import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import AppTheme from './AppTheme.tsx';
import ChatSettings from "./ChatSettings.tsx";
import WebSocket from '@tauri-apps/plugin-websocket';
import Stack from "@mui/material/Stack";
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
import {ChatBubble, Logout, Send, Settings} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const ChatArea = styled(Box)(({theme}) => ({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
}));

const MessageInput = styled(Box)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
}));

const MessageList = styled(Box)(({theme}) => ({
    flexGrow: 1,
    overflowY: 'auto',
    padding: theme.spacing(1),
}));

// const Message = styled(Typography)(({ children, theme }) => {
//
//     return (<Typography style="margin">{children}</Typography>);
// });

const Sidebar = styled(Box)(({theme}) => ({
    width: '250px', // Fixed width for the sidebar
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2)
}));

const SettingsButtonContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    marginTop: 'auto',
}));

const ChatContainer = styled(Stack)(({theme}) => ({
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
    // const [messages, setMessages] = React.useState([
    //     {id: 1, text: 'Hello! How are you?'},
    //     {id: 2, text: 'I’m good, thanks! What about you?'},
    // ]);
    const [newMessage, setNewMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    let ws: WebSocket;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogIn = async () => {
        console.log("Trying to log-in...");
        ws = await WebSocket.connect('ws://192.168.80.222:5007/ws');

        ws.addListener((msg) => {
            console.log('Received Message:', msg);
        });

        // Step 3: Send a message to the server
        await ws.send('{"UserLoginRequest": {"username": "xy", "password": "yz"}}');
    };

    const handleLogOut = () => {
        console.log("Disconnecting client...");
        if (ws != null) {
            ws.disconnect();
        }
        navigate('/', {replace: true});
    };

    // const handleSendMessage = () => {
    //     if (newMessage.trim()) {
    //         setMessages([...messages, {id: messages.length + 1, text: newMessage}]);
    //         setNewMessage('');
    //     }
    // };

    return (
        <AppTheme>
            <CssBaseline enableColorScheme/>
            <ChatContainer>
                {/* Sidebar */}
                <Sidebar marginTop={2}>
                    <Typography variant="h6" component="div" sx={{mb: 2}}>
                        Chats
                    </Typography>
                    <List>
                        <ListItem key="1" disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ChatBubble/>
                                </ListItemIcon>
                                <ListItemText primary="Chat 1"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="2" disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ChatBubble/>
                                </ListItemIcon>
                                <ListItemText primary="Chat 2"/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="3" disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ChatBubble/>
                                </ListItemIcon>
                                <ListItemText primary="Chat 3"/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <SettingsButtonContainer>
                        <Button variant="outlined" sx={{marginLeft: 1}} onClick={handleClickOpen}>
                            <Settings/>
                        </Button>
                        <ChatSettings open={open} handleClose={handleClose}/>
                        <Box sx={{marginLeft: 2, marginRight: 2}}/>
                        <Button variant="outlined" sx={{marginLeft: 1, color: 'red'}} onClick={handleLogOut}>
                            <Logout/>
                        </Button>
                    </SettingsButtonContainer>
                </Sidebar>

                {/* Chat Area */}
                <ChatArea>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div"
                                        sx={{flexGrow: 1, color: (theme) => theme.palette.text.primary}}>
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
                            placeholder="Type your message..."
                            variant="outlined" // Added variant for consistency
                            fullWidth
                        />
                        <Button variant="contained" onClick={handleLogIn} sx={{marginLeft: 1}}>
                            <Send/>
                        </Button>
                    </MessageInput>
                </ChatArea>
            </ChatContainer>
        </AppTheme>
    );
}
