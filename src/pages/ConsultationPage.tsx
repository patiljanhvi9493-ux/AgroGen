import React, { useState } from 'react';
import { 
  UserCheck, 
  Video, 
  Phone, 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { MOCK_EXPERTS } from '../data/mockData';
import type { Expert } from '../data/mockData';
import { useApp } from '../context/AppContext';


export const ConsultationPage: React.FC = () => {
  const { user } = useApp();
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [consultType, setConsultType] = useState<'video' | 'voice' | 'chat'>('video');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  const handleBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setSelectedExpert(null);
      alert(`Consultation booked successfully with ${selectedExpert?.name}! Details sent to ${user.phone}.`);
    }, 1600);
  };

  return (
    <div className="space-y-8 py-4 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
          <UserCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>Verified Agronomist Network</span>
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-100">Expert Doctor Consultation</h1>
        <p className="text-xs text-emerald-300/70">
          Book 1-on-1 video, voice, or chat consultations with certified plant pathologists and crop specialists.
        </p>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {MOCK_EXPERTS.map((exp) => (
          <div
            key={exp.id}
            className="glass-card p-6 rounded-3xl space-y-4 border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <img src={exp.image} alt={exp.name} className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400/40" />
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{exp.rating}</span>
                  </div>
                  <h3 className="text-base font-bold text-emerald-100">{exp.name}</h3>
                  <span className="text-xs text-emerald-300/80 block">{exp.title}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 space-y-1 text-xs text-emerald-100/80">
                <p><strong>Specialization:</strong> {exp.specialization}</p>
                <p><strong>Experience:</strong> {exp.experienceYears} Years</p>
                <p><strong>Languages:</strong> {exp.languages.join(', ')}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-900/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400/70 block">Consultation Fee</span>
                <span className="text-lg font-black text-emerald-300">${exp.consultationFee.toFixed(2)}</span>
              </div>

              <button
                onClick={() => { setSelectedExpert(exp); setSelectedSlot(exp.availableSlots[0]); }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-emerald-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:brightness-110"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Slot Selection Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel rounded-3xl border border-emerald-500/40 p-6 space-y-6 relative">
            
            <button
              onClick={() => setSelectedExpert(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800/80"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <img src={selectedExpert.image} alt={selectedExpert.name} className="w-12 h-12 rounded-full object-cover border border-emerald-400/40" />
              <div>
                <h3 className="text-lg font-bold text-emerald-100">{selectedExpert.name}</h3>
                <span className="text-xs text-emerald-300/80">{selectedExpert.title}</span>
              </div>
            </div>

            {/* Consultation Mode */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-200 block">Select Consultation Mode:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { type: 'video' as const, label: 'Video Call', icon: Video },
                  { type: 'voice' as const, label: 'Voice Call', icon: Phone },
                  { type: 'chat' as const, label: 'Live Chat', icon: MessageSquare }
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isSel = consultType === mode.type;
                  return (
                    <button
                      key={mode.type}
                      onClick={() => setConsultType(mode.type)}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        isSel
                          ? 'bg-emerald-500 text-emerald-950 border-emerald-400 shadow-md'
                          : 'bg-emerald-900/40 border-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Available Time Slots */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-200 block">Select Available Time Slot:</label>
              <div className="space-y-1.5">
                {selectedExpert.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      selectedSlot === slot
                        ? 'bg-teal-500/30 border-teal-400 text-teal-200'
                        : 'bg-emerald-900/30 border-emerald-500/20 text-emerald-300 hover:bg-emerald-800/40'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm button */}
            <button
              onClick={handleBooking}
              disabled={bookingConfirmed}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 text-emerald-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:brightness-110 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{bookingConfirmed ? 'Confirming Appointment...' : `Pay $${selectedExpert.consultationFee.toFixed(2)} & Confirm Booking`}</span>
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
