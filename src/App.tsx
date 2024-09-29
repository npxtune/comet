import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './SignIn';
import ChatHomePage from "./ChatHomepage.tsx";
import {WebSocketProvider} from './WebSocket.tsx';

function App() {
    return (
        <WebSocketProvider>  {/* Wrap the entire app */}
            <Router>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/chat" element={<ChatHomePage />} />
                </Routes>
            </Router>
        </WebSocketProvider>
    );
}

export default App;
