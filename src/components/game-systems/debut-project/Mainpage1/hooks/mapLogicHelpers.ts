import { MapScoutStaff, Destination } from '../../../../../types/scout';
import { ALL_DESTINATIONS, SCOUT_LOGS } from '../MapConstants';

export const handleScoutFatigue = (
  scouts: MapScoutStaff[], 
  funds: number, 
  onSpendFunds?: (amt: number) => void,
  recoveryCost: number = 500
) => {
  return scouts.map(s => {
    if (s.fatigue > 20 && funds >= recoveryCost) {
      onSpendFunds?.(recoveryCost);
      return { ...s, fatigue: Math.max(0, s.fatigue - 10) };
    }
    return s;
  });
};

export const autoDispatchScouts = (
  scouts: MapScoutStaff[],
  destinations: Destination[],
  cityProgress: Record<string, number>,
  onTriggerNotification?: (msg: string) => void
) => {
  return scouts.map(scout => {
    if (scout.status === 'scouting' || !scout.targetCityId) {
      const sortedCities = [...destinations].sort((a, b) => (cityProgress[a.id] || 0) - (cityProgress[b.id] || 0));
      const bestTarget = sortedCities[0];
      if (bestTarget && bestTarget.id !== scout.targetCityId) {
         onTriggerNotification?.(`AI 決策：指派 ${scout.name} 前往優先探索區 ${bestTarget.name}`);
         return { ...scout, targetCityId: bestTarget.id, status: 'traveling' as const };
      }
    }
    return scout;
  });
};

export const getDiscoveryDetails = () => {
    const names = ['韓小東', 'MinJi', 'Alex', '櫻花', 'Jaden', 'Haruka', 'Luka'];
    const levels = ['SSR', 'SR', 'S', 'A'];
    const traits = ['絕對音感', '刀群舞', '主觀魅力', 'Rap 天才', '天生 C 位'];
    return {
        name: names[Math.floor(Math.random() * names.length)],
        level: levels[Math.floor(Math.random() * levels.length)],
        trait: traits[Math.floor(Math.random() * traits.length)]
    };
};
