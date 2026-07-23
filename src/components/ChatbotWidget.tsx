import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Image as ImageIcon, 
  Volume2, 
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { chatWithAgroBot, textToSpeech, analyzePlantImage } from '../services/aiEngine';


interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  image?: string;
  timestamp: string;
}

export const ChatbotWidget: React.FC = () => {
  const { user } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: `Hello ${user.name}! I am your AgroGen 24/7 AI Smart Farming Assistant. You can ask me questions about crop diseases, pest control, fertilizers, or upload a leaf picture!`,
      timestamp: 'Just now'
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const presetQuestions = [
    "My tomato leaves are turning yellow.",
    "What fertilizer should I use?",
    "How much water does wheat need?",
    "What insect is this?",
    "How to grow strawberries?"
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() && !attachedImage) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      image: attachedImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    const currentImg = attachedImage;
    setAttachedImage(null);
    setIsTyping(true);

    let reply = '';
    if (currentImg) {
      const diag = await analyzePlantImage(currentImg, 'chat_upload.jpg', user.cropType);
      reply = `📸 I analyzed your uploaded leaf image!
      
• Diagnostic: ${diag.name}
• Severity: ${diag.severity} (${diag.confidence}% confidence)
• Affected Area: ${diag.affectedArea}

🌱 Organic Treatment:
${diag.treatment.organic.map((o) => `• ${o}`).join('\n')}

🧪 Recommended Pesticide/Fertilizer:
${diag.recommendedFertilizers.concat(diag.recommendedPesticides).join(', ')}`;
    } else {
      reply = await chatWithAgroBot(query, user.cropType);
    }

    setIsTyping(false);
    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, botMsg]);
  };

  // Voice Speech Recognition setup
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported on your browser.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      setIsListening(false);
    }
  };

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAttachedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-4 rounded-full bg-gradient-to-tr from-emerald-600 via-green-500 to-teal-400 text-emerald-950 font-extrabold shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <Bot className="w-7 h-7 text-emerald-950 animate-bounce" />
          <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider shadow">
            AI 24/7
          </span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[520px] glass-panel rounded-3xl border border-emerald-500/40 shadow-2xl flex flex-col overflow-hidden bg-emerald-950/95 backdrop-blur-xl animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-emerald-900/80 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-emerald-100">AgroGen Smart AI Advisor</h4>
                <span className="text-[10px] text-emerald-400/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Online • Multi-lingual & Vision Active
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 hover:bg-emerald-800/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            
            {/* Presets Chips */}
            <div className="space-y-1 pb-2 border-b border-emerald-900/40">
              <span className="text-[10px] text-emerald-400/60 font-semibold block uppercase">Preset Questions:</span>
              <div className="flex flex-wrap gap-1.5">
                {presetQuestions.map((pq, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(pq)}
                    className="px-2.5 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/20 text-[10px] text-emerald-200 hover:border-emerald-400 transition-colors text-left"
                  >
                    {pq}
                  </button>
                ))}
              </div>
            </div>

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 text-xs ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl space-y-1 ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-emerald-950 font-medium rounded-tr-none'
                      : 'bg-emerald-900/60 border border-emerald-500/20 text-emerald-100 rounded-tl-none'
                  }`}
                >
                  {m.image && (
                    <img src={m.image} alt="Attachment" className="w-full h-32 object-cover rounded-xl mb-2" />
                  )}

                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                  <div className="flex items-center justify-between text-[9px] opacity-70 pt-1">
                    <span>{m.timestamp}</span>
                    {m.sender === 'bot' && (
                      <button
                        onClick={() => textToSpeech(m.text)}
                        className="p-1 hover:text-emerald-300"
                        title="Read Aloud"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 mt-1 font-bold text-[10px]">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-emerald-400 text-xs italic">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AgroGen AI is formulating response...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Attached Image Preview */}
          {attachedImage && (
            <div className="px-4 py-2 bg-emerald-900/80 border-t border-emerald-800/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={attachedImage} alt="Attachment" className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-[10px] text-emerald-300 font-bold">Image Attached</span>
              </div>
              <button onClick={() => setAttachedImage(null)} className="text-emerald-400 hover:text-rose-400">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-emerald-900/60 border-t border-emerald-500/20 flex items-center gap-2">
            
            {/* Image Upload */}
            <label className="p-2 rounded-xl bg-emerald-950/80 text-emerald-300 hover:bg-emerald-800/60 cursor-pointer">
              <ImageIcon className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handleImageAttach} className="hidden" />
            </label>

            {/* Voice Input */}
            <button
              onClick={toggleVoiceInput}
              className={`p-2 rounded-xl transition-colors ${
                isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-950/80 text-emerald-300 hover:bg-emerald-800/60'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              placeholder="Ask anything about your crops..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-emerald-950/80 border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-emerald-100 focus:outline-none focus:border-emerald-400"
            />

            {/* Send */}
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-emerald-500 text-emerald-950 hover:brightness-110 shadow-md shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
            </button>

          </div>

        </div>
      )}

    </div>
  );
};
