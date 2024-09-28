import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import ChatHomePage from "./ChatHomepage.tsx";
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
        // <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<SignIn />} /> {/* Set SignIn as the main page */}
                    <Route path="chat" element={<ChatHomePage />} />
                </Routes>
            </Router>
        // </ThemeProvider>
    );
}

export default App;
