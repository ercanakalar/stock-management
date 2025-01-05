import { useState, useEffect, useMemo } from 'react';

const useIsMobile = (breakpoint: number): boolean => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return useMemo(() => width <= breakpoint, [width, breakpoint]);
};

export default useIsMobile;
