import { useState, useEffect } from 'react';

export function useEncounterLogic(
  pendingEncounters: any[] = [],
  isVisible: boolean = true,
  scoutGenes: string[] = [],
  currentMonth: number,
  currentDay: number,
  onResolveEncounter?: (id: string) => void
) {
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [aiLog, setAiLog] = useState<{ 
    id: string, 
    name: string,
    rarity: string,
    type: string,
    avatar: string,
    text: string, 
    status: 'success' | 'fail' | 'processing',
    timestamp: string,
    month: number,
    day: number
  }[]>([]);

  useEffect(() => {
    if (pendingEncounters.length === 0 || !isVisible) {
       if (!isVisible && processingId) setProcessingId(null);
       return;
    }
    
    if (processingId) return;

    const target = pendingEncounters[0];
    setProcessingId(target.id);
    
    const newLogId = target.id;
    const logMonth = currentMonth;
    const logDay = currentDay;
    
    setAiLog(prev => [{
      id: newLogId, 
      name: target.name,
      rarity: target.rarity,
      type: target.type || 'VOCAL',
      avatar: target.avatar || '👤',
      text: `AI Agent 正在約談分析 ${target.name} 的資料...`,
      status: 'processing' as const,
      timestamp: new Date().toLocaleTimeString('zh-TW', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      month: logMonth,
      day: logDay
    }, ...prev]);

    const negotiationTimer = setTimeout(() => {
      const isHighNetwork = scoutGenes.includes('高奢人脈');
      const baseChance = target.rarity === 'S' || target.rarity === 'SS' ? 0.35 : 0.65;
      const finalChance = isHighNetwork ? baseChance + 0.2 : baseChance;
      const isSuccess = Math.random() < finalChance;

      setAiLog(prev => prev.map(log => log.id === newLogId ? { 
        ...log, 
        text: isSuccess 
          ? `[簽約成功] 經過深度分析與利益交涉，${target.name} 已正式簽署合約行程。` 
          : `[交涉失敗] ${target.name} 對本公司條件有疑慮，會談取消。`, 
        status: isSuccess ? 'success' : 'fail'
      } : log));

      const resolutionTimer = setTimeout(() => {
        onResolveEncounter?.(target.id);
        setProcessingId(null);
      }, 1000);

      return () => clearTimeout(resolutionTimer);
    }, 2500);

    return () => clearTimeout(negotiationTimer);
  }, [pendingEncounters, processingId, scoutGenes, onResolveEncounter, currentMonth, currentDay, isVisible]);

  return {
    processingId,
    selectedId,
    setSelectedId,
    aiLog,
    setAiLog
  };
}
