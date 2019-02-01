const assert = require('assert');
const HtmlComparator = require('./index.js');

describe('HtmlComparator', () => {
  function expectComparableHtmlToEq(original, expected, options) {
    assert.equal(new HtmlComparator(options).toComparableHtml(original), expected);
  }

  it('', () => expectComparableHtmlToEq('<div> </div>', '<html><head></head><body><div></div></body></html>'));

  it('', () => expectComparableHtmlToEq('<html></html>', '<html><head></head><body></body></html>'));

  it('', () => expectComparableHtmlToEq("<html><body><p> hello world </p></body></html>", '<html><head></head><body><p>hello world</p></body></html>'));

  it('', () => expectComparableHtmlToEq("<html><head></head><body><p>      hello     world     </p></body></html>", '<html><head></head><body><p>hello world</p></body></html>'));

  it('', () => expectComparableHtmlToEq("<html><head></head><body><p>      hello\t\tworld     </p></body></html>", '<html><head></head><body><p>hello world</p></body></html>'));

  it('', () =>
    expectComparableHtmlToEq(
      "<html><head></head><body><p>      hello\t\tworld     </p></body></html>",
      "<html><head></head><body><p>hello\t\tworld</p></body></html>",
      { keep_inner_whitespaces: true }));

  it('', () =>
    expectComparableHtmlToEq(
      "<html><head></head><body><p>      hello\t\tworld     </p></body></html>",
      "<html><head></head><body><p> hello world </p></body></html>",
      { keep_outer_whitespaces: true }));

  it('', () =>
    expectComparableHtmlToEq(
      "<html><head></head><body><p>      hello\t\tworld     </p></body></html>",
      "<html><head></head><body><p>      hello\t\tworld     </p></body></html>",
      { keep_inner_whitespaces: true, keep_outer_whitespaces: true }));

  it('', () => expectComparableHtmlToEq("<html><head></head><body><p>\n\n      hello\n     world     </p></body></html>", '<html><head></head><body><p>hello world</p></body></html>'));

  it('', () => expectComparableHtmlToEq(" <html><head></head>  \n<body>  <p>hello</p></body></html>", '<html><head></head><body><p>hello</p></body></html>'));
});
