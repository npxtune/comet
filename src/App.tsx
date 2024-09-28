import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './SignIn';
import ChatHomePage from "./ChatHomepage.tsx";
import {WebSocketProvider} from './WebSocket.tsx';
// import { blue } from '@mui/material/colors';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {


    // const theme = createTheme({
    //     palette: {
    //         primary: {
    //             main: blue[500],
    //         },
    //         background: {
    //             default: 'transparent',
    //         },
    //     },
    // });

    return (
        <Router>
            <WebSocketProvider>
                <Routes>
                    <Route path="/" element={<SignIn/>}/> {/* Set SignIn as the main page */}
                    <Route path="chat" element={<ChatHomePage/>}/>
                </Routes>
            </WebSocketProvider>
        </Router>
    );
}

export default App;
