import assert from 'node:assert/strict';
import test from 'node:test';
import { convertTopics } from '../scripts/convert-language-guide-html.mjs';

test('legacy HTML converter produces UTF-8 Markdown with stable links and code blocks', () => {
  const converted = convertTopics(['variables', 'type-declarations', 'scope', 'integer-types'], { write: false });
  assert.equal(converted.length, 4);
  for (const { markdown, topicId } of converted) {
    assert(!markdown.includes('\uFFFD'), `${topicId}: invalid UTF-8`);
    assert(!/<\/?(?:html|body|font|blockquote)\b/i.test(markdown), `${topicId}: legacy HTML leaked`);
    assert(!/^# /m.test(markdown), `${topicId}: layout owns h1`);
    assert.match(markdown, /```pascalabc\n/);
  }
  assert.match(converted[0].markdown, /\/language-guide\/variable-statement\//);
  assert.match(converted[0].markdown, /\/language-guide\/tuples\//);
  assert.match(converted[0].markdown, /\/language-guide\/for\//);
  assert.match(converted[1].markdown, /\/language-guide\/type-compatibility\//);
  assert.match(converted[2].markdown, /\/language-guide\/routine-overloading\//);
  assert.match(converted[2].markdown, /\/language-guide\/inherited\//);
  assert.match(converted[0].markdown, /\nkeywords:\n  - var\n---/);
  assert.match(converted[1].markdown, /\nkeywords:\n  - type\n---/);
  assert.match(converted[2].markdown, /\nkeywords:\n  - Пространство имен\n  - Область действия имени\n---/);
  assert.match(converted[3].markdown, /https:\/\/pascalabc\.net\/downloads\/pabcnethelp\/LangGuide\/PABCSystemUnit\/Files\/Standard%20constants\.html/);
});
