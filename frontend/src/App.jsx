import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import './index.css';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <Router>
      <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <Navbar cartCount={cart.length} onSearch={setSearchQuery} />
        
        <Routes>
          <Route path="/" element={
            <Home 
              cart={cart} 
              onAddToCart={handleAddToCart} 
              searchQuery={searchQuery}
            />
          } />
          <Route path="/checkout" element={
            <Checkout 
              cart={cart} 
              onRemoveFromCart={handleRemoveFromCart} 
            />
          } />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        {/* Footer */}
        <footer style={{ 
          padding: '4rem 0', 
          borderTop: '1px solid var(--glass-border)',
          marginTop: '4rem',
          textAlign: 'center'
        }}>
          <div className="container">
            <div style={{ 
              fontSize: '1.2rem', 
              fontWeight: 700, 
              marginBottom: '1rem',
              color: 'var(--text-muted)' 
            }}>
              Klook.in
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              © {new Date().getFullYear()} Klook.in. All rights reserved. Built for excellence.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/admin" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', opacity: 0.5 }}>Admin Dashboard</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
