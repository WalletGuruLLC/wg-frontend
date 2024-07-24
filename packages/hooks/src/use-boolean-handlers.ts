import { useCallback, useState } from "react";

/**
 * @returns [value, setTrue, setFalse, toggle]
 */
export function useBooleanHandlers(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((prev) => !prev), []);
  return [value, setTrue, setFalse, toggle] as const;
}
