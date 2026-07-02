import "expo-sqlite/localStorage/install";

type StorageListener = () => void;

const listenersByKey = new Map<string, Set<StorageListener>>();

const notify = (key: string) => {
  listenersByKey.get(key)?.forEach((listener) => listener());
};

export const storage = {
  get<TValue>(key: string, defaultValue: TValue): TValue {
    try {
      const storedValue = globalThis.localStorage.getItem(key);

      if (storedValue == null) {
        return defaultValue;
      }

      return JSON.parse(storedValue) as TValue;
    } catch {
      return defaultValue;
    }
  },

  remove(key: string): void {
    try {
      globalThis.localStorage.removeItem(key);
      notify(key);
    } catch {
      // Storage errors should not break the UI; callers continue with in-memory state.
    }
  },

  set<TValue>(key: string, value: TValue): void {
    try {
      globalThis.localStorage.setItem(key, JSON.stringify(value));
      notify(key);
    } catch {
      // Storage errors should not break the UI; callers continue with in-memory state.
    }
  },

  subscribe(key: string, listener: StorageListener): () => void {
    const listeners = listenersByKey.get(key) ?? new Set<StorageListener>();
    listeners.add(listener);
    listenersByKey.set(key, listeners);

    return () => {
      listeners.delete(listener);

      if (listeners.size === 0) {
        listenersByKey.delete(key);
      }
    };
  },
};
