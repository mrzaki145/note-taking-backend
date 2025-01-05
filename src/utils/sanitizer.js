import sanitizeHtml from "sanitize-html";

const defaultOptions = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "br",
    "ul",
    "ol",
    "li",
    "strong",
    "em",
    "i",
    "b",
    "a",
    "blockquote",
    "code",
    "pre",
    "div",
    "span",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    div: ["class"],
    span: ["class"],
    code: ["class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        target: "_blank",
        rel: "noopener noreferrer",
      },
    }),
  },
};

export function sanitizeContent(html) {
  if (!html) return "";
  return sanitizeHtml(html, defaultOptions);
}
