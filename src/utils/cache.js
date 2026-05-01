/**
 * FoodLink Tactical Cache Engine
 * Manages local storage persistent data with expiration logic.
 */
const CACHE_PREFIX = 'foodlink_cache_';
const DEFAULT_TTL = 3600 * 1000; // 1 Hour

export const cacheService = {
  /**
   * Set a tactical signal in cache
   */
  set(key, data, ttl = DEFAULT_TTL) {
    const payload = {
      data,
      expiry: Date.now() + ttl
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
  },

  /**
   * Retrieve signal from cache
   */
  get(key) {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    try {
      const payload = JSON.parse(raw);
      if (Date.now() > payload.expiry) {
        localStorage.removeItem(CACHE_PREFIX + key);
        return null;
      }
      return payload.data;
    } catch (e) {
      return null;
    }
  },

  /**
   * Purge specific signal
   */
  remove(key) {
    localStorage.removeItem(CACHE_PREFIX + key);
  },

  /**
   * Global cache wipe
   */
  clear() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
};
