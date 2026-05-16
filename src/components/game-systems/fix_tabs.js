const fs = require('fs');
const path = require('path');

const dir = 'src/components/game-systems';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file === 'index.tsx' || file === 'debut-project') continue;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace SUB_TABS
  content = content.replace(/const SUB_TABS = \[[\s\S]*?\];/, `const SUB_TABS: {id: string; label: string; icon?: React.ReactNode}[] = [];`);
  
  // Replace activeTab init
  content = content.replace(/useState\(SUB_TABS\[0\]\.id\)/, "useState(SUB_TABS[0]?.id || '')");
  
  // Replace the label render
  content = content.replace(/\{SUB_TABS\.find\(t=>t\.id===activeTab\)\?\.label\}/, "{SUB_TABS.find(t=>t.id===activeTab)?.label || '暫無內容'}");
  
  // If it's MasterFans or MerchSanctuary or DormLife or ContractTable, it has an icon
  content = content.replace(/\{SUB_TABS\.find\(t=>t\.id===activeTab\)\?\.icon\}/, "{SUB_TABS.find(t=>t.id===activeTab)?.icon}");

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}
