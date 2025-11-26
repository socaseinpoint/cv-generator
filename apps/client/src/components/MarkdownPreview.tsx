import { marked } from 'marked';
import { useEffect, useState } from 'react';

interface MarkdownPreviewProps {
  markdown: string;
}

export default function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const renderMarkdown = async () => {
      const rendered = await marked.parse(markdown);
      setHtml(rendered);
    };
    renderMarkdown();
  }, [markdown]);

  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}





