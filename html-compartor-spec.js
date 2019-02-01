const { JSDOM } = require('jsdom');
const assert = require('assert');

class HtmlComparator {
  constructor(options) {
    this.options = options || {};
  }

  toComparableDom(html) {
    const dom = new JSDOM(html);
    this.traverseDom(dom, node => {
      if (node.nodeType == 3) {
        let text = node.textContent;
        if (!this.options.keep_inner_whitespaces) {
          text = text.replace(/\s+/g, ' ');
        }
        if (!this.options.keep_outer_whitespaces) {
          text = text.trim();
        }
        node.textContent = text;
      }
    });
    return dom;
  }

  toComparableHtml(html) {
    return this.toComparableDom(html).serialize();
  }

  areEqual(one, other) {
    return this.toComparableDom(original) === this.toComparableDom(other);
  }

  traverseDom(dom, action) {
    this.traverseNodes(dom.window.document, action);
  }

  traverseNodes(node, action) {
    action(node);
    Array.from(node.childNodes).forEach(child => this.traverseNodes(child, action))
  }
}

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
