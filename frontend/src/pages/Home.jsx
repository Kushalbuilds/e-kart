import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const Home = ({ cart, onAddToCart, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Electronics', 'Accessories', 'Fitness', 'Photography'];

  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []); // Re-fetch whenever Home mounts

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Hero Section */}
      <section style={{ 
        padding: '6rem 0',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, rgba(52, 211, 153, 0.1) 0%, transparent 80%)'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: '4rem', 
            marginBottom: '1.5rem',
            background: 'linear-gradient(to bottom, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Elevate Your Lifestyle
          </h1>
          <p style={{ 
            color: 'var(--text-muted)', 
            fontSize: '1.2rem', 
            maxWidth: '600px', 
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Experience the future of shopping with our curated collection of premium products, designed for the modern individual.
          </p>
          <button style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '1rem 2.5rem',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 600,
            boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4)'
          }}>
            Explore Collection
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ padding: '2rem 0', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', position: 'relative' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="glass-morphism"
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '30px',
                color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              {cat}
            </button>
          ))}
          <button 
            onClick={() => {
              setLoading(true);
              fetch('/api/products')
                .then(res => res.json())
                .then(data => { setProducts(data); setLoading(false); })
                .catch(() => setLoading(false));
            }}
            style={{ 
              background: 'transparent', 
              color: 'var(--primary)', 
              border: '1px solid var(--primary)', 
              padding: '0.6rem 1.2rem', 
              borderRadius: '30px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Refresh Catalog ↻
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{ fontSize: '2rem' }}>{activeCategory === 'All' ? 'Featured Products' : activeCategory}</h2>
            <div style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>View All →</div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              Loading products...
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                  No products found. Try a different search or category.
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '2.5rem'
                }}>
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={onAddToCart} 
                      onClick={() => setSelectedProduct(product)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={onAddToCart}
      />
    </>
  );
};

export default Home;
