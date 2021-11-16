import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import UserProfile from './pages/UserProfile';
import CreateUser from './pages/CreateUser';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
