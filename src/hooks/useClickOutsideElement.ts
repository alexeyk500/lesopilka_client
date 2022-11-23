import React, { useEffect } from 'react';

export default function useClickOutsideElement(
  ref: React.RefObject<Element>,
  onClickOutSide: () => void,
  exceptionRef?: React.RefObject<Element>
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exceptionRef) {
        if (
          event &&
          event.target &&
          ref.current &&
          !ref.current.contains(event.target as HTMLElement) &&
          exceptionRef.current &&
          !exceptionRef.current.contains(event.target as HTMLElement)
        ) {
          onClickOutSide();
        }
      } else {
        if (event && event.target && ref.current && !ref.current.contains(event.target as HTMLElement)) {
          onClickOutSide();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutSide, exceptionRef]);
}

// Example to use
// useClickOutsideElement(ref, ()=>{ setIsShowMenu(false) });
