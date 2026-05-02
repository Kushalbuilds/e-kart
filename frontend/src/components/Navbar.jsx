import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, onSearch }) => {
  return (
    <nav className="glass-morphism" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <Link to="/" style={{
          fontSize: '1.8rem',
          fontWeight: 800,
          background: 'linear-gradient(90deg, #22c55e, #4ade80)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          whiteSpace: 'nowrap',
          letterSpacing: '-1px'
        }}>
          Klook.in
        </Link>
        
        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: '500px' }}>
          <input 
            type="text" 
            placeholder="Search premium products..." 
            onChange={(e) => onSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
          />
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Shop</Link>
            <Link to="/admin" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Admin</Link>
          </div>
          <Link to="/checkout" className="glass-morphism" style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            border: cartCount > 0 ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            Cart <span style={{ 
              background: cartCount > 0 ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
              padding: '0.1rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
