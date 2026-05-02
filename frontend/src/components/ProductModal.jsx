import React from 'react';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(8px)'
    }} onClick={onClose}>
      <div className="glass-morphism fade-in" style={{
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        borderRadius: '24px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative'
      }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          zIndex: 10
        }}>×</button>

        <div style={{ flex: 1, height: '600px' }}>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ flex: 1, padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>{product.category}</span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{product.name}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>{product.description}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: 'auto' }}>
            <span style={{ fontSize: '2rem', fontWeight: 700 }}>₹{product.price}</span>
            <button 
              onClick={() => onAddToCart(product)}
              style={{
                flex: 1,
                background: 'var(--primary)',
                color: 'white',
                padding: '1rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
