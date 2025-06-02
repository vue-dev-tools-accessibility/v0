export const dummyData = [
  {
    id: 'aria-prohibited-attr',
    impact: 'serious',
    tags: [
      'cat.aria',
      'wcag2a',
      'wcag412',
      'EN-301-549',
      'EN-9.4.1.2'
    ],
    description: 'Ensure ARIA attributes are not prohibited for an element\'s role',
    help: 'Elements must only use permitted ARIA attributes',
    helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr?application=axeAPI',
    nodes: [
      {
        any: [],
        all: [],
        none: [
          {
            id: 'aria-prohibited-attr',
            data: {
              role: null,
              nodeName: 'div',
              messageKey: 'noRoleSingular',
              prohibited: [
                'aria-label'
              ]
            },
            relatedNodes: [],
            impact: 'serious',
            message: 'aria-label attribute cannot be used on a div with no valid role attribute.'
          }
        ],
        impact: 'serious',
        html: '<div data-v-640ec535="" class="vue-devtools__anchor-btn panel-entry-btn" title="Toggle Vue DevTools" aria-label="Toggle devtools panel" style="">',
        target: [
          '.panel-entry-btn'
        ],
        failureSummary: 'Fix all of the following:\n  aria-label attribute cannot be used on a div with no valid role attribute.'
      }
    ]
  },
  {
    id: 'color-contrast',
    impact: 'serious',
    tags: [
      'cat.color',
      'wcag2aa',
      'wcag143',
      'TTv5',
      'TT13.c',
      'EN-301-549',
      'EN-9.1.4.3',
      'ACT'
    ],
    description: 'Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds',
    help: 'Elements must meet minimum color contrast ratio thresholds',
    helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/color-contrast?application=axeAPI',
    nodes: [
      {
        any: [
          {
            id: 'color-contrast',
            data: {
              fgColor: '#ffffff',
              bgColor: '#848484',
              contrastRatio: 3.74,
              fontSize: '11.3pt (15px)',
              fontWeight: 'normal',
              messageKey: null,
              expectedContrastRatio: '4.5:1'
            },
            relatedNodes: [
              {
                html: '<a data-v-7a7a37b1="" href="#/" class="router-link-active router-link-exact-active" aria-current="page"> Welcome </a>',
                target: [
                  '.router-link-active'
                ]
              },
              {
                html: '<body>',
                target: [
                  'body'
                ]
              }
            ],
            impact: 'serious',
            message: 'Element has insufficient color contrast of 3.74 (foreground color: #ffffff, background color: #848484, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1'
          }
        ],
        all: [],
        none: [],
        impact: 'serious',
        html: '<a data-v-7a7a37b1="" href="#/" class="router-link-active router-link-exact-active" aria-current="page"> Welcome </a>',
        target: [
          '.router-link-active'
        ],
        failureSummary: 'Fix any of the following:\n  Element has insufficient color contrast of 3.74 (foreground color: #ffffff, background color: #848484, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1'
      },
      {
        any: [
          {
            id: 'color-contrast',
            data: {
              fgColor: '#00bd7e',
              bgColor: '#464646',
              contrastRatio: 3.85,
              fontSize: '11.3pt (15px)',
              fontWeight: 'normal',
              messageKey: null,
              expectedContrastRatio: '4.5:1'
            },
            relatedNodes: [
              {
                html: '<a data-v-7a7a37b1="" href="#/pinia" class=""> Pinia Demo </a>',
                target: [
                  'a[href$="#/pinia"]'
                ]
              },
              {
                html: '<body>',
                target: [
                  'body'
                ]
              }
            ],
            impact: 'serious',
            message: 'Element has insufficient color contrast of 3.85 (foreground color: #00bd7e, background color: #464646, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1'
          }
        ],
        all: [],
        none: [],
        impact: 'serious',
        html: '<a data-v-7a7a37b1="" href="#/pinia" class=""> Pinia Demo </a>',
        target: [
          'a[href$="#/pinia"]'
        ],
        failureSummary: 'Fix any of the following:\n  Element has insufficient color contrast of 3.85 (foreground color: #00bd7e, background color: #464646, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1'
      },
      {
        any: [
          {
            id: 'color-contrast',
            data: {
              fgColor: '#00bd7e',
              bgColor: '#464646',
              contrastRatio: 3.85,
              fontSize: '11.3pt (15px)',
              fontWeight: 'normal',
              messageKey: null,
              expectedContrastRatio: '4.5:1'
            },
            relatedNodes: [
              {
                html: '<a data-v-7a7a37b1="" href="#/resources" class=""> Resources </a>',
                target: [
                  'a[href$="#/resources"]'
                ]
              },
              {
                html: '<body>',
                target: [
                  'body'
                ]
              }
            ],
            impact: 'serious',
            message: 'Element has insufficient color contrast of 3.85 (foreground color: #00bd7e, background color: #464646, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1'
          }
        ],
        all: [],
        none: [],
        impact: 'serious',
        html: '<a data-v-7a7a37b1="" href="#/resources" class=""> Resources </a>',
        target: [
          'a[href$="#/resources"]'
        ],
        failureSummary: 'Fix any of the following:\n  Element has insufficient color contrast of 3.85 (foreground color: #00bd7e, background color: #464646, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1'
      }
    ]
  },
  {
    id: 'frame-title',
    impact: 'serious',
    tags: [
      'cat.text-alternatives',
      'wcag2a',
      'wcag412',
      'section508',
      'section508.22.i',
      'TTv5',
      'TT12.d',
      'EN-301-549',
      'EN-9.4.1.2'
    ],
    description: 'Ensure <iframe> and <frame> elements have an accessible name',
    help: 'Frames must have an accessible name',
    helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/frame-title?application=axeAPI',
    nodes: [
      {
        any: [
          {
            id: 'non-empty-title',
            data: {
              messageKey: 'noAttr'
            },
            relatedNodes: [],
            impact: 'serious',
            message: 'Element has no title attribute'
          },
          {
            id: 'aria-label',
            data: null,
            relatedNodes: [],
            impact: 'serious',
            message: 'aria-label attribute does not exist or is empty'
          },
          {
            id: 'aria-labelledby',
            data: null,
            relatedNodes: [],
            impact: 'serious',
            message: 'aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty'
          },
          {
            id: 'presentational-role',
            data: null,
            relatedNodes: [],
            impact: 'serious',
            message: 'Element\'s default semantics were not overridden with role="none" or role="presentation"'
          }
        ],
        all: [],
        none: [],
        impact: 'serious',
        html: '<iframe id="vue-devtools-iframe" src="http://localhost:5173/__devtools__/" data-v-inspector-ignore="true" style="pointer-events: auto;"></iframe>',
        target: [
          '#vue-devtools-iframe'
        ],
        failureSummary: 'Fix any of the following:\n  Element has no title attribute\n  aria-label attribute does not exist or is empty\n  aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty\n  Element\'s default semantics were not overridden with role="none" or role="presentation"'
      }
    ]
  },
  {
    id: 'heading-order',
    impact: 'moderate',
    tags: [
      'cat.semantics',
      'best-practice'
    ],
    description: 'Ensure the order of headings is semantically correct',
    help: 'Heading levels should only increase by one',
    helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/heading-order?application=axeAPI',
    nodes: [
      {
        any: [
          {
            id: 'heading-order',
            data: null,
            relatedNodes: [],
            impact: 'moderate',
            message: 'Heading order invalid'
          }
        ],
        all: [],
        none: [],
        impact: 'moderate',
        html: '<h3 data-v-7871d054="">',
        target: [
          'h3'
        ],
        failureSummary: 'Fix any of the following:\n  Heading order invalid'
      }
    ]
  },
  {
    id: 'region',
    impact: 'moderate',
    tags: [
      'cat.keyboard',
      'best-practice'
    ],
    description: 'Ensure all page content is contained by landmarks',
    help: 'All page content should be contained by landmarks',
    helpUrl: 'https://dequeuniversity.com/rules/axe/4.10/region?application=axeAPI',
    nodes: [
      {
        any: [
          {
            id: 'region',
            data: {
              isIframe: false
            },
            relatedNodes: [],
            impact: 'moderate',
            message: 'Some page content is not contained by landmarks'
          }
        ],
        all: [],
        none: [],
        impact: 'moderate',
        html: '<div data-v-640ec535="" class="vue-devtools__anchor-btn panel-entry-btn" title="Toggle Vue DevTools" aria-label="Toggle devtools panel" style="">',
        target: [
          '.panel-entry-btn'
        ],
        failureSummary: 'Fix any of the following:\n  Some page content is not contained by landmarks'
      }
    ]
  }
];
