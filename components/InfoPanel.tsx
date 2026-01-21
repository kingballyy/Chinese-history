import React from 'react';
import { Dynasty, HistoricalEvent } from '../types';
import { DYNASTIES, EVENTS } from '../constants';
import { Info, BookOpen } from 'lucide-react';

interface InfoPanelProps {
  currentYear: number;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ currentYear }) => {
  const currentDynasty = DYNASTIES.find(d => currentYear >= d.startYear && currentYear <= d.endYear);
  
  // Find events that happened recently (within 50 years window for context)
  const nearbyEvents = EVENTS.filter(e => Math.abs(currentYear - e.year) < 20).sort((a, b) => Math.abs(currentYear - a.year) - Math.abs(currentYear - b.year));

  return (
    <div className="bg-white h-full overflow-y-auto custom-scrollbar flex flex-col">
      {/* Sticky Header for Dynasty */}
      <div className="p-6 border-b border-stone-200 bg-white/95 backdrop-blur sticky top-0 z-10">
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 flex items-center">
            <Info size={12} className="mr-2" /> CURRENT ERA
        </h3>
        {currentDynasty ? (
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900">
                {currentDynasty.name}
            </h2>
            <div className="flex items-center gap-2 mt-2 mb-3">
                 <span className="w-2 h-2 rounded-full" style={{backgroundColor: currentDynasty.color}}></span>
                 <p className="text-xs font-mono text-gray-500">
                    {currentDynasty.startYear} — {currentDynasty.endYear}
                </p>
            </div>
            
            <p className="text-sm text-gray-700 leading-relaxed">
                {currentDynasty.description}
            </p>
          </div>
        ) : (
            <div className="text-gray-400 italic text-sm">此期间处于乱世或朝代更替期。</div>
        )}
      </div>

      {/* Events List */}
      <div className="p-6 flex-1">
        <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center sticky top-0">
            <BookOpen size={12} className="mr-2" /> KEY EVENTS
        </h3>
        
        <div className="relative border-l border-stone-200 ml-2 space-y-6">
            {nearbyEvents.length > 0 ? nearbyEvents.map((e, idx) => (
                <div key={idx} className="relative pl-6">
                    {/* Timeline dot */}
                    <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-amber-500"></div>
                    
                    <div className="bg-stone-50 p-4 rounded-lg border border-stone-100 hover:border-stone-200 transition-colors shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                             <span className="font-bold text-gray-900 text-sm">{e.title}</span>
                             <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-200 whitespace-nowrap ml-2">
                                 {e.year}
                             </span>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">{e.description}</p>
                    </div>
                </div>
            )) : (
                <p className="text-xs text-gray-400 pl-6 italic">暂无重大历史事件记录。</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;