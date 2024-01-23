import { parse, generate } from 'css-tree';

function isSingleDescription(children) {
  return !children.some(child => child.type === 'Identifier' && child.name === 'and');
}

function isMixedDescription(children) {
  const firstChildWithMediaFeature = children.find(child => (
    child.type === 'MediaFeature' && child.value.type === 'Dimension'
  ));

  if (!firstChildWithMediaFeature) {
    return true;
  }

  return !children.every(child => {
    if (child.type === 'Identifier' && child.name === 'print') {
      return false;
    }

    if (child.type !== 'MediaFeature') {
      return true;
    }

    return child.name === firstChildWithMediaFeature.name && (
      (child.value.type === 'Number' && child.value.value === '0')
      || (child.value.type === 'Dimension' && child.value.unit === firstChildWithMediaFeature.value.unit)
    );
  });
}

function compare(child1, child2) {
  if (child1.name === 'min-width') {
    return parseFloat(child1.value.value) > parseFloat(child2.value.value);
  } else if (child1.name === 'max-width') {
    return parseFloat(child1.value.value) < parseFloat(child2.value.value);
  }

  return false;
}

/**
 * @param {string} input
 * @returns {string}
 */
export function simplifyRules(input) {
  if (input.indexOf('>') >= 0 || input.indexOf('<') >= 0) {
    return input;
  }

  const ast = parse(input, {
    context: 'mediaQueryList'
  });

  ast.children.forEach((mediaQuery) => {
    const children = mediaQuery.children.toArray();

    if (isSingleDescription(children)) {
      // skip single values
      return input;
    }

    if (isMixedDescription(children)) {
      // skip mixed queries (eg. min and max)
      return input;
    }

    const greatest = children.reduce((acc, child) => {
      if (child.type !== 'MediaFeature') {
        return acc;
      }

      if (!acc) {
        return child;
      }

      try {
        return compare(acc, child) ? acc : child;
      } catch (err) {
        console.error(err.message);
        console.error(acc);
        console.error(child);
        return acc;
      }
    }, null);

    ast.children = [greatest];
  });

  return generate(ast, {});
}
