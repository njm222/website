// import x from '../examples/x';
import Frame1 from '../examples/frame-1';
import Frame2 from '../examples/frame-2';
import Frame3 from '../examples/frame-3';

function Scenes({ index }) {
  return (
    <>
      {/* testing */}
      {index === 0 && <Frame1 />}
      {index === 1 && <Frame2 />}
      {index === 2 && <Frame3 />}

      {/* Loading */}
      {/* TitleFocus */}
      {/* OtherScenes... */}
    </>
  );
}

export default Scenes;
