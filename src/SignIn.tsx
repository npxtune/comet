import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import AppTheme from './AppTheme.tsx';
import ColorModeSelect from './ColorModeSelect.tsx';
import {useWebSocket} from './WebSocket.tsx';
import {Mail} from "@mui/icons-material";
import SignUp from "./SignUp.tsx";

const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),  // Reduce padding on small screens
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));


const SignInContainer = styled(Stack)(({theme}) => ({
    padding: '20px',
    minHeight: '100vh',
    height: '100%',
    justifyContent: 'center',
    overflowY: 'auto',
    position: 'relative',
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

export default function SignIn(props: { disableCustomTheme?: boolean }) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [loginError] = React.useState(false);
    const [loginErrorMsg] = React.useState('');
    const [openForPas, setOpenForPas] = React.useState(false);
    const [openSignUp, setSignUp] = React.useState(false);

    const {sendMessage} = useWebSocket();

    const handleClickOpen = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        setOpen(true);
    };

    const handleClose = (setClosed: React.Dispatch<React.SetStateAction<boolean>>) => {
        setClosed(false);
    };

    const handleLogIn = (userinfo: string) => {
        console.log("Trying to log-in: ", userinfo);

        // Prepare the login message
        const message = '{"UserLoginRequest":{' + userinfo + '}}';
        console.log('Sending message to WebSocket: ', message);

        // Send the login message via WebSocket
        sendMessage(message);

        // WebSocket response is handled in the WebSocketContext
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username') as string;
        const password = data.get('password') as string;

        // Validate inputs before sending
        if (validateInputs()) {
            const userinfo = `"Username":"${username}","Password":"${password}"`;
            handleLogIn(userinfo);
        }
    };

    const validateInputs = () => {
        const username = document.getElementById('username') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        let isValid = true;

        if (!username.value) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid username.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme/>
            <SignInContainer direction="column" justifyContent="space-between">
                <ColorModeSelect sx={{position: 'fixed', top: '1rem', right: '1rem'}}/>
                <Card variant="outlined">
                    <Typography>CHAT APP DING</Typography>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="username"
                                type="username"
                                name="username"
                                placeholder=""
                                autoComplete="username"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                                sx={{ariaLabel: 'username'}}
                            />
                        </FormControl>
                        <FormControl>
                            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Link
                                    component="button"
                                    onClick={() => handleClickOpen(setOpenForPas)}
                                    variant="body2"
                                    sx={{alignSelf: 'baseline'}}
                                >
                                    Forgot your password?
                                </Link>
                            </Box>
                            <TextField
                                error={passwordError || loginError}
                                helperText={passwordErrorMessage || loginErrorMsg}
                                name="password"
                                placeholder="••••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError || loginError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <ForgotPassword open={openForPas} handleClose={() => handleClose(setOpenForPas)}/>
                        <SignUp open={openSignUp} /*validateInput={validateInputs}*/ handleClose={() => handleClose(setSignUp)}/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={validateInputs}
                        >
                            Sign in
                        </Button>
                        <Typography sx={{textAlign: 'center'}}>
                            Don&apos;t have an account?{' '}
                            <span>
                                <Link
                                    component="button"
                                    onClick={() => handleClickOpen(setSignUp)}
                                    variant="body2"
                                    sx={{alignSelf: 'baseline'}}
                                >
                                    Sign Up
                                </Link>
              </span>
                        </Typography>
                    </Box>
                    <Divider>or</Divider>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign in with E-Mail')}
                            startIcon={<Mail/>}
                        >
                            Sign in with E-Mail
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}
