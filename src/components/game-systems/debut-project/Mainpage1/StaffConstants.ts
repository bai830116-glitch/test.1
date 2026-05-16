import { ScoutStaff } from '../../../../types/scout';
import { UI_COLORS } from '../../../../constants';

export const INITIAL_STAFF: ScoutStaff[] = [
  {
    id: '1',
    name: '老鳥金哥',
    role: '戰術總監',
    color: UI_COLORS.MACARON,
    stats: { charm: 88, scout: 95 },
    traits: [
      { name: '銳利之眼', desc: '能看穿練習生的隱藏潛力' },
      { name: '高奢人脈', desc: '極易發掘「富二代」特優生' }
    ],
    roomId: 5,
    x: 40,
    action: 'phone',
    actionText: '📞 喂喂?',
    facing: 1,
    avatarSprite: '😎',
    dispatchRoute: '東京航線',
    fatigue: 45,
    mood: 'focused'
  },
  {
    id: '2',
    name: 'Aori',
    role: '潮流獵手',
    color: '#FF85A2',
    stats: { charm: 98, scout: 75 },
    traits: [
      { name: 'SNS爆款', desc: '發掘野生網紅機率大增' },
      { name: '直覺系', desc: '憑感覺選人容易爆擊' }
    ],
    roomId: 1,
    x: 30,
    action: 'slack',
    actionText: '👕 挑選新款',
    facing: 1,
    avatarSprite: '👩‍🎤',
    fatigue: 15,
    mood: 'happy'
  },
  {
    id: '3',
    name: '小王',
    role: '血汗星探',
    color: UI_COLORS.TIFFANY,
    stats: { charm: 65, scout: 82 },
    traits: [
      { name: '加班狂', desc: '效率+20%，疲勞累積極快' },
      { name: '咖啡成癮', desc: '喝冰美式後效率暴增' }
    ],
    roomId: 3,
    x: 60,
    action: 'pc',
    actionText: '🍳 研發菜單',
    facing: -1,
    avatarSprite: '🧑‍💻',
    fatigue: 85,
    mood: 'tired'
  },
  {
    id: '4',
    name: 'Dr. Z',
    role: '生物駭客',
    color: '#00C2CB',
    stats: { charm: 50, scout: 99 },
    traits: [
      { name: '基因鎖突破', desc: '提升全員體力上限' }
    ],
    roomId: 6,
    x: 20,
    action: 'idle',
    actionText: '🧪 基因重組',
    facing: 1,
    avatarSprite: '👨‍🔬',
    fatigue: 30,
    mood: 'focused'
  }
];

export const ROOM_FURNITURE: Record<number, Record<string, number>> = {
  1: { 'rack': 30, 'shelf': 70, 'door': 95 },
  2: { 'table': 25, 'bar': 70, 'stool': 60 },
  3: { 'stove': 30, 'rack': 80, 'desk': 50 },
  4: { 'sofa': 30, 'plant': 10, 'door': 90 },
  5: { 'desk': 25, 'cabinet': 65, 'copier': 85 },
  6: { 'bed': 40, 'monitor': 40, 'rack': 10 }
};
