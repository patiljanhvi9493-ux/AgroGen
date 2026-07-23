import React, { useState } from 'react';
import { 
  Sprout, 
  Plus, 
  Search, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Tag, 
  Check, 
  X,
  Scale
} from 'lucide-react';

interface CropListing {
  id: string;
  cropName: string;
  variety: string;
  quantity: string; // e.g. "12 Tons"
  expectedPrice: string; // e.g. "$320 / Ton"
  harvestDate: string;
  location: string;
  status: 'Active' | 'Sold' | 'Bids Pending';
  bids: {
    id: string;
    buyer: string;
    amount: string; // e.g. "$310 / Ton"
    status: 'Pending' | 'Accepted' | 'Declined';
  }[];
}

export const SellingPage: React.FC = () => {
  const [listings, setListings] = useState<CropListing[]>([
    {
      id: '1',
      cropName: 'Tomato',
      variety: 'Roma Hybrid',
      quantity: '5 Tons',
      expectedPrice: '$420 / Ton',
      harvestDate: '2026-08-05',
      location: 'Ludhiana, Punjab',
      status: 'Bids Pending',
      bids: [
        { id: '1a', buyer: 'Metro Cash & Carry', amount: '$410 / Ton', status: 'Pending' },
        { id: '1b', buyer: 'Reliance Retail Agritech', amount: '$395 / Ton', status: 'Pending' }
      ]
    },
    {
      id: '2',
      cropName: 'Wheat',
      variety: 'Sharbati Organic',
      quantity: '15 Tons',
      expectedPrice: '$310 / Ton',
      harvestDate: '2026-07-28',
      location: 'Ludhiana, Punjab',
      status: 'Active',
      bids: []
    }
  ]);

  const [cropName, setCropName] = useState('Tomato');
  const [variety, setVariety] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [location, setLocation] = useState('Ludhiana, Punjab');

  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!variety || !quantity || !expectedPrice || !harvestDate) return;

    const newListing: CropListing = {
      id: Date.now().toString(),
      cropName,
      variety,
      quantity: `${quantity} Tons`,
      expectedPrice: `$${expectedPrice} / Ton`,
      harvestDate,
      location,
      status: 'Active',
      bids: []
    };

    setListings(prev => [newListing, ...prev]);
    setVariety('');
    setQuantity('');
    setExpectedPrice('');
    setHarvestDate('');
    setShowAddForm(false);
  };

  const handleAcceptBid = (listingId: string, bidId: string, buyer: string, amount: string) => {
    setListings(prev => prev.map(list => {
      if (list.id === listingId) {
        return {
          ...list,
          status: 'Sold',
          expectedPrice: amount, // set price to accepted bid amount
          bids: list.bids.map(b => ({
            ...b,
            status: b.id === bidId ? 'Accepted' : 'Declined'
          }))
        };
      }
      return list;
    }));

    // Trigger canvas confetti if loaded
    const win = window as any;
    if (typeof win.confetti === 'function') {
      win.confetti({ particleCount: 70, spread: 60 });
    }
    alert(`Deal successfully closed with: ${buyer} at ${amount}! Contract and shipping manifest have been emailed to your profile.`);
  };

  const handleDeclineBid = (listingId: string, bidId: string) => {
    setListings(prev => prev.map(list => {
      if (list.id === listingId) {
        return {
          ...list,
          bids: list.bids.map(b => b.id === bidId ? { ...b, status: 'Declined' } : b)
        };
      }
      return list;
    }));
  };

  const filteredListings = listings.filter(l => 
    l.cropName.toLowerCase().includes(search.toLowerCase()) || 
    l.variety.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 py-4 pb-20 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-emerald-100 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            <span>Direct Crop Selling Portal</span>
          </h1>
          <p className="text-xs text-emerald-300/70 mt-1">
            Bypass intermediaries! List your harvested crop lots directly to trusted food processors and corporate buyers.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(prev => !prev)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-black text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Crop Lot</span>
        </button>
      </div>

      {/* Add Listing Collapse Form */}
      {showAddForm && (
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 animate-fadeInUp">
          <h3 className="text-sm font-bold text-emerald-100 mb-3 flex items-center gap-2">
            <Sprout className="w-4.5 h-4.5 text-emerald-400" />
            <span>Create New Crop Lot Listing</span>
          </h3>

          <form onSubmit={handleCreateListing} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Crop Type</label>
                <select
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                >
                  <option value="Tomato">Tomato</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Rice (Paddy)</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Corn">Maize (Corn)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Crop Variety</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharbati HD-2967, Roma Hybrid"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Total Quantity (Tons)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 10"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Expected Price ($ / Ton)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 350"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Harvest / Availability Date</label>
                <input
                  type="date"
                  required
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-300 block mb-1">Farm Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-100 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl bg-emerald-900/60 text-emerald-300 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-black shadow-md hover:brightness-110"
              >
                Post Listing
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Listings Header and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/20">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-emerald-400/60" />
          <input
            type="text"
            placeholder="Search active crop listings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-emerald-950 border border-emerald-500/30 rounded-xl text-xs text-emerald-100 focus:outline-none focus:border-emerald-400"
          />
        </div>
        <span className="text-xs font-semibold text-emerald-300/70">
          Showing {filteredListings.length} Active Lots
        </span>
      </div>

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredListings.map((list) => (
          <div 
            key={list.id} 
            className="glass-panel p-5 rounded-3xl border border-emerald-500/20 flex flex-col justify-between hover:border-emerald-400/30 transition-all space-y-4"
          >
            {/* Header info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-emerald-400/80 font-bold block uppercase">
                  {list.cropName} • {list.variety}
                </span>
                
                <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                  list.status === 'Sold'
                    ? 'bg-rose-500/20 border-rose-500/30 text-rose-300'
                    : list.status === 'Bids Pending'
                    ? 'bg-amber-500/20 border-amber-500/30 text-amber-300'
                    : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                }`}>
                  {list.status}
                </span>
              </div>

              {/* Core metrics */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-900/40 border border-emerald-500/10">
                  <span className="text-[9px] font-bold text-emerald-400 block uppercase">Quantity</span>
                  <span className="font-extrabold text-emerald-100 flex items-center gap-1 mt-0.5">
                    <Scale className="w-3.5 h-3.5 text-emerald-400" />
                    {list.quantity}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-900/40 border border-emerald-500/10">
                  <span className="text-[9px] font-bold text-emerald-400 block uppercase">Expected</span>
                  <span className="font-extrabold text-emerald-100 flex items-center gap-1 mt-0.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-400" />
                    {list.expectedPrice}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-900/40 border border-emerald-500/10">
                  <span className="text-[9px] font-bold text-emerald-400 block uppercase">Harvest Date</span>
                  <span className="font-bold text-emerald-200/90 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    {list.harvestDate.slice(5)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-emerald-300/60 pt-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Farm Location: {list.location}</span>
              </div>
            </div>

            {/* Bids area */}
            <div className="pt-3 border-t border-emerald-900/40 space-y-2">
              <span className="text-[10px] font-bold text-emerald-300 uppercase block">Wholesaler Bids Received:</span>
              
              {list.bids.length === 0 ? (
                <p className="text-[11px] text-emerald-300/40 italic py-1">No bids received yet. Crop listing is visible to buyers.</p>
              ) : (
                <div className="space-y-2">
                  {list.bids.map(bid => (
                    <div 
                      key={bid.id} 
                      className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/10 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-emerald-100">{bid.buyer}</span>
                        <span className="text-[10px] text-emerald-400 block mt-0.5">Bid amount: <strong className="text-emerald-300">{bid.amount}</strong></span>
                      </div>

                      {list.status !== 'Sold' && bid.status === 'Pending' ? (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleDeclineBid(list.id, bid.id)}
                            className="p-1.5 rounded-lg bg-emerald-900/40 text-rose-400 border border-rose-500/20 hover:bg-rose-950/40 transition-colors"
                            title="Decline bid"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            onClick={() => handleAcceptBid(list.id, bid.id, bid.buyer, bid.amount)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500 text-emerald-950 font-extrabold hover:brightness-110 flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept</span>
                          </button>
                        </div>
                      ) : (
                        <span className={`text-[10px] font-bold ${
                          bid.status === 'Accepted' ? 'text-emerald-400' : 'text-emerald-300/40'
                        }`}>
                          {bid.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
