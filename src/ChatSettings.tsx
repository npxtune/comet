import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import ColorModeSelect from "./ColorModeSelect.tsx";

interface ChatSettingsProps {
    open: boolean;
    handleClose: () => void;
}

export default function ChatSettings({open, handleClose}: ChatSettingsProps) {
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
            }}
        >
            <DialogTitle>Settings</DialogTitle>
            <DialogContent
                sx={{display: 'flex', flexDirection: 'column', gap: 2, width: '100%'}}
            >
                <DialogContentText>
                    Select your preferred Theme for the Application to use:
                </DialogContentText>
                <ColorModeSelect sx={{zIndex: '10'}}/>
            </DialogContent>
            <DialogActions sx={{pb: 3, px: 3}}>
                <Button variant={'outlined'} onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
