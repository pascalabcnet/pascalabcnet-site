import assert from 'node:assert/strict';
import test from 'node:test';
import { highlightPascalABC } from '../src/syntaxes/pascalabc-highlighting.mjs';

test('qualified and escaped identifiers do not highlight keyword-shaped members', async () => {
  const html = await highlightPascalABC('var a: System.Array;\n&Array');
  assert.match(html, /font-weight:bold">var<\/span>/);
  assert.doesNotMatch(html, /font-weight:bold">Array<\/span>/);
});
