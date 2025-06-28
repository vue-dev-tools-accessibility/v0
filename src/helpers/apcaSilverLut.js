/**
 * @typedef {number} FS  A number representing font-size in pixels
 */
/**
 * @typedef {-1|25|30|33|35|38|40|43|45|50|55|60|65|70|75|90|100} LC  An APCA Lc (Lightness Contrast) value
 */
/**
 * @typedef {[FS,LC,LC,LC,LC,LC,LC,LC,LC,LC]} APCASIZEWEIGHT  Array of numbers, where the first is a font size,
 *                                                            and the rest are the minimum APCA Lc for that font
 *                                                            size at a given font weight starting at 100 and
 *                                                            incrementing by 100 until 900
 */

/**
 * APCA Silver+ LUT for the Lc value given a font size in pixels and weight.
 *
 * GLOSSARY:
 *      W3C: World Wide Web Consortium (W3C). Main international
 *           standards organization for the World Wide Web.
 *     WCAG: Web Content Accessibility Guidelines. Standards maintained
 *           by the W3C to help websites be easier to use by those with
 *           disabilities or impairments.
 *     APCA: Accessible Perceptual Contrast Algorithm. In public beta and
 *           subject to change. System for testing the perceptual
 *           readability of text based on its size, weight, color, and
 *           the background color for self-emitting screens. Being
 *           considered for WCAG 3.
 *  Silver+: APCA Conformance level (stricter than the "Bronze" version).
 *      LUT: Lookup Table.
 *      BoW: Dark colors on Light colors or "Black on White".
 *      WoB: Light colors on Dark colors or "White on Black".
 *       Lc: Lightness Contrast. Can be between 0 and ±106. Positve
 *           numbers are for BoW, negative for WoB. The further from 0,
 *           the higher the perceptual contrast is.
 * Polarity: Conveying a difference based on BoW or WoB.
 *
 * LUT Last Updated on May 22, 2022
 * LUT Source:
 * readtech.org/ARC/tests/visual-readability-contrast/?tn=criterion
 *
 * @type {APCASIZEWEIGHT[]}
 */
const silverPlusAPCALookupTable = [
  // px font size | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 weights
  [            12,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1        ],
  [            14,   -1,   -1,   -1,  100,  100,   90,   75,   -1,   -1        ],
  [            15,   -1,   -1,   -1,  100,  100,   90,   70,   -1,   -1        ],
  [            16,   -1,   -1,   -1,   90,   75,   70,   60,   60,   -1        ],
  [            18,   -1,   -1,  100,   75,   70,   60,   55,   55,   55        ],
  [            21,   -1,   -1,   90,   70,   60,   55,   50,   50,   50        ],
  [            24,   -1,   -1,   75,   60,   55,   50,   45,   45,   45        ],
  [            28,   -1,  100,   70,   55,   50,   45,   43,   43,   43        ],
  [            32,   -1,   90,   65,   50,   45,   43,   40,   40,   40        ],
  [            36,   -1,   75,   60,   45,   43,   40,   38,   38,   38        ],
  [            48,   90,   60,   55,   43,   40,   38,   35,   35,   35        ],
  [            60,   75,   55,   50,   40,   38,   35,   33,   33,   33        ],
  [            72,   60,   50,   45,   38,   35,   33,   30,   30,   30        ],
  [            96,   50,   45,   40,   35,   33,   30,   25,   25,   25        ]
];

