import React from 'react';

const ProductCard = ({ product, onAddToCart, onClick }) => {
  return (
    <div className="glass-morphism fade-in" 
      onClick={onClick}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
      }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{
        height: '240px',
        width: '100%',
        overflow: 'hidden'
      }}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <div style={{ 
          fontSize: '0.75rem', 
          color: 'var(--accent)', 
          fontWeight: 600,
          textTransform: 'uppercase',
          marginBottom: '0.5rem'
        }}>
          {product.category}
        </div>
        
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
        
        <p style={{ 
          color: 'var(--text-muted)', 
          fontSize: '0.9rem', 
          marginBottom: '1.5rem',
          height: '40px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.description}
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 700 }}>₹{product.price}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
