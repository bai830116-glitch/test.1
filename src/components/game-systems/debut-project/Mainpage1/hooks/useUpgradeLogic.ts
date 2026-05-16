import { useState } from 'react';

interface UseUpgradeLogicProps {
  radarLevel: number;
  serverLevel: number;
  funds: number;
  agencyLevel?: number;
  onUpgradeRadar: (newRadius: number, newLevel: number, cost: number) => void;
  onUpgradeServer: (newLevel: number, cost: number) => void;
}

export function useUpgradeLogic({
  radarLevel,
  serverLevel,
  funds,
  agencyLevel = 1,
  onUpgradeRadar,
  onUpgradeServer
}: UseUpgradeLogicProps) {
  const radarCost = Math.floor(10000 * Math.pow(2.5, radarLevel - 1));
  const serverCost = Math.floor(15000 * Math.pow(2.8, serverLevel - 1));

  const radarReqLevel = radarLevel * 2;
  const serverReqLevel = serverLevel * 2 + 1;

  const isRadarLevelLocked = agencyLevel < radarReqLevel;
  const isServerLevelLocked = agencyLevel < serverReqLevel;

  const [showRadarUpgrading, setShowRadarUpgrading] = useState(false);
  const [showServerUpgrading, setShowServerUpgrading] = useState(false);

  const radarScale = Math.min(1.3, 1 + (radarLevel - 1) * 0.10);

  const handleUpgradeRadar = () => {
    if (funds >= radarCost && !isRadarLevelLocked) {
      const newLevel = radarLevel + 1;
      onUpgradeRadar(1200 + (newLevel - 1) * 1300, newLevel, radarCost);
      setShowRadarUpgrading(true);
      setTimeout(() => setShowRadarUpgrading(false), 2000);
    }
  };

  const handleUpgradeServer = () => {
    if (funds >= serverCost && !isServerLevelLocked) {
      const newLevel = serverLevel + 1;
      onUpgradeServer(newLevel, serverCost);
      setShowServerUpgrading(true);
      setTimeout(() => setShowServerUpgrading(false), 2000);
    }
  };

  return {
    radarCost,
    serverCost,
    radarReqLevel,
    serverReqLevel,
    isRadarLevelLocked,
    isServerLevelLocked,
    showRadarUpgrading,
    showServerUpgrading,
    radarScale,
    handleUpgradeRadar,
    handleUpgradeServer
  };
}
