import { useEffect, useRef, useState } from 'react';
import * as _ from 'lodash-es';

export type TThrottleFn = ReturnType<typeof _.throttle>;

function useThrottle<T>(value: T, interval: number = 1000) {
  const [throttledState, setThrottledState] = useState<T>(value);
  const $th = useRef<TThrottleFn | null>();
  useEffect(() => {
    $th.current = _.throttle((_value: T) => {
      setThrottledState(_value);
    }, interval);

    return () => {
      $th.current?.cancel();
      $th.current = null;
    };
  }, []);

  useEffect(() => {
    // 현재상태와 최신상태가 다를때만 값 갱신 수행
    const _equal = _.isEqual(value, throttledState);
    if ($th.current && !_equal) {
      $th.current(value);
    }
  }, [value, throttledState]);

  return throttledState;
}

export default useThrottle;
