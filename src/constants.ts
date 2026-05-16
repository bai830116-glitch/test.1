export const Z_INDEX = {
  GAME_SYSTEM: 10,      // 底層遊戲系統內容 (Scout, Dorm, etc.)
  LEFT_NAV_BG: 400,     // 子系統選單遮罩 (需高於地圖等複雜零件)
  LEFT_NAV: 410,        // 子系統選單主體
  TOP_HUD: 600,         // 頂部全域資訊列 (時鐘、貨幣，需在子選單之上)
  RIGHT_NAV_BG: 1000,   // 全域導航遮罩 (鎖定全域操作)
  RIGHT_NAV: 1100,      // 全域導航選單
  POPUP_OVERLAY: 2000,  // 彈窗遮罩
  POPUP_CONTENT: 2100   // 彈窗內容
};

export const GAME_BALANCE = {
  INITIAL_FUNDS: 250000,
  RADAR_BASE_COST: 10000,
  RADAR_COST_EXPONENT: 2.5,
  SERVER_BASE_COST: 15000,
  SERVER_COST_EXPONENT: 2.8,
  STAFF_RECRUIT_COST: 50000,
  STAFF_RECRUIT_MIN_FUNDS: 80000,
  STAFF_FATIGUE_RECOVERY_COST: 20,
  STAFF_MAX_COUNT: 8,
};

export const UI_COLORS = {
  TIFFANY: '#0ABAB5',
  TIFFANY_DARK: '#088F8F',
  MACARON: '#FFED99',
  CORAL: '#FF85A2',
};
