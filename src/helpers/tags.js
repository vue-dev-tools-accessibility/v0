/**
 * @file Handles mapping tag names to description.
 */

/**
 * Maps a given tag to a description.
 *
 * From:
 * https://github.com/dequelabs/axe-core/blob/HEAD/doc/API.md#axe-core-tags
 *
 * @param  {string} tag  An Axe accessibility tag (wcag2a, cat.color, etc)
 * @return {string}      An explaination of what the tag reprecents
 */
export const getTagHoverText = function (tag) {
  function useCatchAll (knownTags, startsWith, catchAll, tag) {
    if (
      !knownTags.includes(tag.toLowerCase()) &&
      tag.toLowerCase().startsWith(startsWith)
    ) {
      return catchAll;
    }
    return tag;
  }

  const CAT_TAGS = [];
  const CAT_CATCH_ALL = 'cat.*';

  const EN_TAGS = ['en-301-549'];
  const EN_CATCHALL = 'en-9.*';

  const SECTION508_TAGS = ['section508'];
  const SECTION508_CATCH_ALL = 'section508.*.*';

  const TT_TAGS = ['ttv5'];
  const TT_CATCH_ALL = 'tt*.*';

  const WCAG_TAGS = [
    'wcag3',
    'wcag2a',
    'wcag2aa',
    'wcag2aaa',
    'wcag21a',
    'wcag21aa',
    'wcag22aa',
    'wcag2a-obsolete'
  ];
  const WCAG_CATCH_ALL = 'wcag***';

  const tagMap = {
    apca: 'APCA (Accessible Perceptual Contrast Algorithm)',
    'apca-bronze': 'APCA (Accessible Perceptual Contrast Algorithm) bronze conformance level',
    'apca-gold': 'APCA (Accessible Perceptual Contrast Algorithm) gold conformance level',
    'apca-silver': 'APCA (Accessible Perceptual Contrast Algorithm) silver conformance level',
    act: 'W3C approved Accessibility Conformance Testing rules',
    'best-practice': 'Common accessibility best practices',
    [CAT_CATCH_ALL]: 'Category mappings used by Deque',
    'en-301-549': 'Rule required under EN 301 549',
    [EN_CATCHALL]: 'Section in EN 301 549 listing the requirement',
    experimental: 'Cutting-edge rules, disabled by default',
    section508: 'Old Section 508 rules',
    [SECTION508_CATCH_ALL]: 'Requirement in old Section 508',
    ttv5: 'Trusted Tester v5 rules',
    [TT_CATCH_ALL]: 'Test ID in Trusted Tester',
    wcag2a: 'WCAG 2.0 Level A',
    wcag2aa: 'WCAG 2.0 Level AA',
    wcag2aaa: 'WCAG 2.0 Level AAA',
    wcag21a: 'WCAG 2.1 Level A',
    wcag21aa: 'WCAG 2.1 Level AA',
    wcag22aa: 'WCAG 2.2 Level AA',
    'wcag2a-obsolete': 'WCAG 2.0 Level A, no longer required for conformance',
    wcag3: 'WCAG 3.0 (unreleased)',
    [WCAG_CATCH_ALL]: 'WCAG success criterion e.g. wcag111 maps to SC 1.1.1'
  };

  tag = useCatchAll(CAT_TAGS, 'cat.', CAT_CATCH_ALL, tag);
  tag = useCatchAll(EN_TAGS, 'en-9', EN_CATCHALL, tag);
  tag = useCatchAll(SECTION508_TAGS, 'section508', SECTION508_CATCH_ALL, tag);
  tag = useCatchAll(TT_TAGS, 'tt', TT_CATCH_ALL, tag);
  tag = useCatchAll(WCAG_TAGS, 'wcag', WCAG_CATCH_ALL, tag);

  return tagMap[tag.toLowerCase()] || tag;
};
