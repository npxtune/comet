import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import {useWebSocket} from "./WebSocket.tsx";
import {Alert} from "@mui/material";

interface SignUpProps {
    open: boolean;
    handleClose: () => void;
    /*validateInput: () => boolean;*/
}

export default function SignUp({ open, handleClose/*, validateInput*/ }: SignUpProps) {

    const {sendMessage} = useWebSocket();
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

    const handleSignUp = (userinfo: string) => {
        console.log("Trying to SignUp: ", userinfo);

        // Prepare the SignUp message
        const message = '{"RegisterUserRequest":{' + userinfo + '}}';
        console.log('Sending message to WebSocket: ', message);

        // Send the login message via WebSocket
        sendMessage(message);

        setShowSuccessAlert(true);

        // WebSocket response is handled in the WebSocketContext
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const form = event.currentTarget.closest('form');
        if (form) {
            const data = new FormData(form);
            const username = data.get('email') as string;
            const password = data.get('password') as string;

            // Validate inputs before sending
            /*if (validateInput()) {*/
                console.log('Username: ', username, ' Password' , password);
                const userinfo = `"Username":"${username}","Password":"${password}","DisplayName":"${username}"`;
                handleSignUp(userinfo);
            //}
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleClose();
                },
                sx: { width: '30%' }
            }}
        >
            <DialogTitle>Sign Up</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
            >
                {showSuccessAlert && <Alert severity="success">You have successfully signed up!</Alert>}
                <DialogContentText>
                    Enter your account&apos;s email address.
                </DialogContentText>
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email address"
                    placeholder="Email address"
                    type="email"
                    fullWidth
                />
                <DialogContentText>
                    Password should contain at least 8 characters.
                </DialogContentText>
                <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={{ pb: 3, px: 3 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}  variant="contained" type="submit">
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}
