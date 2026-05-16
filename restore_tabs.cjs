const fs = require('fs');
const path = require('path');

const dir = 'src/components/game-systems';
const files = fs.readdirSync(dir);

const TABS_CONTENT = {
  'MainStage.tsx': [
    { id: 'rehearsal', label: '地獄彩排', icon: "'🎤'" },
    { id: 'live', label: '正式打歌', icon: "'📺'" },
    { id: 'waitingRoom', label: '待機室生存', icon: "'🛋️'" },
  ],
  'DebutProject.tsx': [
    { id: 'planning', label: '大餅企劃書', icon: "'📋'" },
    { id: 'evaluation', label: '月末血汗評價', icon: "'📊'" },
    { id: 'showcase', label: '出道Showcase', icon: "'✨'" },
  ],
  'IdolTroop.tsx': [
    { id: 'status', label: '乖孫狀態', icon: "'💖'" },
    { id: 'training', label: '魔鬼訓練', icon: "'🏋️'" },
    { id: 'mental', label: '心理小房間', icon: "'🧠'" },
  ],
  'RecordingStudio.tsx': [
    { id: 'vocal', label: '百萬配唱', icon: "'🎧'" },
    { id: 'mixing', label: '百搭混音', icon: "'🎛️'" },
    { id: 'mastering', label: '玄學母帶', icon: "'💿'" },
  ],
  'MusicCopyright.tsx': [
    { id: 'library', label: '神曲庫', icon: "'🎶'" },
    { id: 'royalty', label: '印鈔機結算', icon: "'💰'" },
    { id: 'lawsuit', label: '抄襲吉他', icon: "'⚖️'" },
  ],
  'LoreUniverse.tsx': [
    { id: 'concept', label: '中二設定集', icon: "'📖'" },
    { id: 'storyline', label: '狗血劇情線', icon: "'🎭'" },
    { id: 'easterEggs', label: '粉絲腦補彩蛋', icon: "'🥚'" },
  ],
  'GlobalComeback.tsx': [
    { id: 'teaser', label: '預告詐欺', icon: "'🎬'" },
    { id: 'styling', label: '奇葩打歌服', icon: "'👗'" },
    { id: 'tour', label: '巡迴斂財', icon: "'✈️'" },
  ],
  'ChampionRoad.tsx': [
    { id: 'streaming', label: '音源水軍', icon: "'📱'" },
    { id: 'sales', label: '骨折銷量', icon: "'📦'" },
    { id: 'strategy', label: '黑箱打榜', icon: "'📈'" },
  ],
  'RedCarpetPVP.tsx': [
    { id: 'fashion', label: '高訂借用大戰', icon: "'👠'" },
    { id: 'makeup', label: '得罪化妝師', icon: "'💄'" },
    { id: 'pr', label: '艷壓通稿', icon: "'📰'" },
  ],
  'FandomBase.tsx': [
    { id: 'fancafe', label: '官咖維穩', icon: "'☕'" },
    { id: 'anti', label: '反黑爆破組', icon: "'🛡️'" },
    { id: 'cheer', label: '應援海嘯', icon: "'📣'" },
  ],
  'MasterFans.tsx': [
    { id: 'photos', label: '神仙站姐圖', icon: "'📸'" },
    { id: 'trending', label: '超話霸榜', icon: "'🔥'" },
    { id: 'monitoring', label: '私生監察', icon: "'🕵️'" },
  ],
  'MerchSanctuary.tsx': [
    { id: 'lightstick', label: '凶器手燈', icon: "'🔦'" },
    { id: 'photocard', label: '廢紙小卡', icon: "'🃏'" },
    { id: 'shop', label: '信仰充值所', icon: "'🛒'" },
  ],
  'DormLife.tsx': [
    { id: 'decor', label: '豬窩佈置', icon: "'🛏️'" },
    { id: 'food', label: '外送偷吃防禦', icon: "'🍗'" },
    { id: 'escape', label: '半夜翻牆防堵', icon: "'🚧'" },
  ],
  'ContractTable.tsx': [
    { id: 'renewal', label: '畫押續約', icon: "'📝'" },
    { id: 'profit', label: '吸血分潤', icon: "'💸'" },
    { id: 'crisis', label: '解約公關戰', icon: "'🚨'" },
  ],
};

for (const file of files) {
  if (file === 'index.tsx' || file.includes('debut-project')) continue;
  const filePath = path.join(dir, file);
  if (!fs.statSync(filePath).isFile()) continue;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const tabs = TABS_CONTENT[file];
  if (tabs) {
    const tabsStr = `const SUB_TABS: {id: string; label: string; icon?: React.ReactNode}[] = [\n` + 
      tabs.map(t => `  { id: '${t.id}', label: '${t.label}', icon: ${t.icon} }`).join(',\n') +
      `\n];`;
    
    content = content.replace(/const SUB_TABS: \{id: string; label: string; icon\?: React\.ReactNode\}\[\] = \[\];/, tabsStr);
    fs.writeFileSync(filePath, content);
    console.log(`Restored tabs for ${file}`);
  }
}
