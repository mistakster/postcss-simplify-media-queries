import { it, expect } from 'vitest';
import { simplifyRules } from '../lib/simplifyRule.mjs';

it('should return simple media description as is', () => {
  expect(simplifyRules('(min-width:200px)'))
    .toBe('(min-width:200px)');
});

it('should work for multiple media descriptions', () => {
  expect(simplifyRules('(min-width:200px) and (min-width:400px)'))
    .toBe('(min-width:400px)');
});

it('should find greatest media descriptions', () => {
  expect(simplifyRules('(min-width:200px) and (min-width:300px) and (min-width:400px)'))
    .toBe('(min-width:400px)');

  expect(simplifyRules('(min-width:300px) and (min-width:400px) and (min-width:200px)'))
    .toBe('(min-width:400px)');

  expect(simplifyRules('(min-width:400px) and (min-width:200px) and (min-width:300px)'))
    .toBe('(min-width:400px)');
});

it('should allow a media description with 0', () => {
  expect(simplifyRules('(min-width:200px) and (min-width:0)'))
    .toBe('(min-width:200px)');
});

it('skip mixed media descriptions', () => {
  expect(simplifyRules('(min-width:200px) and (min-width:40rem)'))
    .toBe('(min-width:200px) and (min-width:40rem)');
});

it('skip print media descriptions', () => {
  expect(simplifyRules('print and (min-width:200px)'))
    .toBe('print and (min-width:200px)');
});

it('skip remove screen media descriptions', () => {
  expect(simplifyRules('screen and (min-width:200px)'))
    .toBe('(min-width:200px)');
});

it('skip non-"min-width" media descriptions', () => {
  expect(simplifyRules('(min-width:200px) and (max-width:399.98px)'))
    .toBe('(min-width:200px) and (max-width:399.98px)');
});

it('should work with max-width correctly', () => {
  expect(simplifyRules('(max-width:199.98px) and (max-width:399.98px)'))
    .toBe('(max-width:199.98px)');
});
