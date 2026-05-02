import React from 'react';

const Checkout = ({ cart, onRemoveFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div style={{ padding: '4rem 0', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Your Cart</h1>

        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          {/* Cart Items */}
          <div style={{ flex: 2, minWidth: '300px' }}>
            {cart.length === 0 ? (
              <div className="glass-morphism" style={{ padding: '4rem', textAlign: 'center', borderRadius: '24px' }}>
                <h2 style={{ color: 'var(--text-muted)' }}>Your cart is empty.</h2>
                <a href="/" style={{ color: 'var(--primary)', marginTop: '1rem', display: 'inline-block' }}>Go back to shop</a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {cart.map((item, index) => (
                  <div key={index} className="glass-morphism" style={{ 
                    padding: '1.5rem', 
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem'
                  }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{item.name}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.category}</p>
                    </div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>₹{item.price}</div>
                    <button 
                      onClick={() => onRemoveFromCart(index)}
                      style={{ color: '#ef4444', background: 'transparent', fontSize: '1.2rem', fontWeight: 'bold' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div className="glass-morphism" style={{ padding: '2.5rem', borderRadius: '24px', position: 'sticky', top: '120px' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span style={{ color: 'var(--accent)' }}>Free</span>
              </div>
              
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total</span>
                <span style={{ fontSize: '2rem', fontWeight: 700 }}>₹{total}</span>
              </div>

              <button 
                disabled={cart.length === 0}
                style={{
                  width: '100%',
                  background: cart.length === 0 ? 'var(--text-muted)' : 'var(--primary)',
                  color: 'white',
                  padding: '1.2rem',
                  borderRadius: '16px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  opacity: cart.length === 0 ? 0.5 : 1
                }}
                onClick={() => alert('Order placed successfully! This is a demo.')}
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
