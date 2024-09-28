// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Example pages
const Login = () => <h2>Login Page</h2>;
const Homepage = () => <h2>Homepage</h2>;
const Chat = () => <h2>Chat Page</h2>;

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Login</Link>
                <Link to="/homepage">Homepage</Link>
                <Link to="/chat">Chat</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </Router>
    );
}

export default App;
