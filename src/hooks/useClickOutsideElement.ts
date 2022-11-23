import React, { useEffect } from 'react';

export default function useClickOutsideElement(ref: React.RefObject<Element>, onClickOutSide: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event && event.target && ref.current && !ref.current.contains(event.target as HTMLElement)) {
        onClickOutSide();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutSide]);
}

// Example to use
// useClickOutsideElement(ref, ()=>{ setIsShowMenu(false) });
