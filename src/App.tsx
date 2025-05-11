import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import ChatPage from './pages/chatpage';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LoginPage from './pages/loginpage';


function App() {

useEffect(() => {
  AOS.init({ once: true, duration: 800 });
}, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}
export default App
