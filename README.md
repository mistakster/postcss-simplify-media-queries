# postcss-simplify-media-queries

PostCSS plugin for simplifying media queries by removing redundant parts of the media description.
Installation

```bash
npm install postcss-simplify-media-queries --save-dev
```

## Usage

### Basic Usage

```javascript
import postcss from 'postcss';
import simplifyMediaQueries from 'postcss-simplify-media-queries';

const css = `
@media (min-width: 200px) and (min-width: 400px) {
  /* styles here */
}
`;

postcss([simplifyMediaQueries])
  .process(css)
  .then((result) => {
    console.log(result.css);
  });
```

### Example

Consider the following input:

```css
@media (min-width: 200px) and (min-width: 400px) {
  /* styles here */
}
```

After applying the postcss-simplify-media-queries plugin, the output will be:

```css
@media (min-width: 400px) {
  /* styles here */
}
```

### Options

This plugin doens’t support any options at the moment

### Test

To run the provided tests for this plugin, use the following command:

```bash
npm test
```

### Contributing

Feel free to contribute to this project. Bug reports, feature requests, and pull requests are welcome. Please follow the contribution guidelines.

### License

This project is licensed under the MIT License - see the LICENSE file for details.
