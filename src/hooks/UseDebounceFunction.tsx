import { useRef, useEffect } from 'react';

export default function UseDebouncedFunction<F extends (...args: any) => ReturnType<F>>(
  callback: F,
  delay = 250,
  cleanUp = false
) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return (args: any) => {
    clearTimer();
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  };
}

//---Example how to use hook in a component---
//const sendRequest = UseDebouncedFunction((value) => {console.log('request to BackEnd -', value)}, 2000, true);
//sendRequest(500)
