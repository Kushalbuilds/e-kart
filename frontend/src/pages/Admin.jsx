import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: 'Electronics'
  });

  const categories = ['Electronics', 'Accessories', 'Fitness', 'Photography'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, price: parseFloat(product.price) })
    })
    .then(res => {
      if (!res.ok) throw new Error('Server responded with ' + res.status);
      return res.json();
    })
    .then(data => {
      alert('Product added successfully to Klook.in Catalog!');
      setProduct({ name: '', description: '', price: '', imageUrl: '', category: 'Electronics' });
      fetchProducts(); // Refresh the list
    })
    .catch(err => {
      console.error('Error adding product:', err);
      alert('Failed to add product: ' + err.message);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        alert('Product deleted successfully!');
        fetchProducts(); // Refresh the list
      })
      .catch(err => console.error('Error deleting product:', err));
    }
  };

  return (
    <div style={{ padding: '4rem 0', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center', color: '#fff', fontWeight: 800 }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '4rem', fontSize: '1.1rem' }}>
          Manage your premium catalog. Add new items or remove existing ones.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
          {/* Add Product Form */}
          <section>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: 'var(--primary)' }}>Add New Product</h2>
            <form onSubmit={handleSubmit} className="glass-morphism" style={{ 
              padding: '3rem', 
              borderRadius: '24px',
              background: '#000000',
              border: '1px solid var(--primary)', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, color: '#fff' }}>Product Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. iPhone 15 Pro"
                  value={product.name}
                  onChange={(e) => setProduct({...product, name: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    background: 'rgba(255,255,255,0.15)', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, color: '#fff' }}>Description</label>
                <textarea 
                  required
                  placeholder="Brief details about the product..."
                  value={product.description}
                  onChange={(e) => setProduct({...product, description: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    background: 'rgba(255,255,255,0.15)', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    color: 'white', 
                    minHeight: '100px',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, color: '#fff' }}>Price (₹)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="24999"
                    value={product.price}
                    onChange={(e) => setProduct({...product, price: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      borderRadius: '12px', 
                      background: 'rgba(255,255,255,0.15)', 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, color: '#fff' }}>Category</label>
                  <select 
                    value={product.category}
                    onChange={(e) => setProduct({...product, category: e.target.value})}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      borderRadius: '12px', 
                      background: '#064e3b', 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 700, color: '#fff' }}>Google Image URL</label>
                <input 
                  type="text" 
                  required
                  placeholder="Paste the 'Copy image address' link here..."
                  value={product.imageUrl}
                  onChange={(e) => setProduct({...product, imageUrl: e.target.value})}
                  style={{ 
                    width: '100%', 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    background: 'rgba(255,255,255,0.15)', 
                    border: '1px solid rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>

              <button type="submit" style={{ 
                width: '100%', 
                background: 'var(--primary)', 
                color: 'white', 
                padding: '1.2rem', 
                borderRadius: '14px', 
                fontWeight: 800, 
                fontSize: '1.2rem',
                boxShadow: '0 10px 20px rgba(34, 197, 94, 0.3)',
                cursor: 'pointer'
              }}>
                Add to Catalog
              </button>
            </form>
          </section>

          {/* Product List / Delete Management */}
          <section>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: 'var(--primary)' }}>Manage Existing Products</h2>
            <div className="glass-morphism" style={{ padding: '2rem', borderRadius: '24px', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '1rem' }}>Product</th>
                      <th style={{ padding: '1rem' }}>Category</th>
                      <th style={{ padding: '1rem' }}>Price</th>
                      <th style={{ padding: '1rem', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img src={p.imageUrl} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                          <span style={{ fontWeight: 600 }}>{p.name}</span>
                        </td>
                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{p.category}</td>
                        <td style={{ padding: '1rem', fontWeight: 600 }}>₹{p.price.toLocaleString()}</td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleDelete(p.id)}
                            style={{ 
                              background: 'rgba(239, 68, 68, 0.1)', 
                              color: '#ef4444', 
                              border: '1px solid rgba(239, 68, 68, 0.2)', 
                              padding: '0.5rem 1rem', 
                              borderRadius: '8px',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
