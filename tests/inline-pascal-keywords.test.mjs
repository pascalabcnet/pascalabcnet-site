import assert from 'node:assert/strict';
import test from 'node:test';
import { inlinePascalKeywordNodes } from '../src/markdown/inline-pascal-keywords.mjs';

const rendered = (value) => inlinePascalKeywordNodes(value).map((node) =>
  node.type === 'text' ? node.value : `<strong>${node.children[0].value}</strong>`
).join('');

test('only standalone Pascal keywords are highlighted in inline code', () => {
  assert.equal(rendered('begin'), '<strong>begin</strong>');
  assert.equal(rendered('begin/end'), '<strong>begin</strong>/<strong>end</strong>');
  assert.equal(rendered('System.Array'), 'System.Array');
  assert.equal(rendered('.Array'), '.Array');
  assert.equal(rendered('&Array'), '&Array');
  assert.equal(rendered('arrayLength'), 'arrayLength');
  assert.equal(
    rendered('sealed sequence sizeof event auto extensionmethod typeof where abstract default external internal overload override params private protected public reintroduce'),
    '<strong>sealed</strong> <strong>sequence</strong> <strong>sizeof</strong> <strong>event</strong> <strong>auto</strong> <strong>extensionmethod</strong> <strong>typeof</strong> <strong>where</strong> <strong>abstract</strong> <strong>default</strong> <strong>external</strong> <strong>internal</strong> <strong>overload</strong> <strong>override</strong> <strong>params</strong> <strong>private</strong> <strong>protected</strong> <strong>public</strong> <strong>reintroduce</strong>'
  );
});
