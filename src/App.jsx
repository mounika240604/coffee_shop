import { useMemo, useState } from 'react'
import { Search, MapPin, SlidersHorizontal, Heart, Home, ShoppingBag, Ticket, UserRound, Plus, Minus, X, Coffee } from 'lucide-react'

const categories = ['All Coffee', 'Cappuccino', 'Espresso', 'Latte', 'Mocha']
const products = [
  { id: 1, name: 'Cappuccino', type: 'With Oat Milk', price: 4.50, rating: '4.8', category: 'Cappuccino', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=700&q=85', tag: 'Popular' },
  { id: 2, name: 'Caramel Macchiato', type: 'With Steamed Milk', price: 5.20, rating: '4.9', category: 'Latte', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=85' },
  { id: 3, name: 'Mocha Latte', type: 'Rich Chocolate', price: 4.80, rating: '4.7', category: 'Mocha', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=700&q=85' },
  { id: 4, name: 'Flat White', type: 'Smooth & Creamy', price: 4.10, rating: '4.6', category: 'Espresso', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=85' },
]
function money(n) { return `$${n.toFixed(2)}` }

function App() {
  const [category, setCategory] = useState('All Coffee')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [activeTab, setActiveTab] = useState('Home')
  const [showCart, setShowCart] = useState(false)
  const [notice, setNotice] = useState('')

  const visibleProducts = useMemo(() => products.filter(p =>
    (category === 'All Coffee' || p.category === category) &&
    `${p.name} ${p.type}`.toLowerCase().includes(search.toLowerCase())
  ), [category, search])

  const addToCart = (product) => {
    setCart(old => {
      const found = old.find(item => item.id === product.id)
      return found ? old.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item) : [...old, {...product, qty: 1}]
    })
    setNotice(`${product.name} added to your bag`)
    setTimeout(() => setNotice(''), 2200)
  }
  const changeQty = (id, delta) => setCart(old => old.map(i => i.id === id ? {...i, qty: i.qty + delta} : i).filter(i => i.qty > 0))
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return <div className="app-shell">
    <div className="phone-content">
      <header className="topbar">
        <div className="location">
          <span className="eyebrow">Location</span>
          <button className="location-button" onClick={() => setNotice('Showing your nearest coffee shop')}><MapPin size={16} fill="currentColor" /> New York, USA <span className="chevron">⌄</span></button>
        </div>
        <button className="avatar" aria-label="Profile" onClick={() => setActiveTab('Profile')}>M</button>
      </header>

      <section className="welcome">
        <div>
          <p className="hello">Good morning ☀️</p>
          <h1>Find your coffee<br/>to start your day</h1>
        </div>
        <div className="coffee-doodle"><Coffee size={31}/></div>
      </section>

      <div className="search-row">
        <label className="searchbox"><Search size={20}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search coffee..." /></label>
        <button className="filter-button" onClick={() => setNotice('Tip: use the coffee categories to filter your drink')} aria-label="Filter"><SlidersHorizontal size={21}/></button>
      </div>

      <section className="promo">
        <div className="promo-copy">
          <span className="promo-label">SPECIAL OFFER</span>
          <h2>Get 20% off</h2>
          <p>on your first order</p>
          <button onClick={() => { setCategory('All Coffee'); setNotice('Offer applied at checkout') }}>Order now <span>↗</span></button>
        </div>
        <div className="promo-art"><img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=85" alt="Coffee in a ceramic cup"/></div>
        <div className="promo-circle"></div>
      </section>

      <section className="menu-section">
        <div className="section-heading"><div><span className="eyebrow">OUR MENU</span><h2>Choose your coffee</h2></div><button className="see-all" onClick={() => setCategory('All Coffee')}>See all</button></div>
        <div className="category-list">
          {categories.map(item => <button key={item} className={`category-chip ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <div className="product-grid">
          {visibleProducts.map(product => <article className="product-card" key={product.id}>
            <div className="product-photo">
              <img src={product.image} alt={product.name}/>
              {product.tag && <span className="popular-tag">{product.tag}</span>}
              <button className={`favorite ${favorites.includes(product.id) ? 'is-favorite' : ''}`} onClick={() => setFavorites(old => old.includes(product.id) ? old.filter(id => id !== product.id) : [...old, product.id])} aria-label="Toggle favorite"><Heart size={17} fill={favorites.includes(product.id) ? 'currentColor' : 'none'}/></button>
              <span className="rating">★ {product.rating}</span>
            </div>
            <div className="product-info"><h3>{product.name}</h3><p>{product.type}</p>
              <div className="product-bottom"><strong>{money(product.price)}</strong><button className="add-button" onClick={() => addToCart(product)} aria-label={`Add ${product.name}`}><Plus size={19}/></button></div>
            </div>
          </article>)}
        </div>
        {visibleProducts.length === 0 && <div className="empty">No coffee found. Try another search.</div>}
      </section>

      <section className="nearby">
        <div className="section-heading"><div><span className="eyebrow">AROUND YOU</span><h2>Nearby coffee shops</h2></div><button className="see-all" onClick={() => setNotice('More coffee shops coming soon')}>See all</button></div>
        <div className="shop-card"><img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=500&q=85" alt="Cozy coffee shop"/><div><h3>Bean & Bloom Café</h3><p><MapPin size={13}/> 0.8 km · Open until 9 PM</p><span className="shop-rating">★ 4.9 <small>(2.4k reviews)</small></span></div><button className="shop-arrow" onClick={() => setNotice('Opening café details soon')}>↗</button></div>
      </section>
      <div className="bottom-space"></div>
    </div>

    <nav className="bottom-nav">
      {[['Home', Home], ['Menu', Coffee], ['Offers', Ticket], ['Profile', UserRound]].map(([name, Icon]) =>
        <button key={name} className={`nav-item ${activeTab === name ? 'active' : ''}`} onClick={() => name === 'Menu' ? (setCategory('All Coffee'), document.querySelector('.menu-section')?.scrollIntoView({behavior:'smooth'}), setActiveTab(name)) : name === 'Offers' ? setNotice('Your 20% welcome offer is ready!') : setActiveTab(name)}>
          <Icon size={21} strokeWidth={activeTab === name ? 2.4 : 1.8}/><span>{name}</span>
        </button>
      )}
      <button className="floating-bag" onClick={() => setShowCart(true)} aria-label="Open shopping bag"><ShoppingBag size={22}/>{cart.reduce((s,i)=>s+i.qty,0) > 0 && <span className="bag-count">{cart.reduce((s,i)=>s+i.qty,0)}</span>}</button>
    </nav>

    {notice && <div className="toast">{notice}<button onClick={() => setNotice('')}><X size={14}/></button></div>}
    {showCart && <div className="modal-backdrop" onClick={() => setShowCart(false)}><section className="cart-modal" onClick={e => e.stopPropagation()}>
      <div className="cart-head"><div><span className="eyebrow">YOUR ORDER</span><h2>Shopping bag</h2></div><button className="close-button" onClick={() => setShowCart(false)}><X/></button></div>
      {cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={35}/><h3>Your bag is empty</h3><p>Add a coffee and make your day better.</p></div> : <>
        <div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt=""/><div className="cart-item-info"><h3>{item.name}</h3><p>{money(item.price)}</p><div className="quantity"><button onClick={() => changeQty(item.id,-1)}><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.id,1)}><Plus size={13}/></button></div></div><strong>{money(item.price*item.qty)}</strong></div>)}</div>
        <div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div><button className="checkout" onClick={() => {setNotice('Order placed successfully! ☕');setCart([]);setShowCart(false)}}>Checkout · {money(total)}</button>
      </>}
    </section></div>}
  </div>
}

export default App
