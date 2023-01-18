import { useCallback, useEffect, useRef, useState } from 'react';

export default function Pad({ props, setDisplay }) {
  const { name, file, key } = props;
  const audioRef = useRef();

  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    if (!loaded || audioRef.current === null) return;

    if (playing) {
      // audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setPlaying(true);
    setDisplay(name);
    audioRef.current.play();
  }, [loaded, playing, setDisplay, name]);

  // const updateVolume = useCallback(
  //   (value) => {
  //     if (audioRef.current === null) return;

  //     setVolume(value);
  //     audioRef.current.volume = value;
  //   },
  //   [audioRef.current]
  // );

  useEffect(() => {
    const ref = audioRef.current;

    const onKeyDown = (e) => e.key === key && play();

    const loadedSource = () => {
      setLoaded(true);
    };

    const stopped = () => {
      setPlaying(false);
      setDisplay(' ');
      ref.currentTime = 0;
    };

    // audioRef.current.volume = volume;
    ref.addEventListener('canplay', loadedSource);
    ref.addEventListener('ended', stopped);

    window.addEventListener('keydown', onKeyDown);

    return () => {
      ref.removeEventListener('canplay', loadedSource);
      ref.removeEventListener('ended', stopped);

      window.removeEventListener('keydown', onKeyDown);
    };
  }, [key, play, setDisplay]);

  return (
    <button
      id={name}
      key={key}
      type="button"
      value={key}
      className={`drum-pad ${playing ? 'playing' : ''}`}
      onClick={play}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} id={key} className="clip" src={file} />
      {!loaded ? '...' : key.toLocaleUpperCase()}
    </button>
  );
}
