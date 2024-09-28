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
import {GoogleIcon, FacebookIcon, SitemarkIcon} from './CustomIcons';
import AppTheme from './AppTheme.tsx';
import ColorModeSelect from './ColorModeSelect.tsx';
import {useNavigate} from "react-router-dom";
import WebSocket from "@tauri-apps/plugin-websocket";

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
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({theme}) => ({
    padding: 20,
    marginTop: '10vh',
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
    const [loginError, setLoginError] = React.useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    let ws: WebSocket;


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
        let username = data.get('username');
        let password = data.get('password');

        let userinfo: string = '"username":"' + username + '","password":"' + password + '"';
        handleLogIn(userinfo);
    };

    const handleLogIn = async (userinfo: string) => {
        console.log("Trying to log-in: ", userinfo);
        ws = await WebSocket.connect('ws://192.168.80.222:5007/ws');

        ws.addListener((msg) => {
            console.log('Received Message:', msg);
            try {
                // Parse the JSON string received
                const parsedData = JSON.parse(msg.data as string);

                // Check if the login was not successful
                if (parsedData.Success === false) {
                    console.log('Login was not successful');
                    setLoginError(true);
                    setLoginErrorMsg('Could not log in.');
                } else {
                    console.log('Login was successful');
                    setLoginError(false);
                    setLoginErrorMsg('');
                }
            } catch (error) {
                console.error('Failed to parse JSON message:', error);
            }
        });

        // Step 3: Send a message to the server
        let message = '{"UserLoginRequest":{' + userinfo + '}}';
        console.log(message);
        await ws.send(message);
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

        if (!password.value || password.value.length < 6) {
          setPasswordError(true);
          setPasswordErrorMessage('Password must be at least 6 characters long.');
          isValid = false;
        } else {
          setPasswordError(false);
          setPasswordErrorMessage('');
        }

        // if (isValid) {
        //     navigate('/chat', {replace: true});
        // }
        // navigate('/chat', {replace: true});
        return true;
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
                                    onClick={handleClickOpen}
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
                                placeholder="••••••"
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
                        <ForgotPassword open={open} handleClose={handleClose}/>
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
                    href="https://youtu.be/dQw4w9WgXcQ?si=MkHsvnqKIsMOV6KG"
                    variant="body2"
                    sx={{alignSelf: 'center'}}
                >
                  Sign up
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
                            onClick={() => alert('Sign in with Google')}
                            startIcon={<GoogleIcon/>}
                        >
                            Sign in with Google
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            onClick={() => alert('Sign in with Facebook')}
                            startIcon={<FacebookIcon/>}
                        >
                            Sign in with Facebook
                        </Button>
                    </Box>
                </Card>
            </SignInContainer>
        </AppTheme>
    );
}
