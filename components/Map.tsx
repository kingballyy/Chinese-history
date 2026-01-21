import React, { useMemo } from 'react';
import { getMapState, EVENTS, YELLOW_RIVER_PATH, YANGTZE_RIVER_PATH, LAND_PATH, TAIWAN_PATH, HAINAN_PATH, JAPAN_PATH } from '../constants';
import { HistoricalEvent, Territory, Relationship } from '../types';
import { Swords, Handshake, Shield, Flag } from 'lucide-react';

interface MapProps {
  currentYear: number;
  onSelectFaction: (id: string) => void;
  onSelectEvent: (event: HistoricalEvent) => void;
}

const Map: React.FC<MapProps> = ({ currentYear, onSelectFaction, onSelectEvent }) => {
  const mapState = useMemo(() => getMapState(currentYear), [currentYear]);

  // Filter events near this year (exact or very close range for display on map)
  const currentEvents = useMemo(() => {
    return EVENTS.filter(e => Math.abs(currentYear - e.year) <= 2 && e.location);
  }, [currentYear]);

  // Helper to find coords for relationships
  const getTerritoryCenter = (id: string): {x: number, y: number} | null => {
    const t = mapState.territories.find(t => t.id === id);
    return t ? { x: t.centerX, y: t.centerY } : null;
  };

  const getRelationshipStyle = (type: string) => {
    switch (type) {
        case 'war': return { stroke: '#ef4444', strokeDasharray: '5,5', strokeWidth: 2.5, animation: 'pulse 1s infinite' }; // Red dashed
        case 'alliance': return { stroke: '#3b82f6', strokeDasharray: '0', strokeWidth: 3 }; // Blue solid
        case 'vassal': return { stroke: '#22c55e', strokeDasharray: '2,2', strokeWidth: 2 }; // Green dotted
        case 'peace': return { stroke: '#94a3b8', strokeDasharray: '10,5', strokeWidth: 2 }; // Grey long dash
        default: return { stroke: '#cbd5e1', strokeWidth: 1 };
    }
  };

  return (
    <div className="relative w-full h-full bg-[#dbeafe] overflow-hidden rounded-xl shadow-inner border border-stone-200">
      
      <svg 
        viewBox="0 0 800 600" 
        className="w-full h-full object-contain map-texture relative z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Light Terrain Pattern */}
          <pattern id="land-pattern-light" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
             <rect width="40" height="40" fill="#fefce8" /> {/* Light Yellow/Cream */}
             {/* Subtle noise/topography lines */}
             <path d="M0,40 l40,-40 M-10,10 l20,-20 M30,50 l20,-20" stroke="#fcd34d" strokeWidth="1" opacity="0.3" />
          </pattern>
        </defs>

        {/* --- GEOGRAPHY LAYER --- */}
        
        {/* Landmass */}
        <path d={LAND_PATH} fill="url(#land-pattern-light)" stroke="#d1d5db" strokeWidth="1.5" />
        
        {/* Islands */}
        <path d={TAIWAN_PATH} fill="url(#land-pattern-light)" stroke="#d1d5db" strokeWidth="1.5" />
        <path d={HAINAN_PATH} fill="url(#land-pattern-light)" stroke="#d1d5db" strokeWidth="1.5" />
        <path d={JAPAN_PATH} fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1.5" />

        {/* Rivers */}
        <path d={YELLOW_RIVER_PATH} fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <path d={YANGTZE_RIVER_PATH} fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

        {/* --- POLITICAL LAYER --- */}

        {/* Territories */}
        {mapState.territories.map((t, idx) => (
          <g key={`${t.id}-${idx}`} 
             className="transition-all duration-700 ease-in-out group cursor-pointer"
             onClick={() => onSelectFaction(t.id)}
          >
            {/* Main Shape */}
            <path
              d={t.path}
              fill={t.color}
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="0.5"
              fillOpacity="0.85"
              className="group-hover:fill-opacity-100 transition-all hover:stroke-black/30"
              style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.2))' }}
            >
              <title>点击查看 {t.name} 详情</title>
            </path>
            
            {/* Territory Label */}
            <text
              x={t.centerX}
              y={t.centerY}
              textAnchor="middle"
              fill="#1c1917"
              fontSize="14"
              fontWeight="bold"
              className="pointer-events-none select-none font-sans tracking-widest map-label-halo"
            >
              {t.name}
            </text>
          </g>
        ))}

        {/* Relationships Lines */}
        {mapState.relationships.map((rel, idx) => {
            const start = getTerritoryCenter(rel.sourceId);
            const end = getTerritoryCenter(rel.targetId);
            if (!start || !end) return null;

            const style = getRelationshipStyle(rel.type);
            return (
                <g key={`rel-${idx}`} className="pointer-events-none">
                    <line 
                        x1={start.x} y1={start.y} 
                        x2={end.x} y2={end.y} 
                        stroke={style.stroke} 
                        strokeWidth={style.strokeWidth} 
                        strokeDasharray={style.strokeDasharray}
                        opacity="0.8"
                    />
                    {/* Relationship Icon in middle */}
                    <circle cx={(start.x + end.x)/2} cy={(start.y + end.y)/2} r="8" fill="#fff" stroke={style.stroke} strokeWidth="1" />
                    <text x={(start.x + end.x)/2} y={(start.y + end.y)/2} dy="3" textAnchor="middle" fontSize="8">
                        {rel.type === 'war' ? '⚔️' : rel.type === 'alliance' ? '🤝' : rel.type === 'vassal' ? '🛡️' : '🏳️'}
                    </text>
                </g>
            );
        })}

        {/* Event Markers */}
        {currentEvents.map((evt, idx) => (
            <g key={`evt-${idx}`} 
               onClick={() => onSelectEvent(evt)} 
               className="cursor-pointer hover:scale-110 transition-transform origin-center"
            >
                {/* Ping Effect */}
                <circle cx={evt.location?.x} cy={evt.location?.y} r="20" fill="none" stroke="#d97706" strokeWidth="1" opacity="0.5">
                    <animate attributeName="r" from="10" to="30" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                
                <circle cx={evt.location?.x} cy={evt.location?.y} r="6" fill="#d97706" stroke="white" strokeWidth="2" className="shadow-lg" />
                
                {/* Event Label Box */}
                <rect 
                    x={(evt.location?.x || 0) - (evt.title.length * 6 + 10)} 
                    y={(evt.location?.y || 0) + 15} 
                    width={evt.title.length * 12 + 20} 
                    height="20" 
                    rx="4" 
                    fill="rgba(255,255,255,0.9)" 
                    stroke="#d97706" 
                    strokeWidth="0.5"
                    className="shadow-sm"
                />
                <text 
                    x={evt.location?.x} 
                    y={(evt.location?.y || 0) + 29} 
                    textAnchor="middle" 
                    fill="#92400e" 
                    fontSize="11" 
                    fontWeight="bold" 
                >
                    {evt.title}
                </text>
            </g>
        ))}

      </svg>

      {/* Info Overlay (Year) */}
      <div className="absolute top-8 right-8 pointer-events-none z-20 text-right">
         <h1 className="text-6xl font-sans font-bold text-gray-800 drop-shadow-sm tracking-tighter tabular-nums">
            {currentYear < 0 ? `BC ${Math.abs(currentYear)}` : `AD ${currentYear}`}
         </h1>
         <div className="flex flex-col items-end mt-2">
            <h2 className="text-3xl font-serif text-amber-700 font-bold tracking-widest border-b-2 border-amber-500 pb-1 px-2 bg-white/50 rounded">{mapState.label}</h2>
         </div>
      </div>

      {/* Legend - Light Mode */}
      <div className="absolute bottom-6 left-6 bg-white/80 p-4 rounded-lg border border-stone-200 shadow-xl backdrop-blur-md z-20">
        <h4 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-widest">MAP KEY</h4>
        <div className="flex flex-col gap-3 text-xs text-gray-700">
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-[#fefce8] border border-stone-300"></div> <span>地形</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-[#dbeafe] border border-blue-200"></div> <span>海域</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-[#ef4444] shadow-sm"></div> <span>战争状态</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-[#d97706] shadow-sm"></div> <span>重大事件</span></div>
        </div>
      </div>
    </div>
  );
};

export default Map;