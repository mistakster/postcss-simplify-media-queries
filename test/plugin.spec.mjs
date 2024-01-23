import { it, expect } from 'vitest';
import postcss from 'postcss';
import plugin from "../lib/plugin.mjs";

function process(css) {
  return postcss([plugin])
    .process(css, { from: undefined })
    .then(result => result.css);
}

it('should work', async () => {
  // language=CSS
  const css = `
      @media (min-width: 200px) and (min-width: 400px) {
          .example {
              padding: 0;
          }
      }
  `;

  await expect(process(css)).resolves.toMatchSnapshot();
});

it('should process (min-width: 0)', async () => {
  // language=CSS
  const css = `
      @media (min-width: 200px) and (min-width: 0) {
          .example {
              padding: 0;
          }
      }
  `;

  await expect(process(css)).resolves.toMatchSnapshot();
});

it('should completely remove useless (min-width: 0)', async () => {
  // language=CSS
  const css = `
      @media (min-width: 0) {
          .example {
              padding: 0;
          }
      }
  `;

  await expect(process(css)).resolves.toMatchSnapshot();
});

it('should parse multiple media queries', async () => {
  // language=CSS
  const css = `
      @media screen and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          .example {
              padding: 0;
          }
      }
  `;

  await expect(process(css)).resolves.toMatchSnapshot();
});
