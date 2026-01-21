import React, { useState, useEffect, useRef } from 'react';
import Map from './components/Map';
import Timeline from './components/Timeline';
import InfoPanel from './components/InfoPanel';
import { Play, Pause, RotateCcw, X, Map as MapIcon, Maximize2 } from 'lucide-react';
import { HistoricalEvent, FactionDetail } from './types';
import { FACTION_DETAILS } from './constants';

const INITIAL_YEAR = -221; 

const App: React.FC = () => {
  const [year, setYear] = useState<number>(INITIAL_YEAR);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Modal States
  const [selectedFaction, setSelectedFaction] = useState<FactionDetail | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);

  // Playback logic
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setYear((prev) => {
          if (prev >= 1912) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 5;
        });
      }, 100); // 100ms per 5 years speed
    } else {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const reset = () => {
    setIsPlaying(false);
    setYear(INITIAL_YEAR);
  };

  const handleFactionSelect = (id: string) => {
      const detail = FACTION_DETAILS[id];
      if (detail) {
          setIsPlaying(false); // Pause on interaction
          setSelectedFaction(detail);
      }
  };

  const handleEventSelect = (evt: HistoricalEvent) => {
      setIsPlaying(false);
      setSelectedEvent(evt);
  };

  const closeModal = () => {
      setSelectedFaction(null);
      setSelectedEvent(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-stone-100 font-sans text-gray-800 overflow-hidden">
      
      {/* Header - Light */}
      <header className="h-14 bg-white border-b border-stone-200 flex items-center justify-between px-6 shrink-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center border border-red-800/20 text-white shadow-sm">
                <span className="text-lg">🇨🇳</span>
            </div>
            <div>
                <h1 className="text-sm font-bold tracking-[0.2em] text-gray-900 uppercase">China History Atlas</h1>
                <p className="text-[10px] text-gray-500 tracking-wide uppercase">Interactive Time-Lapse</p>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button 
                onClick={togglePlay}
                className={`flex items-center gap-2 px-6 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all ${isPlaying ? 'bg-amber-600 text-white shadow-md hover:bg-amber-700' : 'bg-stone-100 text-gray-600 hover:bg-stone-200'}`}
            >
                {isPlaying ? <><Pause size={14} /> PAUSE</> : <><Play size={14} /> PLAY</>}
            </button>
            <button 
                onClick={reset}
                className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
                title="Reset Timeline"
            >
                <RotateCcw size={16} />
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Map Container */}
        <main className="flex-1 relative bg-stone-200 p-0 overflow-hidden flex flex-col">
            <Map 
                currentYear={year} 
                onSelectFaction={handleFactionSelect} 
                onSelectEvent={handleEventSelect}
            />
        </main>

        {/* Info Sidebar */}
        <aside className="hidden md:block w-80 bg-white border-l border-stone-200 z-30 shadow-xl">
            <InfoPanel currentYear={year} />
        </aside>
      </div>

      {/* Timeline Fixed Bottom */}
      <div className="shrink-0 z-50">
        <Timeline currentYear={year} onYearChange={setYear} isPlaying={isPlaying} />
      </div>

      {/* --- MODALS (Light Theme) --- */}

      {/* Faction Details Modal */}
      {selectedFaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
              <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-stone-200 relative overflow-hidden flex flex-col max-h-[90vh]">
                  {/* Header Image / Gradient */}
                  <div className="h-24 bg-gradient-to-r from-red-50 to-stone-100 relative flex items-center px-6 border-b border-stone-200">
                      <h2 className="text-3xl font-serif font-bold text-gray-900 relative z-10">{selectedFaction.name}</h2>
                      <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
                  </div>

                  <div className="p-6 overflow-y-auto space-y-6 text-gray-700 custom-scrollbar">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                           <h4 className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1">Duration</h4>
                           <p className="font-mono text-sm text-gray-900">{selectedFaction.duration}</p>
                        </div>
                        <div>
                           <h4 className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-1">Key Rulers</h4>
                           <p className="text-sm text-gray-900">{selectedFaction.rulers}</p>
                        </div>
                      </div>

                      <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Cultural Highlights</h4>
                          <p className="text-sm leading-relaxed text-gray-800">{selectedFaction.culture}</p>
                      </div>

                      <div className="bg-stone-50 p-4 rounded-lg border border-stone-100">
                          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Major Events</h4>
                          <p className="text-sm leading-relaxed text-gray-800">{selectedFaction.events}</p>
                      </div>

                      <div>
                          <h4 className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-2">Historical Impact</h4>
                          <p className="text-sm italic text-gray-600 border-l-2 border-amber-300 pl-4">{selectedFaction.impact}</p>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
              <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border border-stone-200 overflow-hidden relative">
                   <div className="bg-amber-50 border-b border-amber-100 p-6 relative">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-amber-700 font-bold text-xs uppercase tracking-widest mb-1">Historical Event</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedEvent.title}</h2>
                                <span className="text-xs font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-stone-200">
                                    {selectedEvent.year < 0 ? `BC ${Math.abs(selectedEvent.year)}` : `AD ${selectedEvent.year}`}
                                </span>
                            </div>
                            <MapIcon size={32} className="text-amber-300" />
                        </div>
                        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"><X size={18} /></button>
                   </div>
                   
                   <div className="p-6 space-y-4 text-gray-700">
                        <p className="leading-relaxed text-sm">
                            {selectedEvent.details || selectedEvent.description}
                        </p>
                        <div className="bg-stone-50 p-3 rounded border border-stone-100">
                             <h4 className="text-stone-500 font-bold text-xs uppercase mb-1">Impact</h4>
                             <p className="text-gray-600 text-xs">{selectedEvent.impact}</p>
                        </div>
                   </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default App;