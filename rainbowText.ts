import React from 'react';

export const tem = (text, color = 'rainbow') => {
  const eleMaker = (t, r, g, b) =>
      React.createElement(
        'span',
        { style: { color: `rgb(${r},${g},${b})` } },
        t
      ),
    result = [];
  color === 'rainbow'
    ? text
        .split('')
        .forEach((l) =>
          result.push(
            eleMaker(
              l,
              Math.random() * 255,
              Math.random() * 255,
              Math.random() * 255
            )
          )
        )
    : result.push(eleMaker(text, color.r, color.g, color.b));
  return result;
};
