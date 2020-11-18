import create from 'zustand';

const DOM_FRAMES = [1, 3];
const THREE_FRAMES = [0, 2, 4];

export const useInverseBlending = create((set, get) => ({
  inverse: false,
  setInverse: (inverse) => {
    if (inverse !== get().inverse) {
      set({ inverse });
    }
  },
}));

export const useTimeline = create((set) => ({
  frame: 0,
  isDomFrame: false,
  isThreeFrame: true,
  increaseStep: () =>
    set(({ frame }) => {
      const newFrame = frame + 1;
      return {
        frame: newFrame,
        isDomFrame: DOM_FRAMES.includes(newFrame),
        isThreeFrame: THREE_FRAMES.includes(newFrame),
      };
    }),
}));
