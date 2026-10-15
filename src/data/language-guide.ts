// Stable IDs only: translated titles and source file paths live elsewhere.
export type GuideSectionId = 'program' | 'types' | 'expressions' | 'statements' | 'routines' | 'modules' | 'classes' | 'exceptions' | 'interfaces' | 'generics' | 'functional' | 'memory' | 'openmp' | 'directives';

// Exactly two levels: section (folder), then its pages. No nested sections.
export interface GuideSection {
  id: GuideSectionId;
  topics: readonly string[];
}

export const guideNavigation: readonly GuideSection[] = [
  {
    id: 'program',
    topics: [
      'program-structure',
      'identifiers',
      'comments',
      'variables',
      'constants',
      'type-declarations',
      'labels',
      'scope',
      'short-program'
    ]
  },
  {
    id: 'types',
    topics: [
      'types',
      'value-and-reference-types',
      'integer-types',
      'real-types',
      'boolean',
      'char',
      'enum-and-subrange-types',
      'strings',
      'string-interpolation',
      'short-strings',
      'string-members',
      'arrays',
      'dynamic-arrays',
      'static-arrays',
      'records',
      'tuples',
      'sets',
      'file-types',
      'sequences',
      'pointers',
      'procedural-types',
      'type-compatibility',
      'dotnet-types'
    ]
  },
  {
    id: 'expressions',
    topics: [
      'expressions',
      'arithmetic-operators',
      'logical-operators',
      'bitwise-operators',
      'comparison-operators',
      'string-operators',
      'pointer-operators',
      'set-operators',
      'address-operator',
      'is-as',
      'new',
      'typeof-sizeof',
      'type-casts',
      'conditional-expressions',
      'ranges',
      'slices',
      'operator-precedence'
    ]
  },
  {
    id: 'statements',
    topics: [
      'statements',
      'assignment',
      'compound-assignment',
      'deconstruction',
      'compound-statement',
      'empty-statement',
      'if',
      'variable-statement',
      'case',
      'pattern-matching',
      'for',
      'loop',
      'foreach',
      'while-repeat',
      'with',
      'goto',
      'break-continue-exit',
      'yield',
      'yield-sequence',
      'try-except',
      'try-finally',
      'raise',
      'procedure-operators',
      'lock'
    ]
  },
  {
    id: 'routines',
    topics: [
      'routines',
      'routine-calls',
      'parameters',
      'variadic-parameters',
      'default-parameters',
      'short-routines',
      'named-arguments',
      'forward-declarations',
      'routine-overloading',
      'external-routines'
    ]
  },
  {
    id: 'modules',
    topics: [
      'module-structure',
      'uses',
      'short-units',
      'circular-unit-references',
      'libraries',
      'units-and-libraries',
      'documentation-comments'
    ]
  },
  {
    id: 'classes',
    topics: [
      'classes',
      'member-visibility',
      'methods',
      'field-initializers',
      'constructors',
      'forward-class-declarations',
      'self',
      'properties',
      'indexed-properties',
      'inheritance',
      'inherited',
      'constructor-inheritance',
      'virtual-methods',
      'abstract-classes',
      'operator-overloading',
      'static-members',
      'extension-methods',
      'attributes',
      'anonymous-classes',
      'auto-classes'
    ]
  },
  {
    id: 'exceptions',
    topics: [
      'exceptions',
      'standard-exceptions',
      'custom-exceptions',
      'reraise',
      'exception-examples'
    ]
  },
  {
    id: 'interfaces',
    topics: [
      'interfaces',
      'multiple-interfaces'
    ]
  },
  {
    id: 'generics',
    topics: [
      'generic-types',
      'generic-routines',
      'generic-routine-parameters',
      'generic-constraints',
      'covariance'
    ]
  },
  {
    id: 'functional',
    topics: [
      'lambda-expressions',
      'variable-capture',
      'sequence-methods'
    ]
  },
  {
    id: 'memory',
    topics: [
      'memory-management'
    ]
  },
  {
    id: 'openmp',
    topics: [
      'openmp',
      'parallel-for',
      'parallel-reduction',
      'parallel-sections',
      'critical'
    ]
  },
  {
    id: 'directives',
    topics: [
      'compiler-directives'
    ]
  }
];

// Independent of the navigation hierarchy and physical Markdown directories.
// Also the future order for a single-volume export of the guide.
// Kept explicit: moving a menu item must not silently change reading order.
export const guideReadingOrder: readonly string[] = [
  'program-structure',
  'identifiers',
  'comments',
  'variables',
  'constants',
  'type-declarations',
  'labels',
  'scope',
  'short-program',
  'types',
  'value-and-reference-types',
  'integer-types',
  'real-types',
  'boolean',
  'char',
  'enum-and-subrange-types',
  'strings',
  'string-interpolation',
  'short-strings',
  'string-members',
  'arrays',
  'dynamic-arrays',
  'static-arrays',
  'records',
  'tuples',
  'sets',
  'file-types',
  'sequences',
  'pointers',
  'procedural-types',
  'type-compatibility',
  'dotnet-types',
  'expressions',
  'arithmetic-operators',
  'logical-operators',
  'bitwise-operators',
  'comparison-operators',
  'string-operators',
  'pointer-operators',
  'set-operators',
  'address-operator',
  'is-as',
  'new',
  'typeof-sizeof',
  'type-casts',
  'conditional-expressions',
  'ranges',
  'slices',
  'operator-precedence',
  'statements',
  'assignment',
  'compound-assignment',
  'deconstruction',
  'compound-statement',
  'empty-statement',
  'if',
  'variable-statement',
  'case',
  'pattern-matching',
  'for',
  'loop',
  'foreach',
  'while-repeat',
  'with',
  'goto',
  'break-continue-exit',
  'yield',
  'yield-sequence',
  'try-except',
  'try-finally',
  'raise',
  'procedure-operators',
  'lock',
  'routines',
  'routine-calls',
  'parameters',
  'variadic-parameters',
  'default-parameters',
  'short-routines',
  'named-arguments',
  'forward-declarations',
  'routine-overloading',
  'external-routines',
  'module-structure',
  'uses',
  'short-units',
  'circular-unit-references',
  'libraries',
  'units-and-libraries',
  'documentation-comments',
  'classes',
  'member-visibility',
  'methods',
  'field-initializers',
  'constructors',
  'forward-class-declarations',
  'self',
  'properties',
  'indexed-properties',
  'inheritance',
  'inherited',
  'constructor-inheritance',
  'virtual-methods',
  'abstract-classes',
  'operator-overloading',
  'static-members',
  'extension-methods',
  'attributes',
  'anonymous-classes',
  'auto-classes',
  'exceptions',
  'standard-exceptions',
  'custom-exceptions',
  'reraise',
  'exception-examples',
  'interfaces',
  'multiple-interfaces',
  'generic-types',
  'generic-routines',
  'generic-routine-parameters',
  'generic-constraints',
  'covariance',
  'lambda-expressions',
  'variable-capture',
  'sequence-methods',
  'memory-management',
  'openmp',
  'parallel-for',
  'parallel-reduction',
  'parallel-sections',
  'critical',
  'compiler-directives'
];
