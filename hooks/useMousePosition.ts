import { useState, useEffect } from 'react';
import { Coordinate } from '../types';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<Coordinate>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
};