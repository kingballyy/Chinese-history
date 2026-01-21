import React, { useRef, useEffect } from 'react';
import { Dynasty } from '../types';
import { DYNASTIES } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineProps {
  currentYear: number;
  onYearChange: (year: number) => void;
  isPlaying: boolean;
}

const MIN_YEAR = -1046;
const MAX_YEAR = 1912;
const TOTAL_YEARS = MAX_YEAR - MIN_YEAR;

const Timeline: React.FC<TimelineProps> = ({ currentYear, onYearChange }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the timeline container to keep the current year in view
  useEffect(() => {
    if (scrollRef.current) {
        const percentage = (currentYear - MIN_YEAR) / TOTAL_YEARS;
        const scrollWidth = scrollRef.current.scrollWidth;
        const clientWidth = scrollRef.current.clientWidth;
        const targetScroll = percentage * scrollWidth - clientWidth / 2;
        
        scrollRef.current.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }
  }, [currentYear]);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newYear = Math.round(MIN_YEAR + percentage * TOTAL_YEARS);
      onYearChange(Math.max(MIN_YEAR, Math.min(MAX_YEAR, newYear)));
  };

  const getDynastyWidth = (d: Dynasty) => {
    const span = d.endYear - d.startYear;
    return (span / TOTAL_YEARS) * 100;
  };

  const getDynastyLeft = (d: Dynasty) => {
    const startOffset = d.startYear - MIN_YEAR;
    return (startOffset / TOTAL_YEARS) * 100;
  };

  const jumpDynasty = (direction: 'prev' | 'next') => {
      const currentDynastyIndex = DYNASTIES.findIndex(d => currentYear >= d.startYear && currentYear <= d.endYear);
      let targetIndex = currentDynastyIndex;

      if (currentDynastyIndex === -1) {
          targetIndex = DYNASTIES.findIndex(d => d.startYear > currentYear);
          if (direction === 'prev') targetIndex = targetIndex - 1;
      } else {
          targetIndex = direction === 'next' ? currentDynastyIndex + 1 : currentDynastyIndex - 1;
      }

      if (targetIndex >= 0 && targetIndex < DYNASTIES.length) {
          onYearChange(DYNASTIES[targetIndex].startYear);
      }
  };

  return (
    <div className="w-full bg-white border-t border-stone-200 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-30 flex flex-col gap-4">
      
      {/* Controls */}
      <div className="flex justify-between items-center px-4">
        <button 
            onClick={() => jumpDynasty('prev')}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors flex items-center text-xs font-bold text-stone-500 uppercase tracking-wider"
        >
            <ChevronLeft size={16} className="mr-1" /> PREV ERA
        </button>
        
        <div className="text-center w-full max-w-2xl mx-auto px-4">
            <input 
                type="range" 
                min={MIN_YEAR} 
                max={MAX_YEAR} 
                value={currentYear} 
                onChange={(e) => onYearChange(parseInt(e.target.value))}
                className="w-full h-1 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
        </div>

        <button 
            onClick={() => jumpDynasty('next')}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors flex items-center text-xs font-bold text-stone-500 uppercase tracking-wider"
        >
            NEXT ERA <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      {/* Visual Dynasty Strip */}
      <div 
        ref={scrollRef}
        className="relative w-full h-14 bg-stone-50 rounded-lg overflow-x-auto overflow-y-hidden border border-stone-200 select-none custom-scrollbar shadow-inner"
      >
        <div 
            className="relative h-full" 
            style={{ width: '200%' }}
            onClick={handleTrackClick}
        >
            {/* Year Markers Grid */}
            <div className="absolute inset-0 flex" style={{ pointerEvents: 'none' }}>
               {Array.from({ length: 20 }).map((_, i) => (
                   <div key={i} className="flex-1 border-r border-stone-200 h-full relative">
                       <span className="absolute bottom-1 right-1 text-[9px] text-stone-400 font-mono">
                           {Math.round(MIN_YEAR + (TOTAL_YEARS / 20) * (i + 1))}
                       </span>
                   </div>
               ))}
            </div>

            {/* Dynasties Blocks */}
            {DYNASTIES.map((d) => (
                <div
                    key={d.id}
                    className="absolute top-2 bottom-2 rounded flex items-center justify-center text-[10px] font-bold text-gray-800 shadow-sm cursor-pointer hover:brightness-95 hover:z-10 transition-all border-l border-white/40 whitespace-nowrap overflow-hidden px-2 backdrop-blur-sm"
                    style={{
                        left: `${getDynastyLeft(d)}%`,
                        width: `${getDynastyWidth(d)}%`,
                        backgroundColor: `${d.color}40`, // 25% Opacity hex
                        borderLeftColor: d.color
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onYearChange(d.startYear);
                    }}
                    title={`${d.name} (${d.startYear} ~ ${d.endYear})`}
                >
                    {d.name}
                </div>
            ))}

            {/* Current Year Indicator Line */}
            <div 
                className="absolute top-0 bottom-0 w-0.5 bg-amber-600 z-20"
                style={{
                    left: `${((currentYear - MIN_YEAR) / TOTAL_YEARS) * 100}%`
                }}
            >
                <div className="absolute -top-1 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-amber-600"></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;