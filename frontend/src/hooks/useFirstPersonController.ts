import { useEffect, useMemo, useState } from 'react';

const keyMap: Record<string, string> = {
  KeyW: 'forward',
  ArrowUp: 'forward',
  KeyS: 'backward',
  ArrowDown: 'backward',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
};

export const useFirstPersonController = () => {
  const [pressed, setPressed] = useState<Record<string, boolean>>({});
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    const handleDown = (event: KeyboardEvent) => {
      const key = keyMap[event.code];
      if (!key) return;
      setPressed((state) => ({ ...state, [key]: true }));
      setHintVisible(false);
    };
    const handleUp = (event: KeyboardEvent) => {
      const key = keyMap[event.code];
      if (!key) return;
      setPressed((state) => ({ ...state, [key]: false }));
    };
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  return useMemo(
    () => ({
      pressed,
      hintVisible,
      velocity: {
        x: (pressed.right ? 1 : 0) - (pressed.left ? 1 : 0),
        z: (pressed.backward ? 1 : 0) - (pressed.forward ? 1 : 0),
      },
    }),
    [hintVisible, pressed],
  );
};
