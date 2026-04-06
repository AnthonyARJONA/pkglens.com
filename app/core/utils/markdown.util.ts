export function renderMarkdown(md: string): string {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^# (.+)$/gm, '<h3>$1</h3>')

  // Bold / italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // List items
  html = html.replace(/^[*-] (.+)$/gm, '<li>$1</li>')

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')

  // Paragraphs (double newlines)
  html = html.replace(/\n\n+/g, '</p><p>')
  html = '<p>' + html + '</p>'

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')
  html = html.replace(/<p>\s*(<[hul])/g, '$1')
  html = html.replace(/(<\/[hul][^>]*>)\s*<\/p>/g, '$1')

  // Single newlines to <br> inside <p>
  html = html.replace(/([^>])\n([^<])/g, '$1<br>$2')

  // Strip HTML tags not in allowlist
  html = html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (fullMatch, tagName) => {
    const allowed = ['p', 'br', 'strong', 'em', 'h1', 'h2', 'h3', 'h4', 'ul', 'li', 'code', 'pre']
    return allowed.includes(tagName.toLowerCase()) ? fullMatch : ''
  })

  return html
}
