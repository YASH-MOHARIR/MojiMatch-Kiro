import { useEffect, useState } from 'react';
import { Achievement } from '../../shared/constants/achievements';

interface AchievementPopupProps {
  achievement: Achievement;
  onClose: () => void;
}

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in
    setTimeout(() => setVisible(true), 100);

    // Auto-dismiss after 4 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getTierColor = (tier: Achievement['tier']) => {
    switch (tier) {
      case 'bronze':
        return 'from-orange-600 to-orange-400';
      case 'silver':
        return 'from-gray-400 to-gray-300';
      case 'gold':
        return 'from-yellow-500 to-yellow-300';
      case 'platinum':
        return 'from-purple-600 to-purple-400';
    }
  };

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div
        className={`bg-gradient-to-r ${getTierColor(achievement.tier)} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px]`}
      >
        <div className="text-4xl">{achievement.icon}</div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase opacity-90">Achievement Unlocked!</div>
          <div className="text-lg font-bold">{achievement.name}</div>
          <div className="text-sm opacity-90">{achievement.description}</div>
        </div>
        <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded uppercase font-bold">
          {achievement.tier}
        </div>
      </div>
    </div>
  );
}
