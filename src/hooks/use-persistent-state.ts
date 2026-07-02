import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { storage } from "@/services/storage";

export function usePersistentState<TValue>(
  key: string,
  defaultValue: TValue,
): [TValue, Dispatch<SetStateAction<TValue>>] {
  const [value, setValue] = useState<TValue>(() => storage.get(key, defaultValue));

  useEffect(() => {
    setValue(storage.get(key, defaultValue));

    return storage.subscribe(key, () => {
      setValue(storage.get(key, defaultValue));
    });
  }, [defaultValue, key]);

  const setPersistentValue = useCallback<Dispatch<SetStateAction<TValue>>>(
    (nextValue) => {
      setValue((currentValue) => {
        const resolvedValue = typeof nextValue === "function"
          ? (nextValue as (currentValue: TValue) => TValue)(currentValue)
          : nextValue;

        storage.set(key, resolvedValue);
        return resolvedValue;
      });
    },
    [key],
  );

  return [value, setPersistentValue];
}
