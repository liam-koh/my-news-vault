import { useEffect, useRef, useState } from 'react';
import * as _ from 'lodash-es';

type TDebounceFn = ReturnType<typeof _.debounce>;

/**
 * @param duration debounce duration ms, default: 1000ms
 * @param keys queryKey
 * @returns
 */
function useDebounce<T>(value: T, duration: number = 1000) {
  const $de = useRef<TDebounceFn | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    $de.current = _.debounce((_value: T) => {
      setDebouncedValue(_value);
    }, duration);

    return () => {
      $de.current?.cancel();
      $de.current = null;
    };
  }, []);

  useEffect(() => {
    const _equal = _.isEqual(value, debouncedValue);
    if ($de.current && !_equal) {
      $de.current(value);
    }
  }, [value, debouncedValue]);

  return debouncedValue;
}

export default useDebounce;