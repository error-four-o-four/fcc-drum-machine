const path = './audio/';

export const names =
  'heater-1 heater-2 heater-3 heater-4 hat-closed hat-open clap kick-and-hat kick'.split(
    ' '
  );

export const keys = 'q w e a s d z x c'.split(' ');

export const pads = names.map((name, index) => {
  const key = keys[index];
  const file = `${path}${name}.mp3`;
  return {
    name,
    file,
    key,
  };
}, {});
