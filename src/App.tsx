import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './SignIn';
import ChatHomePage from "./ChatHomepage.tsx";
import {WebSocketProvider} from './WebSocket.tsx';
import {MessageProvider} from './Messages.tsx';

function App() {
    return (
        <MessageProvider>
            <WebSocketProvider>  {/* Wrap the entire app */}
                <Router>
                    <Routes>
                        <Route path="/" element={<SignIn/>}/> {/* Set SignIn as the main page */}
                        <Route path="chat" element={<ChatHomePage/>}/>
                    </Routes>
                </Router>
            </WebSocketProvider>
        </MessageProvider>
    );
}

export default App;
