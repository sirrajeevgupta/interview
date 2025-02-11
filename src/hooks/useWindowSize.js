import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    const cleanup = () => {
      console.log('handleResize function is called');
      window.removeEventListener('resize', handleResize);
    };

    return cleanup;
  }, []);

  return windowSize;
};

export default useWindowSize;
