import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Product';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard.js'; // Import the Dashboard component

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add the Dashboard route */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
