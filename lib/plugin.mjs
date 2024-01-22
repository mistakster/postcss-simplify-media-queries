import { simplifyRules } from "./simplifyRule.mjs";

/**
 * A PostCSS plugin to remove redundant parts of the media description
 */
const plugin = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-simplify-media-queries',
    AtRule(rule) {
      const result = simplifyRules(rule.params);

      if (result.replace(/\s/g, '') !== '(min-width:0)') {
        rule.params = result;
        return;
      }

      rule.replaceWith(rule.nodes);
    }
  }
};

plugin.postcss = true;

export default plugin;
