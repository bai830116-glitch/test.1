import { DifficultyId } from '../types/game';

export interface DifficultyConfig {
  id: DifficultyId;
  label: string;
  companyScale: string;
  location: string;
  cash: string;
  talentLabel: string;
  talentDesc: string;
  story: string;
}

export const DIFFICULTIES: DifficultyConfig[] = [
  {
    id: 'easy',
    label: '富二代下凡體驗人生 (容易)',
    companyScale: '中型新創事務所（租賃）',
    location: '弘大文青商務樓',
    cash: '$1,050,000',
    talentLabel: '【人脈通天】',
    talentDesc: '練習生招募與簽約金花費減少 30%',
    story: '「拿著家裡給的百萬創業基金，租下了整層文青辦公室。雖然不是自家產權，但憑藉著家族名望與雄厚資金，招募頂級練習生易如反掌！」'
  },
  {
    id: 'normal',
    label: '白手起家的超級製作人 (中等)',
    companyScale: '標準地下工作室（買斷）',
    location: '老舊社區公寓',
    cash: '$700,000',
    talentLabel: '【黃金聽覺】',
    talentDesc: '歌曲製作出爆款與熱門機率 +15%',
    story: '「手裡握著辛辛苦苦湊出的 70 萬創業基金，直接買下一間破舊公寓的地下室作為永久基地。雖然資源一般，但你腦袋裡裝著征服全球 K-POP 樂壇的瘋狂大夢與精準眼光！」'
  },
  {
    id: 'hard',
    label: '熱血爆肝黑心奴隸 (困難)',
    companyScale: '微型共用辦公桌',
    location: '郊區分租防空洞',
    cash: '$350,000',
    talentLabel: '【鋼鐵肝臟】',
    talentDesc: '所有員工與藝人體力消耗速度減緩 20%',
    story: '「當了十年的血汗助理，帶著僅有的 35 萬微薄存款憤而離職！雖然被前東家私下封殺、只能在破爛防空洞分租桌子，但你擁有全業界最強的爆肝抗壓性！」'
  }
];

export const FUNNY_NAMES = ['金油膩', '朴社長', '崔大膽', '李暴富', '鄭成功', '王牌', '吳缺錢', '地下室老妖', '超級企劃', '防彈製作人'];
