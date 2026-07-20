import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Star, 
  Plus, 
  X,
  CreditCard
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useApp } from '../context/AppContext';


export const MarketplacePage: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);

  const categories = ['All', 'Organic Products', 'Fertilizers', 'Seeds', 'Equipment', 'Pesticides'];

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCartDrawerOpen(false);
      alert('Order Placed Successfully! Express agricultural dispatch initiated.');
    }, 1800);
  };

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-emerald-400" />
            <span>Agri-Marketplace</span>
          </h1>
          <p className="text-xs text-emerald-300/70 mt-1">
            Certified bio-pesticides, organic fertilizers, high-yield seeds, and smart irrigation kits.
          </p>
        </div>

        {/* View Cart Button */}
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:brightness-110 flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Cart ({cart.reduce((a, c) => a + c.quantity, 0)})</span>
        </button>
      </div>

      {/* Search & Categories */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-emerald-400/60 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search products, bio-pesticides, seeds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-100 text-sm focus:outline-none focus:border-emerald-400 transition-colors shadow-lg"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-emerald-950 shadow-md shadow-emerald-500/20'
                  : 'bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="glass-card rounded-3xl overflow-hidden border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex flex-col justify-between"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              {prod.organic && (
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500 text-emerald-950 shadow">
                  100% Organic
                </span>
              )}
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{prod.rating}</span>
                    <span className="text-[10px] text-emerald-300/60">({prod.reviewsCount})</span>
                  </div>
                  <span className="text-[10px] text-emerald-400/70">{prod.seller}</span>
                </div>

                <h3 className="text-base font-extrabold text-emerald-100">{prod.name}</h3>
                <p className="text-xs text-emerald-100/70 line-clamp-2 mt-1">{prod.description}</p>
              </div>

              <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-emerald-300">${prod.price.toFixed(2)}</span>
                  {prod.originalPrice > prod.price && (
                    <span className="text-xs text-emerald-400/50 line-through ml-2">${prod.originalPrice.toFixed(2)}</span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(prod)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer Modal */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-emerald-950 border-l border-emerald-500/30 h-full p-6 flex flex-col justify-between space-y-4">
            
            <div className="flex items-center justify-between pb-4 border-b border-emerald-800/40">
              <h3 className="text-lg font-bold text-emerald-100 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <span>Your Agri Cart ({cart.reduce((a, c) => a + c.quantity, 0)})</span>
              </h3>
              <button onClick={() => setCartDrawerOpen(false)} className="text-emerald-300 hover:text-rose-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-xs text-emerald-300/60">Your cart is currently empty.</div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="p-3 rounded-2xl bg-emerald-900/40 border border-emerald-500/20 flex items-center justify-between gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-emerald-100 truncate">{item.product.name}</h4>
                      <span className="text-xs text-emerald-300 font-extrabold">${item.product.price.toFixed(2)} x {item.quantity}</span>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-rose-400 hover:text-rose-300 p-1 text-xs">
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Total */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-emerald-800/40 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-300/80">Total Amount:</span>
                  <span className="text-xl font-black text-emerald-300">${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkoutSuccess}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 text-emerald-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{checkoutSuccess ? 'Processing Express Order...' : 'Proceed to Express Checkout'}</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
