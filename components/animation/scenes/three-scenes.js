import Frame0 from '../frames/frame-0';
import Frame2 from '../frames/frame-2';
import Frame4 from '../frames/frame-4';
import { useTimeline } from '../store';

function Scenes() {
  const frameIndex = useTimeline((s) => s.frame);
  return (
    <>
      {frameIndex === 0 && <Frame0 />}
      {frameIndex === 2 && <Frame2 />}
      {frameIndex === 4 && <Frame4 />}
    </>
  );
}

export default Scenes;
