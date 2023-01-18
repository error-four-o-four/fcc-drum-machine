import { useEffect, useRef, useState } from 'react';
import { names, pads } from './assets/audio.js';

import Pad from './components/Pad.jsx';

export default function App() {
  const [displayState, setDisplay] = useState(' ');
  const displayRef = useRef();

  useEffect(() => {
    console.log(names);
  }, []);

  return (
    <div id="drum-machine" className="App">
      <div id="display" ref={displayRef}>
        {displayState}
      </div>
      <div className="pads-wrap">
        {pads.map((props) => (
          <Pad key={props.key} props={props} setDisplay={setDisplay} />
        ))}
      </div>
    </div>
  );
}
