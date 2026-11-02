import { useState, useEffect, useMemo } from 'react';
import AdireDivider from '../components/AdireDivider';
import SEO from '../components/SEO';
import { dbGetAll, dbInsert, SEED_DATA } from '../services/db';
import { SAGAMU_QUARTER_NAMES } from '../constants/quarters';
import './MarketplacePage.css';

const CATEGORIES = [
  { id: 'All', label: 'All items' },
  { id: 'Farm Produce', label: 'Farm produce' },
  { id: 'Crafts & Adire', label: 'Crafts & Adire' },
  { id: 'Food & Catering', label: 'Food & catering' },
  { id: 'Services', label: 'Artisan services' },
  { id: 'Trade & Retail', label: 'Trade & building' },
  { id: 'Fashion & Beads', label: 'Fashion & beads' },
  { id: 'Property', label: 'Land & property' },
];

const QUARTERS = [
  'All Quarters',
  ...SAGAMU_QUARTER_NAMES,
];

// Clean SVGs replacing emojis (Hallmark Floor 11 & Gate 30a)
function SearchSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function HeartSvg({ filled }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ShareSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function CheckSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MapPinSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function MarketplacePage() {
  const [listings, setListings] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedQuarter, setSelectedQuarter] = useState('All Quarters');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [savedFavorites, setSavedFavorites] = useState(() => {
    try {
      const s = localStorage.getItem('sagamu_marketplace_favs');
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);

  // Modals & UI states
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Order modal states
  const [orderModalItem, setOrderModalItem] = useState(null);
  const [orderForm, setOrderForm] = useState({
    buyerName: '',
    phone: '',
    address: 'Sagamu Remo Town',
    quantity: '1',
    note: '',
  });

  // Offer modal state
  const [offerModalItem, setOfferModalItem] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');

  // Listing creation form
  const [newForm, setNewForm] = useState({
    title: '',
    category: 'Farm Produce',
    desc: '',
    priceNumber: '',
    priceUnit: 'per tuber',
    isNegotiable: true,
    condition: 'Fresh Harvest',
    stockStatus: 'In Stock',
    seller: '',
    quarter: 'Offin',
    phone: '',
    whatsapp: '',
    email: '',
    imageUrl: '',
    isFeatured: false,
  });

  const loadData = async () => {
    let data = await dbGetAll('marketplace');
    if (!data || data.length < 5) {
      if (SEED_DATA && SEED_DATA.marketplace) {
        data = SEED_DATA.marketplace;
      }
    }
    setListings(data || []);
  };

  useEffect(() => {
    loadData();
    const handleUpdate = (e) => setListings(e.detail || []);
    window.addEventListener('db-marketplace-updated', handleUpdate);
    return () => window.removeEventListener('db-marketplace-updated', handleUpdate);
  }, []);

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    let updated;
    if (savedFavorites.includes(id)) {
      updated = savedFavorites.filter(favId => favId !== id);
    } else {
      updated = [...savedFavorites, id];
    }
    setSavedFavorites(updated);
    localStorage.setItem('sagamu_marketplace_favs', JSON.stringify(updated));
  };

  const handleShare = async (item, e) => {
    if (e) e.stopPropagation();
    const url = window.location.href.split('?')[0] + `?item=${item.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out "${item.title}" on the Sagamu Remo Marketplace. Price: ${item.price}`,
          url,
        });
        return;
      } catch {
        // Fallback
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setNewForm(prev => ({ ...prev, imageUrl: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const cleanPhone = (newForm.phone || '').replace(/\D/g, '');
    const cleanWhatsApp = (newForm.whatsapp || newForm.phone || '').replace(/\D/g, '');

    let formattedPrice = newForm.priceNumber;
    if (formattedPrice && !formattedPrice.toLowerCase().includes('quote') && !formattedPrice.includes('₦')) {
      formattedPrice = `₦${Number(formattedPrice.replace(/,/g, '')).toLocaleString()} ${newForm.priceUnit ? `/ ${newForm.priceUnit}` : ''}`;
    }

    const newItem = {
      id: `MKT-${Math.floor(100 + Math.random() * 900)}`,
      cat: newForm.category,
      title: newForm.title,
      desc: newForm.desc,
      price: formattedPrice || 'Quote on request',
      isNegotiable: newForm.isNegotiable,
      condition: newForm.condition,
      stockStatus: newForm.stockStatus,
      seller: newForm.seller,
      quarter: newForm.quarter,
      phone: newForm.phone,
      whatsapp: cleanWhatsApp.startsWith('0') ? '234' + cleanWhatsApp.slice(1) : cleanWhatsApp,
      email: newForm.email,
      imageUrl: newForm.imageUrl,
      badge: newForm.isFeatured ? 'featured' : newForm.category === 'Farm Produce' ? 'organic' : 'fresh',
      verified: true,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    await dbInsert('marketplace', newItem);
    setFormSubmitted(true);
    setLoading(false);
    setNewForm({
      title: '',
      category: 'Farm Produce',
      desc: '',
      priceNumber: '',
      priceUnit: 'per tuber',
      isNegotiable: true,
      condition: 'Fresh Harvest',
      stockStatus: 'In Stock',
      seller: '',
      quarter: 'Offin',
      phone: '',
      whatsapp: '',
      email: '',
      imageUrl: '',
      isFeatured: false,
    });
    setTimeout(() => {
      setShowForm(false);
      setFormSubmitted(false);
    }, 3000);
  };

  // Filter & Search Logic
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      if (activeCategory !== 'All' && item.cat !== activeCategory) return false;
      if (selectedQuarter !== 'All Quarters' && item.quarter !== selectedQuarter) return false;
      if (onlyVerified && !item.verified) return false;
      if (showOnlyFavs && !savedFavorites.includes(item.id)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = (item.title || '').toLowerCase().includes(q);
        const matchDesc = (item.desc || '').toLowerCase().includes(q);
        const matchSeller = (item.seller || '').toLowerCase().includes(q);
        const matchQuarter = (item.quarter || '').toLowerCase().includes(q);
        const matchCat = (item.cat || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchSeller && !matchQuarter && !matchCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'verified') {
        return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
      }
      return 0;
    });
  }, [listings, activeCategory, selectedQuarter, onlyVerified, showOnlyFavs, savedFavorites, searchQuery, sortBy]);

  // WhatsApp order link
  const sendWhatsAppOrder = (item, formDetails) => {
    const cleanWhatsApp = (item.whatsapp || item.phone || '').replace(/\D/g, '');
    const phoneTarget = cleanWhatsApp.startsWith('0') ? '234' + cleanWhatsApp.slice(1) : cleanWhatsApp;
    const msg = `SAGAMU REMO MARKETPLACE ORDER\n\n` +
      `Hello ${item.seller},\n` +
      `I would like to place an order for your listing on the Sagamu Community Portal:\n\n` +
      `Item: ${item.title}\n` +
      `Price: ${item.price}\n` +
      `Quantity: ${formDetails.quantity}\n` +
      `Buyer: ${formDetails.buyerName}\n` +
      `Delivery in Sagamu: ${formDetails.address}\n` +
      (formDetails.note ? `Note: ${formDetails.note}\n\n` : `\n`) +
      `Please confirm availability and bank details.`;

    const url = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setOrderModalItem(null);
  };

  // WhatsApp price negotiation link
  const sendWhatsAppOffer = (item, amount) => {
    const cleanWhatsApp = (item.whatsapp || item.phone || '').replace(/\D/g, '');
    const phoneTarget = cleanWhatsApp.startsWith('0') ? '234' + cleanWhatsApp.slice(1) : cleanWhatsApp;
    const msg = `SAGAMU MARKETPLACE PRICE OFFER\n\n` +
      `Hello ${item.seller},\n` +
      `I saw your listing for "${item.title}" (${item.price}) on the Sagamu Portal.\n\n` +
      `My Proposed Offer: ₦${Number(amount.replace(/,/g, '')).toLocaleString()}\n\n` +
      `Can we agree on this price? I am ready for pickup. Thank you.`;

    const url = `https://wa.me/${phoneTarget}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setOfferModalItem(null);
  };

  return (
    <div className="mkt-page">
      <SEO
        title="Sagamu Remo Community Marketplace"
        description="Buy farm produce, traditional Adire textiles, Yoruba delicacies, artisan services, and building materials directly from verified Sagamu traders."
      />

      {/* Community Notice Strip */}
      <div className="mkt-notice">
        <span className="mkt-notice-text">
          Direct local trade with verified Sagamu merchants and zero intermediary fees
        </span>
      </div>

      {/* Hero Stage (Hallmark Floor 12: Headline, one sentence under 12 words, action) */}
      <section className="mkt-hero">
        <div className="container">
          <div className="mkt-hero-grid">
            <div>
              <h1 className="mkt-hero-title">Sagamu Community Marketplace</h1>
              <p className="mkt-hero-lead">
                Buy farm produce, Adire textiles, and artisan services directly from Sagamu traders.
              </p>
              <div className="mkt-hero-actions">
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="mkt-btn mkt-btn-primary"
                >
                  Post listing
                </button>
                <button
                  type="button"
                  onClick={() => setShowOnlyFavs(!showOnlyFavs)}
                  className={`mkt-btn ${showOnlyFavs ? 'mkt-btn-primary' : 'mkt-btn-outline'}`}
                >
                  Saved ({savedFavorites.length})
                </button>
              </div>
            </div>

            <div className="mkt-hero-banner">
              <div className="mkt-hero-stats">
                <div className="mkt-stat-box">
                  <div className="mkt-stat-num">{listings.length}</div>
                  <div className="mkt-stat-label">Total items</div>
                </div>
                <div className="mkt-stat-box">
                  <div className="mkt-stat-num">{listings.filter(l => l.verified).length}</div>
                  <div className="mkt-stat-label">Verified sellers</div>
                </div>
                <div className="mkt-stat-box">
                  <div className="mkt-stat-num">{listings.filter(l => l.cat === 'Farm Produce').length}</div>
                  <div className="mkt-stat-label">Farm batches</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Browse Section */}
      <section style={{ padding: 'var(--space-xl) 0' }}>
        <div className="container">
          {/* Controls: Search, Quarter Filter, Sort */}
          <div className="mkt-controls">
            <div className="mkt-controls-row">
              <div className="mkt-search-wrapper">
                <span className="mkt-search-icon">
                  <SearchSvg />
                </span>
                <input
                  type="search"
                  className="mkt-input mkt-search-input"
                  placeholder="Search produce, Adire, electrician, yam, caterer..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="mkt-input mkt-select"
                value={selectedQuarter}
                onChange={e => setSelectedQuarter(e.target.value)}
                aria-label="Filter by quarter"
              >
                {QUARTERS.map(q => <option key={q} value={q}>{q}</option>)}
              </select>

              <select
                className="mkt-input mkt-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                aria-label="Sort listings"
              >
                <option value="newest">Newest first</option>
                <option value="verified">Verified sellers first</option>
              </select>
            </div>

            {/* Category selection pills */}
            <div className="mkt-categories">
              {CATEGORIES.map(cat => {
                const active = activeCategory === cat.id;
                const count = cat.id === 'All' ? listings.length : listings.filter(l => l.cat === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`mkt-pill ${active ? 'is-active' : ''}`}
                  >
                    <span>{cat.label}</span>
                    <span className="mkt-pill-count">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section Header with items count and filter toggle */}
          <div className="mkt-section-header">
            <h2 className="mkt-section-title">
              Directory listings ({filteredListings.length})
            </h2>
            <div className="mkt-meta-bar">
              <div>
                <span>Category: <strong>{activeCategory}</strong></span>
                {selectedQuarter !== 'All Quarters' && <span>, Quarter: <strong>{selectedQuarter}</strong></span>}
              </div>

              <label className="mkt-verified-check">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={e => setOnlyVerified(e.target.checked)}
                />
                Verified sellers only
              </label>
            </div>
          </div>

          {/* Listings Grid */}
          {filteredListings.length === 0 ? (
            <div className="mkt-controls" style={{ textAlign: 'center', padding: 'var(--space-2xl) var(--space-md)' }}>
              <h3 className="mkt-card-title" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-xs)' }}>
                No listings found matching your criteria
              </h3>
              <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-md)' }}>
                Try searching with broader terms or reset active filters.
              </p>
              <button
                type="button"
                className="mkt-btn mkt-btn-primary"
                onClick={() => {
                  setActiveCategory('All');
                  setSelectedQuarter('All Quarters');
                  setSearchQuery('');
                  setShowOnlyFavs(false);
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mkt-grid">
              {filteredListings.map(item => {
                const isFav = savedFavorites.includes(item.id);
                return (
                  <article key={item.id} className="mkt-card">
                    {/* Media thumbnail */}
                    <div className="mkt-card-media">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="mkt-card-img"
                        />
                      ) : (
                        <div className="mkt-card-placeholder">
                          <span>{item.cat}</span>
                        </div>
                      )}

                      {/* State Badges */}
                      <div className="mkt-card-badges">
                        <span className={`mkt-badge mkt-badge-${item.badge || 'featured'}`}>
                          {item.badge || 'local'}
                        </span>
                        {item.verified && (
                          <span className="mkt-badge mkt-badge-verified">
                            Verified
                          </span>
                        )}
                      </div>

                      {/* Actions: Share & Save */}
                      <div className="mkt-card-actions-top">
                        <button
                          type="button"
                          className="mkt-icon-btn"
                          onClick={(e) => handleShare(item, e)}
                          title="Share listing"
                          aria-label="Share listing"
                        >
                          {copiedId === item.id ? <CheckSvg /> : <ShareSvg />}
                        </button>
                        <button
                          type="button"
                          className={`mkt-icon-btn ${isFav ? 'is-fav' : ''}`}
                          onClick={(e) => toggleFavorite(item.id, e)}
                          title="Save to favorites"
                          aria-label="Save to favorites"
                        >
                          <HeartSvg filled={isFav} />
                        </button>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="mkt-card-body">
                      <div className="mkt-card-header">
                        <span className="mkt-card-category">{item.cat}</span>
                        <span className="mkt-card-quarter">
                          <MapPinSvg /> {item.quarter}
                        </span>
                      </div>

                      <h3
                        className="mkt-card-title"
                        onClick={() => setSelectedItem(item)}
                      >
                        {item.title}
                      </h3>

                      <p className="mkt-card-desc">
                        {item.desc?.length > 95 ? item.desc.substring(0, 95) + '…' : item.desc}
                      </p>

                      <div className="mkt-card-price-row">
                        <div>
                          <div className="mkt-card-price">{item.price}</div>
                          {item.isNegotiable && (
                            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 600 }}>
                              Negotiable
                            </span>
                          )}
                        </div>
                        <div className="mkt-card-seller">{item.seller}</div>
                      </div>

                      <div className="mkt-card-buttons">
                        <button
                          type="button"
                          className="mkt-btn mkt-btn-primary"
                          onClick={() => setOrderModalItem(item)}
                        >
                          Order on WhatsApp
                        </button>
                        <button
                          type="button"
                          className="mkt-btn mkt-btn-outline"
                          onClick={() => setSelectedItem(item)}
                        >
                          View details
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Safety & Fair Trade Notice */}
          <div className="mkt-guidelines">
            <h4 className="mkt-guidelines-heading">Community marketplace safety guidelines</h4>
            <ul className="mkt-guidelines-list">
              <li>Exchange payments only upon physical inspection or pickup at designated central locations such as Sagamu Town Hall, Palace Square, or Oja Ale Centre.</li>
              <li>Verify the seller badge for registered traders recognized by the Sagamu Development Association.</li>
              <li>For diaspora orders, coordinate directly with the trader via WhatsApp to agree on shipping logistics.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div
          className="mkt-modal-backdrop"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="mkt-modal"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
          >
            <div className="mkt-modal-header">
              <div>
                <h2 className="mkt-modal-title">{selectedItem.title}</h2>
                <div className="mkt-modal-sub">{selectedItem.cat}, {selectedItem.quarter}</div>
              </div>
              <button
                type="button"
                className="mkt-modal-close"
                onClick={() => setSelectedItem(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            {selectedItem.imageUrl && (
              <div style={{ borderRadius: 'var(--radius-card)', overflow: 'hidden', maxHeight: '280px', marginBottom: 'var(--space-md)' }}>
                <img src={selectedItem.imageUrl} alt={selectedItem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 'var(--space-sm)', background: 'var(--color-paper-2)', padding: 'var(--space-md)', borderRadius: 'var(--radius-btn)', border: 'var(--rule-hair) solid var(--color-rule)', marginBottom: 'var(--space-md)' }}>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', fontWeight: 600 }}>Price</div>
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--color-accent)' }}>{selectedItem.price}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', fontWeight: 600 }}>Seller</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)', fontWeight: 600 }}>{selectedItem.seller}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', fontWeight: 600 }}>Status</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success)', fontWeight: 600 }}>{selectedItem.stockStatus || 'In Stock'}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', fontWeight: 600 }}>Quarter</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink)' }}>{selectedItem.quarter}</div>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 'var(--space-3xs)' }}>
                Description
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-ink-2)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {selectedItem.desc}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-sm)', paddingTop: 'var(--space-md)', borderTop: 'var(--rule-hair) solid var(--color-rule)' }}>
              <button
                type="button"
                className="mkt-btn mkt-btn-primary"
                onClick={() => {
                  setSelectedItem(null);
                  setOrderModalItem(selectedItem);
                }}
              >
                Order on WhatsApp
              </button>

              <button
                type="button"
                className="mkt-btn mkt-btn-outline"
                onClick={() => {
                  setSelectedItem(null);
                  setOfferModalItem(selectedItem);
                }}
              >
                Negotiate price
              </button>

              <a
                href={`tel:${selectedItem.phone}`}
                className="mkt-btn mkt-btn-outline"
                style={{ textDecoration: 'none' }}
              >
                Call seller
              </a>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Quick Order Modal */}
      {orderModalItem && (
        <div
          className="mkt-modal-backdrop"
          onClick={() => setOrderModalItem(null)}
        >
          <div
            className="mkt-modal"
            style={{ maxWidth: '480px' }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Order on WhatsApp"
          >
            <div className="mkt-modal-header">
              <h3 className="mkt-modal-title">Place order via WhatsApp</h3>
              <button
                type="button"
                className="mkt-modal-close"
                onClick={() => setOrderModalItem(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div style={{ padding: 'var(--space-sm) var(--space-md)', background: 'var(--color-success-soft)', borderRadius: 'var(--radius-btn)', border: 'var(--rule-hair) solid var(--color-success)', marginBottom: 'var(--space-md)' }}>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-success-ink)', fontWeight: 700 }}>{orderModalItem.title}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success-ink)' }}>Listed at: {orderModalItem.price} · Seller: {orderModalItem.seller}</div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendWhatsAppOrder(orderModalItem, orderForm);
              }}
            >
              <div className="mkt-form-group">
                <label className="mkt-form-label">Full name</label>
                <input required className="mkt-input" value={orderForm.buyerName} onChange={e => setOrderForm({ ...orderForm, buyerName: e.target.value })} placeholder="Your full name" />
              </div>
              <div className="mkt-form-group">
                <label className="mkt-form-label">Quantity or units</label>
                <input required className="mkt-input" value={orderForm.quantity} onChange={e => setOrderForm({ ...orderForm, quantity: e.target.value })} placeholder="E.g. 3 tubers or 2 sets" />
              </div>
              <div className="mkt-form-group">
                <label className="mkt-form-label">Delivery or pickup location in Sagamu</label>
                <input required className="mkt-input" value={orderForm.address} onChange={e => setOrderForm({ ...orderForm, address: e.target.value })} placeholder="E.g. Offin, near Akarigbo Palace" />
              </div>
              <div className="mkt-form-group">
                <label className="mkt-form-label">Special note (optional)</label>
                <input className="mkt-input" value={orderForm.note} onChange={e => setOrderForm({ ...orderForm, note: e.target.value })} placeholder="Timing, delivery preference" />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end', marginTop: 'var(--space-md)' }}>
                <button type="button" className="mkt-btn mkt-btn-outline" onClick={() => setOrderModalItem(null)}>Cancel</button>
                <button type="submit" className="mkt-btn mkt-btn-primary">
                  Open WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Negotiate / Price Offer Modal */}
      {offerModalItem && (
        <div
          className="mkt-modal-backdrop"
          onClick={() => setOfferModalItem(null)}
        >
          <div
            className="mkt-modal"
            style={{ maxWidth: '440px' }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Make price offer"
          >
            <div className="mkt-modal-header">
              <h3 className="mkt-modal-title">Make a price offer</h3>
              <button
                type="button"
                className="mkt-modal-close"
                onClick={() => setOfferModalItem(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div style={{ padding: 'var(--space-sm) var(--space-md)', background: 'var(--color-accent-soft)', borderRadius: 'var(--radius-btn)', border: 'var(--rule-hair) solid var(--color-rule)', marginBottom: 'var(--space-md)' }}>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', fontWeight: 700 }}>{offerModalItem.title}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-2)' }}>Asking price: {offerModalItem.price}</div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendWhatsAppOffer(offerModalItem, offerAmount);
              }}
            >
              <div className="mkt-form-group">
                <label className="mkt-form-label">Your offer amount (₦)</label>
                <input
                  required
                  type="number"
                  className="mkt-input"
                  value={offerAmount}
                  onChange={e => setOfferAmount(e.target.value)}
                  placeholder="E.g. 15000"
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end', marginTop: 'var(--space-md)' }}>
                <button type="button" className="mkt-btn mkt-btn-outline" onClick={() => setOfferModalItem(null)}>Cancel</button>
                <button type="submit" className="mkt-btn mkt-btn-primary">
                  Send offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Listing Modal */}
      {showForm && (
        <div
          className="mkt-modal-backdrop"
          onClick={() => setShowForm(false)}
        >
          <div
            className="mkt-modal"
            style={{ maxWidth: '640px' }}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Post listing"
          >
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-xl) var(--space-md)' }}>
                <h3 className="mkt-modal-title" style={{ marginBottom: 'var(--space-xs)' }}>
                  Listing published
                </h3>
                <p style={{ color: 'var(--color-ink-2)' }}>
                  Your listing is now live in the Sagamu Community Marketplace.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="mkt-modal-header">
                  <div>
                    <h3 className="mkt-modal-title">Post marketplace listing</h3>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', margin: 0 }}>
                      Connect with local and diaspora buyers.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mkt-modal-close"
                    onClick={() => setShowForm(false)}
                    aria-label="Close dialog"
                  >
                    ✕
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                  <div style={{ gridColumn: '1 / -1' }} className="mkt-form-group">
                    <label className="mkt-form-label">Product or service title</label>
                    <input required className="mkt-input" value={newForm.title} onChange={e => setNewForm({ ...newForm, title: e.target.value })} placeholder="E.g. Fresh Sagamu yam tubers" />
                  </div>

                  <div className="mkt-form-group">
                    <label className="mkt-form-label">Category</label>
                    <select required className="mkt-input" value={newForm.category} onChange={e => setNewForm({ ...newForm, category: e.target.value })}>
                      {CATEGORIES.slice(1).map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>

                  <div className="mkt-form-group">
                    <label className="mkt-form-label">Sagamu quarter</label>
                    <select required className="mkt-input" value={newForm.quarter} onChange={e => setNewForm({ ...newForm, quarter: e.target.value })}>
                      {QUARTERS.slice(1).map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                  </div>

                  <div className="mkt-form-group">
                    <label className="mkt-form-label">Price (₦)</label>
                    <input required className="mkt-input" value={newForm.priceNumber} onChange={e => setNewForm({ ...newForm, priceNumber: e.target.value })} placeholder="E.g. 4500" />
                  </div>

                  <div className="mkt-form-group">
                    <label className="mkt-form-label">Unit of measure</label>
                    <input className="mkt-input" value={newForm.priceUnit} onChange={e => setNewForm({ ...newForm, priceUnit: e.target.value })} placeholder="E.g. per tuber, per set" />
                  </div>

                  <div className="mkt-form-group">
                    <label className="mkt-form-label">Seller or business name</label>
                    <input required className="mkt-input" value={newForm.seller} onChange={e => setNewForm({ ...newForm, seller: e.target.value })} placeholder="E.g. Adewale Farms" />
                  </div>

                  <div className="mkt-form-group">
                    <label className="mkt-form-label">Phone or WhatsApp number</label>
                    <input required type="tel" className="mkt-input" value={newForm.phone} onChange={e => setNewForm({ ...newForm, phone: e.target.value, whatsapp: e.target.value })} placeholder="0803..." />
                  </div>

                  <div style={{ gridColumn: '1 / -1' }} className="mkt-form-group">
                    <label className="mkt-form-label">Product photo</label>
                    <input type="file" accept="image/*" className="mkt-input" onChange={handleImageUpload} />
                    {newForm.imageUrl && (
                      <div style={{ marginTop: 'var(--space-xs)', width: '72px', height: '72px', borderRadius: 'var(--radius-btn)', overflow: 'hidden', border: 'var(--rule-hair) solid var(--color-rule)' }}>
                        <img src={newForm.imageUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>

                  <div style={{ gridColumn: '1 / -1' }} className="mkt-form-group">
                    <label className="mkt-form-label">Description</label>
                    <textarea required className="mkt-input" rows={3} value={newForm.desc} onChange={e => setNewForm({ ...newForm, desc: e.target.value })} placeholder="Quality details, packaging, sizes, delivery options..." style={{ resize: 'vertical' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'flex-end' }}>
                  <button type="button" className="mkt-btn mkt-btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="mkt-btn mkt-btn-primary" disabled={loading}>
                    {loading ? 'Publishing…' : 'Publish listing'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <AdireDivider />
    </div>
  );
}
