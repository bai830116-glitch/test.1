export type TimeUnit = 'minute' | 'hour' | 'day' | 'month';
export type SpeedMultiplier = 0 | 1 | 2 | 3 | 4 | 5;

export interface SpeedRequest {
  id: string;
  priority: number;
  speed: SpeedMultiplier;
  reason?: string;
}

type SubscriberCallback = (totalMinutes: number) => void;

class GlobalTimeBroker {
  private totalMinutes: number = 0;
  private speedQueue: Map<string, SpeedRequest> = new Map();
  private subscribers: Record<TimeUnit, Set<SubscriberCallback>> = {
    minute: new Set(),
    hour: new Set(),
    day: new Set(),
    month: new Set(),
  };

  private gameLoopInterval: ReturnType<typeof setInterval> | null = null;
  private currentSpeed: SpeedMultiplier = 0;
  private isSystemLocked: boolean = false;

  public init(initialMinutes: number = 0) {
    this.totalMinutes = initialMinutes;
    // P1 最低權限：全域長草基礎速度 (5x)
    this.requestSpeed('BASE_IDLE', 1, 5, '全域放置型基礎長草期');
    this.startGameLoop();
  }

  public get speed(): SpeedMultiplier {
    return this.currentSpeed;
  }
  
  public get time() {
    return this.totalMinutes;
  }

  public get locked() {
    return this.isSystemLocked;
  }

  public setSystemLock(locked: boolean) {
    this.isSystemLocked = locked;
    this.recalculateSpeed();
  }

  public requestSpeed(id: string, priority: number, speed: SpeedMultiplier, reason?: string) {
    this.speedQueue.set(id, { id, priority, speed, reason });
    this.recalculateSpeed();
  }

  public removeSpeedRequest(id: string) {
    this.speedQueue.delete(id);
    this.recalculateSpeed();
  }

  private recalculateSpeed() {
    if (this.isSystemLocked) {
      this.currentSpeed = 0;
      return;
    }

    let maxPriority = -1;
    let targetSpeed: SpeedMultiplier = 0;

    for (const req of this.speedQueue.values()) {
      if (req.priority > maxPriority) {
        maxPriority = req.priority;
        targetSpeed = req.speed;
      }
    }
    
    if (maxPriority === -1) {
      targetSpeed = 0;
    }

    this.currentSpeed = targetSpeed;
  }

  public subscribe(unit: TimeUnit, callback: SubscriberCallback) {
    this.subscribers[unit].add(callback);
    return () => this.unsubscribe(unit, callback);
  }

  public unsubscribe(unit: TimeUnit, callback: SubscriberCallback) {
    this.subscribers[unit].delete(callback);
  }

  // 固定30天去小數點純整數公式
  private notifySubscribers(elapsedMinutes: number) {
    const prevMinute = this.totalMinutes - elapsedMinutes;
    const currMinute = this.totalMinutes;

    if (Math.floor(prevMinute) !== Math.floor(currMinute)) {
      this.subscribers.minute.forEach(cb => cb(currMinute));
    }
    
    if (Math.floor(prevMinute / 60) !== Math.floor(currMinute / 60)) {
      this.subscribers.hour.forEach(cb => cb(currMinute));
    }

    if (Math.floor(prevMinute / (60 * 24)) !== Math.floor(currMinute / (60 * 24))) {
      this.subscribers.day.forEach(cb => cb(currMinute));
    }

    if (Math.floor(prevMinute / (60 * 24 * 30)) !== Math.floor(currMinute / (60 * 24 * 30))) {
      this.subscribers.month.forEach(cb => cb(currMinute));
    }
  }

  private startGameLoop() {
    if (this.gameLoopInterval) clearInterval(this.gameLoopInterval);
    let lastTick = performance.now();
    
    this.gameLoopInterval = setInterval(() => {
      const now = performance.now();
      const dtMs = now - lastTick;
      lastTick = now;

    if (this.currentSpeed > 0) {
        // Base mapping: game minutes added per real second
        // 0: pause, 1: 1x, 2: 10x, 3: 30x, 4: 60x, 5: 120x
        const SPEED_MAP = [0, 1, 10, 30, 60, 120]; 
        const minutesToAdd = (SPEED_MAP[this.currentSpeed] * (dtMs / 1000));
        this.totalMinutes += minutesToAdd;
        this.notifySubscribers(minutesToAdd);
      }
    }, 100);
  }
}

export const globalTimeBroker = new GlobalTimeBroker();
