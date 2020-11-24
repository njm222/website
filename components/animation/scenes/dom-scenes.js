import Frame1 from '../frames/frame-1';
import Frame3 from '../frames/frame-3';
import { useTimeline } from '../store';

function Scenes() {
  const frameIndex = useTimeline((s) => s.frame);
  return (
    <>
      {frameIndex === 1 && <Frame1 />}
      {frameIndex === 3 && <Frame3 />}
    </>
  );
}

export default Scenes;
