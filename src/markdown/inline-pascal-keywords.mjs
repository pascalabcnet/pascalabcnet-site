const keywords = new Set([
  'abstract', 'and', 'array', 'as', 'auto', 'begin', 'break', 'case', 'class', 'const', 'constructor',
  'continue', 'destructor', 'div', 'do', 'downto', 'else', 'end', 'except', 'exit',
  'default', 'event', 'exports', 'external', 'false', 'file', 'finalization', 'finally', 'for', 'foreach', 'forward',
  'function', 'goto', 'if', 'implementation', 'in', 'inherited', 'initialization',
  'interface', 'internal', 'is', 'label', 'lock', 'loop', 'mod', 'new', 'nil', 'not', 'of', 'on',
  'operator', 'or', 'overload', 'override', 'packed', 'params', 'private', 'procedure', 'program', 'property', 'protected', 'public', 'raise', 'record',
  'reintroduce', 'repeat', 'sealed', 'sequence', 'set', 'shl', 'shr', 'sizeof', 'then', 'to', 'true', 'try', 'type', 'typeof', 'unit', 'until',
  'uses', 'var', 'virtual', 'where', 'while', 'with', 'xor', 'yield', 'extensionmethod'
]);

export function inlinePascalKeywordNodes(value) {
  const nodes = [];
  let last = 0;
  for (const match of value.matchAll(/[A-Za-z]+/g)) {
    const word = match[0];
    if (!keywords.has(word.toLowerCase())) continue;
    const before = value[match.index - 1] ?? '';
    const after = value[match.index + word.length] ?? '';
    if (/[A-Za-z0-9_.$&]/.test(before) || /[A-Za-z0-9_.$&]/.test(after)) continue;
    if (match.index > last) nodes.push({ type: 'text', value: value.slice(last, match.index) });
    nodes.push({ type: 'element', tagName: 'strong', properties: { className: ['pascal-keyword'] }, children: [{ type: 'text', value: word }] });
    last = match.index + word.length;
  }
  if (last < value.length) nodes.push({ type: 'text', value: value.slice(last) });
  return nodes.length ? nodes : [{ type: 'text', value }];
}

function visit(node, parent) {
  if (node.type === 'element' && node.tagName === 'code' && parent?.tagName !== 'pre') {
    const value = node.children?.map((child) => child.value ?? '').join('') ?? '';
    node.children = inlinePascalKeywordNodes(value);
    return;
  }
  for (const child of node.children ?? []) visit(child, node);
}

// Rehype plugin: only inline <code>, never fenced code blocks inside <pre>.
export default function inlinePascalKeywords() {
  return (tree) => visit(tree, undefined);
}
