// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './auth/Register';
import Login from './auth/Login';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Logout from './auth/Logout';



function App() {
  const { userId } = useContext(AuthContext);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute component={HomePage} userId={userId}/>} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/logout" element={<Logout />}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = ({ component: Component }) => {
  const { token } = useContext(AuthContext);
  console.log('Token in PrivateRoute:', token);
  return token ? <Component /> : <Navigate to="/login" />;
};

export default App;





