import { Dynasty, MapState, HistoricalEvent, Relationship, FactionDetail, Territory } from './types';

// --- REALISTIC GEOGRAPHIC PATHS (800x600 ViewBox) ---
// Coordinate Reference: roughly (0,0) is NW Asia, (800,600) is SE Asia.

// 1. Geography Base Layers
export const GEO_COASTLINE = "M 800,0 L 0,0 L 0,600 L 800,600 L 800,0 Z M 500,100 L 520,110 L 530,90 L 560,80 L 600,60 L 620,100 L 610,130 L 650,130 L 670,160 L 660,180 L 700,180 L 720,200 L 710,230 L 650,230 L 660,260 L 630,280 L 680,310 L 670,340 L 640,360 L 620,400 L 630,420 L 600,440 L 580,480 L 540,490 L 520,520 L 480,510 L 450,540 L 450,600 L 0,600 L 0,0 L 800,0 L 800,600 L 450,600";
export const LAND_PATH = "M 0,0 L 800,0 L 800,50 L 700,50 L 650,20 L 600,60 L 620,100 L 610,130 L 650,130 L 670,160 L 660,180 L 700,180 L 720,200 L 710,230 L 650,230 L 660,260 L 630,280 L 680,310 L 670,340 L 640,360 L 620,400 L 630,420 L 600,440 L 580,480 L 540,490 L 520,520 L 480,510 L 450,540 L 450,600 L 0,600 Z";
export const TAIWAN_PATH = "M 690,430 L 710,440 L 705,470 L 685,460 Z";
export const HAINAN_PATH = "M 530,530 L 560,540 L 550,570 L 520,560 Z";
export const JAPAN_PATH = "M 750,250 L 780,260 L 770,300 L 740,290 Z M 760,320 L 790,330 L 780,350 L 750,340 Z";

// 2. Realistic Rivers
export const YELLOW_RIVER_PATH = "M 250,250 C 300,200 350,150 400,200 C 450,250 480,260 550,220 L 600,210";
export const YANGTZE_RIVER_PATH = "M 200,300 C 250,350 300,320 350,340 C 400,360 450,380 500,350 C 550,320 600,330 650,310";

// 3. Historical Border Templates

// Core & Unified
const SHAPE_CORE = "M 400,200 L 500,180 L 580,200 L 600,250 L 550,300 L 450,300 L 380,250 Z";
const SHAPE_UNIFIED_PROPER = "M 300,200 L 450,150 L 600,160 L 680,180 L 650,230 L 660,260 L 640,350 L 600,440 L 540,490 L 520,520 L 480,510 L 400,400 L 300,350 L 250,280 Z";
const SHAPE_TANG_MAX = "M 50,150 L 300,180 L 450,150 L 600,160 L 680,180 L 650,230 L 660,260 L 640,350 L 600,440 L 540,490 L 520,520 L 480,510 L 400,400 L 300,350 L 250,350 L 100,250 Z";
const SHAPE_MASSIVE = "M 20,50 L 750,20 L 750,200 L 650,230 L 660,260 L 680,310 L 670,340 L 640,360 L 620,400 L 630,420 L 600,440 L 580,480 L 540,490 L 520,520 L 480,510 L 450,540 L 300,500 L 100,400 L 20,300 Z";

// External / Barbarian Shapes
const SHAPE_STEPPE_FULL = "M 0,0 L 800,0 L 800,150 L 600,150 L 450,140 L 300,170 L 0,140 Z"; // Xiongnu/Turks/Mongols
const SHAPE_STEPPE_EAST = "M 450,0 L 800,0 L 800,180 L 600,150 L 450,140 Z"; // Donghu/Xianbei
const SHAPE_STEPPE_WEST = "M 0,0 L 450,0 L 450,140 L 300,170 L 0,140 Z"; // Later Xiongnu split
const SHAPE_TIBET = "M 0,250 L 250,280 L 250,450 L 0,450 Z"; // Tubo/Qiang
const SHAPE_WESTERN_REGIONS = "M 0,140 L 200,160 L 250,250 L 150,280 L 0,250 Z"; // Xiyu
const SHAPE_MANCHURIA = "M 600,0 L 800,0 L 800,200 L 650,180 L 600,150 Z"; // Jurchen/Manchu origin

// Song Era
const SHAPE_SONG_NORTH = "M 350,250 L 550,250 L 600,300 L 640,350 L 600,440 L 540,490 L 520,520 L 480,510 L 400,400 L 350,350 Z";
const SHAPE_SONG_SOUTH = "M 350,320 L 580,320 L 640,350 L 600,440 L 540,490 L 520,520 L 480,510 L 400,400 L 350,350 Z";
const SHAPE_NORTH_STEPPE = "M 100,50 L 700,50 L 720,200 L 650,230 L 550,220 L 350,220 L 200,150 Z"; // Liao/Jin

// 16 Kingdoms / Northern & Southern Dynasties Specific Shapes
const SHAPE_CHENG_HAN = "M 200,300 L 280,300 L 300,350 L 250,400 L 200,380 Z";
const SHAPE_EASTERN_JIN = "M 300,320 L 640,350 L 600,440 L 540,490 L 400,450 Z";
const SHAPE_LATER_ZHAO = "M 300,200 L 550,180 L 580,250 L 350,280 L 280,250 Z";
const SHAPE_FORMER_YAN = "M 550,150 L 650,150 L 680,220 L 580,250 Z";
const SHAPE_FORMER_LIANG = "M 100,180 L 300,200 L 280,280 L 120,250 Z";
const SHAPE_FORMER_QIN_MAX = "M 100,150 L 600,160 L 650,230 L 550,320 L 200,320 Z";

const SHAPE_NORTHERN_WEI = "M 150,150 L 600,160 L 650,230 L 550,320 L 250,320 Z";
const SHAPE_LIU_SONG = "M 250,320 L 640,350 L 600,480 L 400,450 Z";

const SHAPE_EASTERN_WEI = "M 450,200 L 600,180 L 640,330 L 450,320 Z";
const SHAPE_WESTERN_WEI = "M 150,200 L 450,200 L 450,320 L 200,350 Z";

const SHAPE_NORTHERN_QI = "M 450,200 L 600,180 L 640,330 L 450,320 Z";
const SHAPE_NORTHERN_ZHOU = "M 150,200 L 450,200 L 450,320 L 200,350 Z";
const SHAPE_CHEN = "M 350,350 L 630,360 L 600,460 L 400,460 Z";

// COLORS - Reverted to darker, earthier tones for Light Mode
export const DYNASTIES: Dynasty[] = [
  { id: 'xi_zhou', name: '西周', startYear: -1046, endYear: -771, color: '#7c7c7c', description: '分封制确立，礼乐文明形成。' },
  { id: 'chun_qiu', name: '春秋', startYear: -770, endYear: -476, color: '#a0522d', description: '王室衰微，诸侯争霸，晋国称霸。' },
  { id: 'zhan_guo', name: '战国', startYear: -475, endYear: -221, color: '#b91c1c', description: '三家分晋，七雄并立，变法图强。' },
  { id: 'qin', name: '秦朝', startYear: -221, endYear: -206, color: '#1a1a1a', description: '中国历史上第一个统一的多民族封建国家。' },
  { id: 'xi_han', name: '西汉', startYear: -202, endYear: 8, color: '#b22222', description: '休养生息，开通丝绸之路。' },
  { id: 'xin', name: '新朝', startYear: 9, endYear: 23, color: '#65a30d', description: '王莽改制。' },
  { id: 'dong_han', name: '东汉', startYear: 25, endYear: 220, color: '#cd5c5c', description: '光武中兴。' },
  { id: 'sanguo', name: '三国', startYear: 220, endYear: 280, color: '#d97706', description: '魏蜀吴三足鼎立。' },
  { id: 'xi_jin', name: '西晋', startYear: 266, endYear: 316, color: '#1d4ed8', description: '短暂统一，八王之乱。' },
  { id: 'dong_jin', name: '东晋十六国', startYear: 317, endYear: 420, color: '#0f766e', description: '衣冠南渡，北方五胡乱华，政权林立。' },
  { id: 'nan_bei', name: '南北朝', startYear: 420, endYear: 589, color: '#7e22ce', description: '南北对峙，民族大融合，文化多元。' },
  { id: 'sui', name: '隋朝', startYear: 581, endYear: 618, color: '#4338ca', description: '开创科举，开凿大运河。' },
  { id: 'tang', name: '唐朝', startYear: 618, endYear: 907, color: '#eab308', description: '贞观之治，开元盛世，万国来朝。' },
  { id: 'wudai', name: '五代十国', startYear: 907, endYear: 960, color: '#475569', description: '藩镇割据延续。' },
  { id: 'bei_song', name: '北宋', startYear: 960, endYear: 1127, color: '#0ea5e9', description: '经济繁荣，重文轻武。' },
  { id: 'nan_song', name: '南宋', startYear: 1127, endYear: 1279, color: '#06b6d4', description: '偏安一隅，经济重心南移。' },
  { id: 'yuan', name: '元朝', startYear: 1271, endYear: 1368, color: '#1e3a8a', description: '疆域辽阔，行省制度。' },
  { id: 'ming', name: '明朝', startYear: 1368, endYear: 1644, color: '#dc2626', description: '郑和下西洋，修筑长城。' },
  { id: 'qing', name: '清朝', startYear: 1644, endYear: 1912, color: '#5b21b6', description: '康乾盛世，近代衰落。' },
];

// --- EVENTS ---
export const EVENTS: HistoricalEvent[] = [
  { 
    year: -403, 
    title: '三家分晋', 
    description: '战国时代的开端。',
    details: '周威烈王册封韩、赵、魏三家为诸侯，标志着晋国正式分裂，春秋时代结束，战国时代开始。',
    impact: '传统的宗法分封制彻底瓦解，七雄争霸的格局正式形成。',
    location: { x: 460, y: 220 }
  },
  { 
    year: -221, 
    title: '秦统一六国', 
    description: '秦王嬴政统一中国，建立秦朝。',
    details: '秦王嬴政先后灭韩、赵、魏、楚、燕、齐六国，结束了春秋战国以来长达数百年的诸侯割据局面，建立了中国历史上第一个大一统的中央集权国家。',
    impact: '奠定了中国两千多年封建政治制度的基本格局，统一文字、度量衡，促进了民族融合。',
    location: { x: 480, y: 260 } // Xianyang
  },
  { 
    year: -200, 
    title: '白登之围', 
    description: '汉高祖被匈奴围困。',
    details: '汉高祖刘邦率军亲征匈奴，被冒顿单于四十万骑兵围困于白登山七天七夜。',
    impact: '汉朝认识到军事力量不足，开启了长达数十年的“和亲”政策。',
    location: { x: 430, y: 180 } 
  },
  { 
    year: -138, 
    title: '张骞出使西域', 
    description: '丝绸之路的开拓。',
    details: '汉武帝派遣张骞出使西域，本欲联合大月氏夹击匈奴，虽未达成军事目的，却打通了汉朝通往西域的道路。',
    impact: '开辟了著名的“丝绸之路”，促进了东西方经济文化的交流。',
    location: { x: 200, y: 250 } // West
  },
  { 
    year: 208, 
    title: '赤壁之战', 
    description: '奠定三国鼎立基础。',
    details: '孙权、刘备联军在长江赤壁（今湖北赤壁西北）一带大破曹操大军。曹操北回，孙、刘各自夺去荆州的一部分。',
    impact: '中国历史上以少胜多的著名战役，直接奠定了魏、蜀、吴三国鼎立的局面。',
    location: { x: 550, y: 340 } // Yangtze mid
  },
  { 
    year: 383, 
    title: '淝水之战', 
    description: '东晋以少胜多击败前秦。',
    details: '前秦苻坚率领八十万大军南下伐晋，在淝水（今安徽寿县）被东晋谢安、谢玄率领的八万北府兵击败。',
    impact: '前秦瞬间土崩瓦解，北方再次陷入分裂，东晋政权得以延续，南北对峙局面长期存在。',
    location: { x: 520, y: 310 } // Anhui area
  },
  { 
    year: 627, 
    title: '贞观之治', 
    description: '唐太宗李世民在位期间的清明政治。',
    details: '唐太宗李世民在位期间，虚心纳谏，厉行节约，劝课农桑，使得社会安定，经济恢复并发展，国力强盛。',
    impact: '为唐朝后来的开元盛世奠定了坚实的基础，被后世视为治世典范。',
    location: { x: 480, y: 260 } // Chang'an
  },
  { 
    year: 755, 
    title: '安史之乱', 
    description: '唐朝由盛转衰的转折点。',
    details: '身兼三镇节度使的安禄山和部将史思明发动叛乱，攻陷长安、洛阳。',
    impact: '导致唐朝人口锐减，国力大损，藩镇割据局面形成，吐蕃趁机攻占河西陇右。',
    location: { x: 500, y: 240 } 
  },
  { 
    year: 1004, 
    title: '澶渊之盟', 
    description: '宋辽缔结和约。',
    details: '北宋与辽在澶州（今河南濮阳）定下的盟约。宋每年给辽银10万两、绢20万匹，双方约为兄弟之国。',
    impact: '结束了宋辽之间长达25年的战争，此后百余年间双方保持和平，贸易繁荣。',
    location: { x: 550, y: 230 } // Near Border
  },
  { 
    year: 1127, 
    title: '靖康之变', 
    description: '金军攻破开封，北宋灭亡。',
    details: '金军攻破北宋首都东京（今河南开封），俘虏了宋徽宗、宋钦宗父子及大量皇族、后宫、贵卿、朝臣等三千余人，押解北上。',
    impact: '导致北宋灭亡，宋室南迁建立南宋，中国经济重心进一步南移。',
    location: { x: 560, y: 260 } // Kaifeng
  },
  { 
    year: 1405, 
    title: '郑和下西洋', 
    description: '明代大规模远洋航行。',
    details: '明成祖朱棣派遣郑和率领庞大船队七下西洋，访问了亚非三十多个国家和地区，最远到达红海沿岸和非洲东海岸。',
    impact: '展示了明朝强大的国力和航海技术，加强了中国与亚非各国的友好往来。',
    location: { x: 650, y: 400 } // Near Sea
  },
  { 
    year: 1449, 
    title: '土木堡之变', 
    description: '明英宗亲征瓦剌被俘。',
    details: '明英宗朱祁镇在宦官王振怂恿下亲征瓦剌，在土木堡（今河北怀来）惨败被俘，全军覆没。',
    impact: '明朝由盛转衰，被迫采取战略收缩，重修长城。',
    location: { x: 560, y: 190 } 
  },
];

// --- RELATIONSHIPS (Ranges) ---
const RELATIONSHIPS_DB: Relationship[] = [
  // Three Kingdoms
  { sourceId: 'shu', targetId: 'wu', type: 'alliance', startYear: 208, endYear: 222, description: '孙刘联盟抗曹' },
  { sourceId: 'wei', targetId: 'shu', type: 'war', startYear: 219, endYear: 263, description: '魏蜀长期对峙与北伐' },
  { sourceId: 'wei', targetId: 'wu', type: 'war', startYear: 208, endYear: 280, description: '魏吴多次交战' },
  
  // Han & Xiongnu
  { sourceId: 'han', targetId: 'xiongnu', type: 'war', startYear: -202, endYear: -198, description: '汉初对匈战争与白登之围' },
  { sourceId: 'han', targetId: 'xiongnu', type: 'peace', startYear: -197, endYear: -133, description: '汉匈和亲' },
  { sourceId: 'han', targetId: 'xiongnu', type: 'war', startYear: -133, endYear: 30, description: '汉武帝反击匈奴' },

  // Jin & 16 Kingdoms
  { sourceId: 'dong_jin', targetId: 'qian_qin', type: 'war', startYear: 351, endYear: 383, description: '前秦南征与淝水之战' },
  { sourceId: 'dong_jin', targetId: 'hou_zhao', type: 'war', startYear: 319, endYear: 351, description: '祖逖北伐' },
  // North/South Dynasties
  { sourceId: 'liu_song', targetId: 'bei_wei', type: 'war', startYear: 420, endYear: 479, description: '宋魏战争' },
  { sourceId: 'nan_liang', targetId: 'bei_wei', type: 'peace', startYear: 502, endYear: 520, description: '梁魏通使' },
  { sourceId: 'nan_chen', targetId: 'bei_zhou', type: 'war', startYear: 557, endYear: 581, description: '陈周对峙' },
  { sourceId: 'bei_wei', targetId: 'rouran', type: 'war', startYear: 386, endYear: 550, description: '北魏抗击柔然' },

  // Sui/Tang
  { sourceId: 'tang', targetId: 'tujue', type: 'war', startYear: 618, endYear: 657, description: '唐灭东、西突厥' },
  { sourceId: 'tang', targetId: 'tubo', type: 'peace', startYear: 641, endYear: 670, description: '文成公主入藏' },
  { sourceId: 'tang', targetId: 'tubo', type: 'war', startYear: 670, endYear: 821, description: '唐蕃长期拉锯' },

  // Song Liao Jin
  { sourceId: 'song_north', targetId: 'liao', type: 'war', startYear: 960, endYear: 1004, description: '宋辽战争' },
  { sourceId: 'song_north', targetId: 'liao', type: 'peace', startYear: 1005, endYear: 1125, description: '澶渊之盟，约为兄弟之国' },
  { sourceId: 'song_north', targetId: 'xia', type: 'war', startYear: 1038, endYear: 1127, description: '宋夏战争不断' },
  { sourceId: 'song_north', targetId: 'jin', type: 'alliance', startYear: 1115, endYear: 1125, description: '海上之盟，联金灭辽' },
  { sourceId: 'song_north', targetId: 'jin', type: 'war', startYear: 1125, endYear: 1127, description: '金灭北宋' },
  { sourceId: 'song_south', targetId: 'jin', type: 'war', startYear: 1127, endYear: 1141, description: '宋金战争' },
  { sourceId: 'song_south', targetId: 'jin', type: 'vassal', startYear: 1141, endYear: 1161, description: '绍兴和议，南宋向金称臣' },
  { sourceId: 'song_south', targetId: 'mongol', type: 'war', startYear: 1234, endYear: 1279, description: '蒙宋战争' },

  // Ming
  { sourceId: 'ming', targetId: 'northern_yuan', type: 'war', startYear: 1368, endYear: 1450, description: '明朝北伐与土木堡之变' },
  { sourceId: 'ming', targetId: 'qing', type: 'war', startYear: 1616, endYear: 1644, description: '明清战争' },

  // Qing
  { sourceId: 'qing', targetId: 'dzungar', type: 'war', startYear: 1680, endYear: 1757, description: '清准战争' }
];

// --- FACTION DETAILS ---
export const FACTION_DETAILS: Record<string, FactionDetail> = {
  // Pre-Qin
  'zhou': { id: 'zhou', name: '周朝', duration: '前1046 - 前256', rulers: '周武王, 周公旦, 周幽王', culture: '礼乐制度, 青铜器鼎盛, 诗经', events: '武王伐纣, 国人暴动, 平王东迁', impact: '确立了宗法制和分封制，奠定了中国传统文化的基础。' },
  'quan_rong': { id: 'quan_rong', name: '犬戎', duration: '西周时期', rulers: '无详细记载', culture: '游牧文化', events: '攻破镐京', impact: '导致西周灭亡，迫使周平王东迁洛邑。' },
  'qin': { id: 'qin', name: '秦国/秦朝', duration: '前770 - 前206', rulers: '秦穆公, 秦孝公, 秦始皇', culture: '法家思想, 小篆, 兵马俑', events: '商鞅变法, 统一六国, 焚书坑儒', impact: '建立了第一个中央集权帝国，推行郡县制，书同文车同轨。' },
  'chu': { id: 'chu', name: '楚国', duration: '前1042 - 前223', rulers: '楚庄王, 楚怀王', culture: '楚辞, 浪漫主义, 青铜铸造', events: '问鼎中原, 屈原投江', impact: '创造了灿烂的楚文化，对后世南方文化影响深远。' },
  'qi': { id: 'qi', name: '齐国', duration: '前1046 - 前221', rulers: '齐桓公, 齐威王', culture: '稷下学宫, 孙子兵法', events: '尊王攘夷, 桂陵之战', impact: '东方强国，经济富庶，学术中心。' },
  'yan': { id: 'yan', name: '燕国', duration: '前1044 - 前222', rulers: '燕昭王, 太子丹', culture: '慷慨悲歌', events: '乐毅伐齐, 荆轲刺秦王', impact: '开发了北方边疆，北京城的雏形。' },
  'state_jin': { id: 'state_jin', name: '晋国', duration: '前1033 - 前376', rulers: '晋文公, 晋悼公', culture: '尚武精神, 法家萌芽', events: '城濮之战, 践土之盟', impact: '春秋霸主，遏制楚国北进，后分裂为韩赵魏。' },
  'state_zhao': { id: 'state_zhao', name: '赵国', duration: '前403 - 前222', rulers: '赵武灵王', culture: '胡服骑射', events: '长平之战', impact: '军事改革先驱，秦国统一路上最顽强的对手。' },
  'state_wei': { id: 'state_wei', name: '魏国', duration: '前403 - 前225', rulers: '魏文侯', culture: '李悝变法', events: '战国初期霸主', impact: '最早进行变法，开启战国变法潮流。' },
  'state_han': { id: 'state_han', name: '韩国', duration: '前403 - 前230', rulers: '韩昭侯', culture: '申不害术治', events: '处于四战之地', impact: '法家集大成者韩非子的故国。' },
  
  // External
  'xiongnu': { id: 'xiongnu', name: '匈奴', duration: '前3世纪 - 4世纪', rulers: '冒顿单于, 呼韩邪单于', culture: '游牧骑射, 萨满教', events: '白登之围, 漠北之战', impact: '秦汉时期北方最大的威胁，促使汉朝开辟丝绸之路和修筑长城。' },
  'xianbei': { id: 'xianbei', name: '鲜卑', duration: '1世纪 - 6世纪', rulers: '檀石槐, 拓跋珪', culture: '游牧, 后期汉化', events: '入主中原', impact: '五胡乱华主要力量之一，建立了北魏等政权，推动了民族融合。' },
  'qiang': { id: 'qiang', name: '羌', duration: '古老民族', rulers: '无统一首领', culture: '游牧农耕兼营', events: '东汉羌乱', impact: '长期活跃于西北，消耗了东汉大量国力。' },
  'rouran': { id: 'rouran', name: '柔然', duration: '4世纪 - 6世纪', rulers: '社仑', culture: '游牧', events: '与北魏长期交战', impact: '称霸草原，后被突厥所灭。' },
  'tujue': { id: 'tujue', name: '突厥', duration: '6世纪 - 8世纪', rulers: '颉利可汗', culture: '突厥文字, 狼图腾', events: '渭水之盟', impact: '隋唐时期北方霸主，控制丝绸之路，后分裂为东西突厥。' },
  'tubo': { id: 'tubo', name: '吐蕃', duration: '7世纪 - 9世纪', rulers: '松赞干布', culture: '藏传佛教', events: '安史之乱后攻占长安', impact: '统一青藏高原，建立强大帝国，与唐朝长期争霸。' },
  'northern_yuan': { id: 'northern_yuan', name: '北元/鞑靼/瓦剌', duration: '1368 - 1635', rulers: '也先, 达延汗', culture: '蒙古游牧', events: '土木堡之变', impact: '明朝长期的北方边患，迫使明朝修筑长城九边。' },
  'dzungar': { id: 'dzungar', name: '准噶尔', duration: '17世纪 - 18世纪', rulers: '噶尔丹', culture: '藏传佛教, 游牧', events: '乌兰布通之战', impact: '清朝前中期最大的劲敌，最终被乾隆帝平定。' },

  // Han & Three Kingdoms
  'han': { id: 'han', name: '汉朝', duration: '前202 - 220', rulers: '汉高祖, 汉武帝, 光武帝', culture: '独尊儒术, 史记, 造纸术', events: '文景之治, 汉武盛世, 丝绸之路', impact: '确立了儒家思想的正统地位，汉族之名由此而来。' },
  'wei': { id: 'wei', name: '曹魏', duration: '220 - 266', rulers: '曹操(奠基), 曹丕, 曹叡', culture: '建安风骨, 魏碑', events: '官渡之战, 九品中正制', impact: '三国中实力最强，为西晋统一奠定基础。' },
  'shu': { id: 'shu', name: '蜀汉', duration: '221 - 263', rulers: '刘备, 刘禅', culture: '忠义文化', events: '三顾茅庐, 白帝城托孤, 六出祁山', impact: '诸葛亮的忠君思想影响深远。' },
  'wu': { id: 'wu', name: '东吴', duration: '229 - 280', rulers: '孙权, 孙皓', culture: '江南开发', events: '赤壁之战, 夷陵之战', impact: '促进了江南地区的经济开发和航海事业。' },

  // Jin & 16 Kingdoms
  'jin_xi': { id: 'jin_xi', name: '西晋', duration: '266 - 316', rulers: '司马炎, 司马衷', culture: '玄学盛行', events: '八王之乱, 五胡乱华', impact: '短暂统一后迅速崩溃，导致长达300年的分裂。' },
  'dong_jin': { id: 'dong_jin', name: '东晋', duration: '317 - 420', rulers: '司马睿, 谢安(权臣)', culture: '兰亭集序, 顾恺之画', events: '淝水之战, 祖逖北伐', impact: '南方经济文化大发展，为经济重心南移打下基础。' },
  'cheng_han': { id: 'cheng_han', name: '成汉', duration: '304 - 347', rulers: '李雄', culture: '道教盛行', events: '李特流民起义', impact: '十六国中最早建立的政权之一，割据巴蜀。' },
  'hou_zhao': { id: 'hou_zhao', name: '后赵', duration: '319 - 351', rulers: '石勒, 石虎', culture: '崇尚佛教', events: '石勒灭前赵', impact: '羯族建立的政权，曾统一北方大部分地区。' },
  'qian_yan': { id: 'qian_yan', name: '前燕', duration: '337 - 370', rulers: '慕容皝, 慕容儁', culture: '慕容鲜卑', events: '入主中原', impact: '鲜卑族汉化程度较深，雄踞关东。' },
  'qian_qin': { id: 'qian_qin', name: '前秦', duration: '351 - 394', rulers: '苻坚, 王猛', culture: '汉化改革, 儒学', events: '统一北方, 淝水之战', impact: '十六国中最接近统一全国的政权，因淝水战败而瓦解。' },
  'qian_liang': { id: 'qian_liang', name: '前凉', duration: '301 - 376', rulers: '张轨', culture: '保存中原文化', events: '保境安民', impact: '中原大乱时，河西走廊保持了相对安定。' },
  
  // Northern & Southern
  'bei_wei': { id: 'bei_wei', name: '北魏', duration: '386 - 534', rulers: '拓跋焘, 孝文帝', culture: '孝文帝汉化, 龙门石窟', events: '统一北方, 迁都洛阳', impact: '鲜卑族建立的强大政权，推行均田制，促进民族大融合。' },
  'liu_song': { id: 'liu_song', name: '刘宋', duration: '420 - 479', rulers: '刘裕, 刘义隆', culture: '元嘉之治', events: '刘裕北伐', impact: '南朝疆域最广的朝代，“七分天下，而有其四”。' },
  'nan_qi': { id: 'nan_qi', name: '南齐', duration: '479 - 502', rulers: '萧道成', culture: '永明体诗歌', events: '政权更迭频繁', impact: '存续时间较短，士族政治延续。' },
  'nan_liang': { id: 'nan_liang', name: '梁朝', duration: '502 - 557', rulers: '萧衍(梁武帝)', culture: '佛教极盛 ("南朝四百八十寺")', events: '侯景之乱', impact: '前期经济繁荣，后期因侯景之乱导致江南残破。' },
  'nan_chen': { id: 'nan_chen', name: '陈朝', duration: '557 - 589', rulers: '陈霸先, 陈后主', culture: '玉树后庭花', events: '偏安江南', impact: '南朝疆域最小，最终被隋所灭。' },
  'dong_wei': { id: 'dong_wei', name: '东魏', duration: '534 - 550', rulers: '高欢(权臣)', culture: '鲜卑化回潮', events: '沙苑之战', impact: '北魏分裂后的关东政权，实权由高氏掌握。' },
  'xi_wei': { id: 'xi_wei', name: '西魏', duration: '535 - 556', rulers: '宇文泰(权臣)', culture: '府兵制创建', events: '改革官制', impact: '关中本位政策，为后来北周、隋、唐的强盛奠基。' },
  'bei_qi': { id: 'bei_qi', name: '北齐', duration: '550 - 577', rulers: '高洋', culture: '胡风重', events: '兰陵王破阵', impact: '军事实力曾很强，但政治腐败迅速灭亡。' },
  'bei_zhou': { id: 'bei_zhou', name: '北周', duration: '557 - 581', rulers: '宇文邕', culture: '崇儒重道', events: '灭北齐, 毁佛', impact: '统一北方，为隋朝统一全国铺平了道路。' },

  // Later Dynasties
  'tang': { id: 'tang', name: '唐朝', duration: '618 - 907', rulers: '唐太宗, 武则天, 唐玄宗', culture: '唐诗, 乐舞, 书法', events: '玄武门之变, 安史之乱', impact: '中国封建社会的巅峰，国际影响力极大的盛世。' },
  'song_north': { id: 'song_north', name: '北宋', duration: '960 - 1127', rulers: '赵匡胤, 宋仁宗, 宋徽宗', culture: '宋词, 理学, 四大发明', events: '陈桥兵变, 熙宁变法', impact: '经济文化高度繁荣，科技发展达到高峰。' },
  'liao': { id: 'liao', name: '辽', duration: '916 - 1125', rulers: '耶律阿保机, 萧太后', culture: '契丹文字, 捺钵制度', events: '澶渊之盟', impact: '促进了草原文明与中原文明的融合。' },
  'jin': { id: 'jin', name: '金', duration: '1115 - 1234', rulers: '完颜阿骨打', culture: '女真文', events: '靖康之变', impact: '为后来清朝的建立奠定了民族基础。' },
  'yuan': { id: 'yuan', name: '元朝', duration: '1271 - 1368', rulers: '忽必烈', culture: '元曲, 青花瓷', events: '崖山海战', impact: '行省制度沿用至今，疆域空前辽阔。' },
  'ming': { id: 'ming', name: '明朝', duration: '1368 - 1644', rulers: '朱元璋, 朱棣', culture: '小说, 阳明心学', events: '土木堡之变, 郑和下西洋', impact: '君主专制强化，资本主义萌芽出现。' },
  'qing': { id: 'qing', name: '清朝', duration: '1644 - 1912', rulers: '康熙, 乾隆', culture: '京剧, 红楼梦', events: '三藩之乱, 鸦片战争', impact: '奠定了现代中国的版图，中国历史上最后一个封建王朝。' },
];

// Map State Logic
export const getMapState = (year: number): MapState => {
  let label = '未知';
  let territories: Territory[] = [];
  
  // 1. Western Zhou
  if (year >= -1046 && year < -770) {
    label = '西周';
    territories = [
        { id: 'zhou', name: '周', path: SHAPE_CORE, color: '#7c7c7c', centerX: 480, centerY: 240 },
        { id: 'quan_rong', name: '犬戎', path: "M 100,200 L 400,200 L 380,250 L 100,250 Z", color: '#57534e', centerX: 250, centerY: 220 }
    ];
  }
  // 2. Spring Autumn & Warring States
  else if (year >= -770 && year < -221) {
    label = year < -475 ? '春秋' : '战国';
    const isSpringAutumn = year < -475;

    // Common States
    const qin = { id: 'qin', name: '秦', path: "M 350,220 L 420,200 L 430,280 L 350,280 Z", color: '#1a1a1a', centerX: 380, centerY: 250 };
    const chu = { id: 'chu', name: '楚', path: "M 400,300 L 550,300 L 600,350 L 500,400 Z", color: '#b91c1c', centerX: 500, centerY: 330 };
    const qi = { id: 'qi', name: '齐', path: "M 550,180 L 600,160 L 630,220 L 560,240 Z", color: '#7e22ce', centerX: 580, centerY: 200 };
    const yan = { id: 'yan', name: '燕', path: "M 520,130 L 600,100 L 630,160 L 550,170 Z", color: '#4682b4', centerX: 560, centerY: 140 };
    
    // External
    const xiongnu = { id: 'xiongnu', name: '匈奴', path: SHAPE_STEPPE_FULL, color: '#57534e', centerX: 400, centerY: 80 };
    const donghu = { id: 'xianbei', name: '东胡', path: SHAPE_STEPPE_EAST, color: '#65a30d', centerX: 650, centerY: 100 }; // Green

    if (isSpringAutumn) {
        // Spring Autumn: Add Jin
        territories = [
            qin,
            chu,
            qi,
            yan,
            xiongnu,
            donghu,
            { id: 'state_jin', name: '晋', path: "M 420,180 L 480,160 L 500,220 L 450,240 L 420,220 Z", color: '#a0522d', centerX: 460, centerY: 200 },
            { id: 'others', name: '中原诸国', path: "M 480,240 L 520,240 L 520,280 L 480,280 Z", color: '#d97706', centerX: 500, centerY: 260 }
        ];
    } else {
        // Warring States: Split Jin into Zhao, Wei, Han
        territories = [
            qin,
            chu,
            qi,
            yan,
            xiongnu,
            donghu,
            { id: 'state_zhao', name: '赵', path: "M 430,160 L 500,150 L 520,200 L 450,210 Z", color: '#be185d', centerX: 470, centerY: 180 },
            { id: 'state_wei', name: '魏', path: "M 450,210 L 520,200 L 530,240 L 470,250 Z", color: '#dc2626', centerX: 490, centerY: 225 },
            { id: 'state_han', name: '韩', path: "M 450,250 L 500,250 L 510,280 L 460,280 Z", color: '#f97316', centerX: 480, centerY: 265 }
        ];
    }
  }
  // 3. Qin & Han
  else if (year >= -221 && year < 220) {
    label = year < -206 ? '秦朝' : (year < 9 ? '西汉' : '东汉');
    territories = [
        { id: 'han', name: label, path: SHAPE_UNIFIED_PROPER, color: year < -206 ? '#1a1a1a' : '#b22222', centerX: 500, centerY: 300 },
        { id: 'xiongnu', name: '匈奴', path: SHAPE_STEPPE_FULL, color: '#57534e', centerX: 400, centerY: 80 },
        { id: 'qiang', name: '羌', path: SHAPE_TIBET, color: '#854d0e', centerX: 150, centerY: 350 },
        { id: 'xianbei', name: '鲜卑', path: SHAPE_MANCHURIA, color: '#65a30d', centerX: 700, centerY: 100 }
    ];
  }
  // 4. Three Kingdoms
  else if (year >= 220 && year < 280) {
    label = '三国';
    territories = [
        { id: 'wei', name: '魏', path: "M 300,180 L 680,180 L 650,230 L 600,300 L 300,280 Z", color: '#1d4ed8', centerX: 500, centerY: 220 },
        { id: 'shu', name: '蜀', path: "M 200,280 L 350,280 L 350,400 L 250,400 Z", color: '#dc2626', centerX: 300, centerY: 340 },
        { id: 'wu', name: '吴', path: "M 350,300 L 640,350 L 600,440 L 540,490 L 400,400 Z", color: '#16a34a', centerX: 500, centerY: 380 },
        { id: 'xianbei', name: '鲜卑', path: SHAPE_STEPPE_FULL, color: '#65a30d', centerX: 400, centerY: 100 },
        { id: 'qiang', name: '羌', path: SHAPE_TIBET, color: '#854d0e', centerX: 150, centerY: 350 }
    ];
  }
  // 5. Jin & North/South Dynasties (Expanded Detail)
  else if (year >= 280 && year < 581) {
    
    // External context for this era
    const rouran = { id: 'rouran', name: '柔然', path: SHAPE_STEPPE_FULL, color: '#57534e', centerX: 400, centerY: 80 };
    const tuyuhun = { id: 'qiang', name: '吐谷浑', path: SHAPE_TIBET, color: '#854d0e', centerX: 180, centerY: 320 };

    if (year >= 280 && year < 317) {
       label = '西晋';
       territories = [
           { id: 'jin_xi', name: '西晋', path: SHAPE_UNIFIED_PROPER, color: '#1d4ed8', centerX: 500, centerY: 300 },
           { id: 'xianbei', name: '鲜卑', path: SHAPE_STEPPE_FULL, color: '#65a30d', centerX: 400, centerY: 80 }
       ];
    } 
    // Sixteen Kingdoms Era (Phase 1: Chaos & Rise of Early States 317-350)
    else if (year >= 317 && year < 351) {
        label = '东晋十六国 (早期)';
        territories = [
            { id: 'dong_jin', name: '东晋', path: SHAPE_EASTERN_JIN, color: '#0f766e', centerX: 500, centerY: 400 },
            { id: 'hou_zhao', name: '后赵', path: SHAPE_LATER_ZHAO, color: '#9a3412', centerX: 450, centerY: 250 },
            { id: 'cheng_han', name: '成汉', path: SHAPE_CHENG_HAN, color: '#c2410c', centerX: 250, centerY: 350 },
            { id: 'qian_yan', name: '前燕', path: SHAPE_FORMER_YAN, color: '#be185d', centerX: 600, centerY: 180 },
            { id: 'qian_liang', name: '前凉', path: SHAPE_FORMER_LIANG, color: '#d97706', centerX: 200, centerY: 220 },
            { id: 'xianbei', name: '代', path: SHAPE_STEPPE_FULL, color: '#65a30d', centerX: 400, centerY: 80 }
        ];
    }
    // Sixteen Kingdoms Era (Phase 2: Former Qin Unification 351-383)
    else if (year >= 351 && year <= 383) {
        label = '前秦统一北方';
        territories = [
            { id: 'dong_jin', name: '东晋', path: SHAPE_EASTERN_JIN, color: '#0f766e', centerX: 500, centerY: 400 },
            { id: 'qian_qin', name: '前秦', path: SHAPE_FORMER_QIN_MAX, color: '#6d28d9', centerX: 400, centerY: 250 },
            rouran
        ];
    }
    // Sixteen Kingdoms Era (Phase 3: Post-Fei River Chaos / Rise of Northern Wei 384-420)
    else if (year > 383 && year < 420) {
        label = '东晋十六国 (后期)';
        territories = [
             { id: 'dong_jin', name: '东晋', path: SHAPE_EASTERN_JIN, color: '#0f766e', centerX: 500, centerY: 400 },
             { id: 'bei_wei', name: '北魏', path: "M 350,150 L 500,150 L 500,250 L 350,250 Z", color: '#1e3a8a', centerX: 420, centerY: 200 },
             { id: 'hou_yan', name: '后燕', path: SHAPE_FORMER_YAN, color: '#be185d', centerX: 600, centerY: 180 },
             { id: 'hou_qin', name: '后秦', path: "M 250,220 L 350,220 L 350,300 L 250,300 Z", color: '#991b1b', centerX: 300, centerY: 260 },
             rouran
        ];
    }
    // Northern & Southern Dynasties (Phase 1: Song vs Wei 420-479)
    else if (year >= 420 && year < 479) {
        label = '南北朝 (宋魏对峙)';
        territories = [
            { id: 'liu_song', name: '刘宋', path: SHAPE_LIU_SONG, color: '#be185d', centerX: 500, centerY: 400 },
            { id: 'bei_wei', name: '北魏', path: SHAPE_NORTHERN_WEI, color: '#1e3a8a', centerX: 400, centerY: 250 },
            rouran,
            tuyuhun
        ];
    }
    // Northern & Southern Dynasties (Phase 2: Qi/Liang vs Wei 479-534)
    else if (year >= 479 && year < 534) {
        label = year < 502 ? '南北朝 (齐魏)' : '南北朝 (梁魏)';
        const southName = year < 502 ? '南齐' : '梁';
        const southId = year < 502 ? 'nan_qi' : 'nan_liang';
        const southColor = year < 502 ? '#ec4899' : '#15803d'; // Pink or Green
        
        territories = [
            { id: southId, name: southName, path: SHAPE_LIU_SONG, color: southColor, centerX: 500, centerY: 400 },
            { id: 'bei_wei', name: '北魏', path: SHAPE_NORTHERN_WEI, color: '#1e3a8a', centerX: 400, centerY: 250 },
            rouran, 
            tuyuhun
        ];
    }
    // Northern & Southern Dynasties (Phase 3: East/West Wei & Liang 534-550)
    else if (year >= 534 && year < 550) {
        label = '南北朝 (东西魏分裂)';
        territories = [
            { id: 'nan_liang', name: '梁', path: SHAPE_CHEN, color: '#15803d', centerX: 500, centerY: 420 },
            { id: 'dong_wei', name: '东魏', path: SHAPE_EASTERN_WEI, color: '#93c5fd', centerX: 520, centerY: 250 },
            { id: 'xi_wei', name: '西魏', path: SHAPE_WESTERN_WEI, color: '#64748b', centerX: 300, centerY: 250 },
            rouran,
            tuyuhun
        ];
    }
    // Northern & Southern Dynasties (Phase 4: Qi/Zhou & Chen 550-581)
    else if (year >= 550 && year < 581) {
        label = '南北朝 (周齐陈)';
        const isZhouUnified = year >= 577; // Zhou conquered Qi in 577
        const tujue = { id: 'tujue', name: '突厥', path: SHAPE_STEPPE_FULL, color: '#4338ca', centerX: 400, centerY: 80 };
        
        if (isZhouUnified) {
             territories = [
                { id: 'nan_chen', name: '陈', path: SHAPE_CHEN, color: '#ef4444', centerX: 500, centerY: 420 },
                { id: 'bei_zhou', name: '北周', path: SHAPE_NORTHERN_WEI, color: '#4338ca', centerX: 400, centerY: 250 },
                tujue
             ];
        } else {
             territories = [
                { id: 'nan_chen', name: '陈', path: SHAPE_CHEN, color: '#ef4444', centerX: 500, centerY: 420 },
                { id: 'bei_qi', name: '北齐', path: SHAPE_NORTHERN_QI, color: '#d8b4fe', centerX: 520, centerY: 250 },
                { id: 'bei_zhou', name: '北周', path: SHAPE_NORTHERN_ZHOU, color: '#4338ca', centerX: 300, centerY: 250 },
                tujue
             ];
        }
    }
  }
  // 6. Sui & Tang
  else if (year >= 581 && year < 907) {
    label = year < 618 ? '隋' : '唐';
    const tujue = { id: 'tujue', name: '突厥', path: SHAPE_STEPPE_FULL, color: '#4338ca', centerX: 400, centerY: 80 };
    const tubo = { id: 'tubo', name: '吐蕃', path: SHAPE_TIBET, color: '#991b1b', centerX: 200, centerY: 350 };
    
    // After 657 (Tang destroys W. Turks), Tang territory expands, Turks shrink or disappear temporarily
    // After 755 (An Lushan), Tang shrinks, Tubo expands, Uighurs appear.
    // Simplifying:
    if (year < 630) {
        territories = [
            { id: 'tang', name: label, path: SHAPE_UNIFIED_PROPER, color: year < 618 ? '#4338ca' : '#eab308', centerX: 450, centerY: 280 },
            tujue,
            tubo
        ];
    } else if (year >= 630 && year < 755) {
        territories = [
            { id: 'tang', name: label, path: SHAPE_TANG_MAX, color: '#eab308', centerX: 450, centerY: 280 },
            tubo
        ];
    } else {
        // Late Tang
         territories = [
            { id: 'tang', name: label, path: SHAPE_UNIFIED_PROPER, color: '#eab308', centerX: 500, centerY: 300 },
            { id: 'tubo', name: '吐蕃', path: "M 0,250 L 350,280 L 350,450 L 0,450 Z", color: '#991b1b', centerX: 200, centerY: 350 }, // Tubo expanded
            { id: 'tujue', name: '回鹘', path: SHAPE_STEPPE_FULL, color: '#15803d', centerX: 400, centerY: 80 } // Uighurs
        ];
    }
  }
  // 7. Song / Liao / Jin
  else if (year >= 907 && year < 1279) {
    const liao = { id: 'liao', name: '辽', path: SHAPE_NORTH_STEPPE, color: '#166534', centerX: 450, centerY: 120 };
    const xia = { id: 'xia', name: '西夏', path: "M 200,200 L 320,200 L 320,300 L 200,300 Z", color: '#b45309', centerX: 260, centerY: 250 };
    const jin = { id: 'jin', name: '金', path: "M 100,50 L 700,50 L 720,200 L 600,320 L 300,320 L 200,150 Z", color: '#ca8a04', centerX: 450, centerY: 200 };
    const mongol = { id: 'mongol', name: '蒙古', path: "M 50,20 L 700,20 L 700,100 L 50,100 Z", color: '#171717', centerX: 350, centerY: 60 };

    if (year < 960) {
        label = '五代十国';
        territories = [
            { id: 'wudai', name: '中原', path: "M 400,220 L 550,220 L 550,300 L 400,300 Z", color: '#475569', centerX: 480, centerY: 260 },
            { id: 'shiguo', name: '十国', path: SHAPE_SONG_SOUTH, color: '#be185d', centerX: 500, centerY: 400 },
            liao,
            { id: 'tubo', name: '吐蕃诸部', path: SHAPE_TIBET, color: '#7f1d1d', centerX: 150, centerY: 350 }
        ];
    }
    else if (year < 1127) {
        label = '北宋 & 辽';
        territories = [
            liao,
            { id: 'song_north', name: '北宋', path: SHAPE_SONG_NORTH, color: '#0ea5e9', centerX: 480, centerY: 350 },
            xia,
            { id: 'tubo', name: '吐蕃诸部', path: SHAPE_TIBET, color: '#7f1d1d', centerX: 150, centerY: 350 }
        ];
        if(year > 1115) territories.push({ id: 'jin', name: '金(崛起)', path: SHAPE_MANCHURIA, color: '#ca8a04', centerX: 650, centerY: 120 });
    } else {
        label = '南宋 & 金';
        territories = [
            jin,
            { id: 'song_south', name: '南宋', path: SHAPE_SONG_SOUTH, color: '#06b6d4', centerX: 500, centerY: 420 },
            xia,
            { id: 'tubo', name: '吐蕃诸部', path: SHAPE_TIBET, color: '#7f1d1d', centerX: 150, centerY: 350 }
        ];
        if (year > 1206) territories.push(mongol);
    }
  }
  // 8. Yuan
  else if (year >= 1271 && year < 1368) {
    label = '元朝';
    territories = [{ id: 'yuan', name: '元', path: SHAPE_MASSIVE, color: '#1e3a8a', centerX: 450, centerY: 250 }];
  }
  // 9. Ming
  else if (year >= 1368 && year < 1644) {
    label = '明朝';
    territories = [
        { id: 'ming', name: '明', path: SHAPE_UNIFIED_PROPER, color: '#dc2626', centerX: 500, centerY: 300 },
        { id: 'northern_yuan', name: '北元/瓦剌', path: SHAPE_STEPPE_FULL, color: '#57534e', centerX: 400, centerY: 80 },
        { id: 'qing', name: '后金', path: SHAPE_MANCHURIA, color: '#5b21b6', centerX: 700, centerY: 120 }
    ];
  }
  // 10. Qing
  else if (year >= 1644) {
    label = '清朝';
    // Dzungar exists until ~1757
    const dzungar = { id: 'dzungar', name: '准噶尔', path: SHAPE_WESTERN_REGIONS, color: '#9a3412', centerX: 150, centerY: 200 };
    
    if (year < 1757) {
        territories = [
            { id: 'qing', name: '清', path: SHAPE_MASSIVE, color: '#5b21b6', centerX: 500, centerY: 300 }, // Slightly smaller in west?
            dzungar
        ];
    } else {
        territories = [{ id: 'qing', name: '清', path: SHAPE_MASSIVE, color: '#5b21b6', centerX: 450, centerY: 250 }];
    }
  }

  // Filter Relationships
  const activeRelationships = RELATIONSHIPS_DB.filter(r => year >= r.startYear && year <= r.endYear);

  return { label, territories, relationships: activeRelationships };
};