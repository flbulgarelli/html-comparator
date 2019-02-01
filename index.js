const { JSDOM } = require('jsdom');

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

module.exports = HtmlComparator
