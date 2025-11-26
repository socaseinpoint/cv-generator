import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, ArrowLeft, Download } from 'lucide-react';
import { cvApi } from '../api/client';
import { useUiStore } from '../store/ui-store';
import MarkdownPreview from '../components/MarkdownPreview';
import StyleSelector from '../components/StyleSelector';

const DEFAULT_TEMPLATE = `# Your Name

**Your Title** | Location

**Contact:**
- Email: your.email@example.com
- LinkedIn: linkedin.com/in/yourprofile
- GitHub: github.com/yourusername

## Professional Summary

Write a brief summary of your professional background and key strengths here.

## Work Experience

### Job Title
**Company Name** | Start Date - End Date  
Location

- Achievement or responsibility point 1
- Achievement or responsibility point 2
- Achievement or responsibility point 3

### Previous Job Title
**Previous Company** | Start Date - End Date  
Location

- Achievement or responsibility point 1
- Achievement or responsibility point 2

## Technical Skills

### Main Skills
List your primary technical skills, tools, and technologies here.

### Additional Skills
Other relevant skills and competencies.

## Education

**Degree** | Institution | Year

## Languages

- English: Fluent
- Other languages...
`;

export default function CvEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectedStyle, setSelectedStyle, isGenerating, setIsGenerating } = useUiStore();

  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState(DEFAULT_TEMPLATE);

  const { data: cv, isLoading } = useQuery({
    queryKey: ['cv', id],
    queryFn: () => cvApi.getById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (cv) {
      setTitle(cv.title);
      setMarkdown(cv.markdownContent);
    }
  }, [cv]);

  const createMutation = useMutation({
    mutationFn: cvApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cvs'] });
      navigate('/');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; title: string; markdownContent: string }) =>
      cvApi.update(data.id, { title: data.title, markdownContent: data.markdownContent }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cvs'] });
      queryClient.invalidateQueries({ queryKey: ['cv', id] });
    },
  });

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!markdown.trim()) {
      alert('Please enter CV content');
      return;
    }

    if (id) {
      await updateMutation.mutateAsync({ id, title, markdownContent: markdown });
      alert('CV updated successfully!');
    } else {
      await createMutation.mutateAsync({ title, markdownContent: markdown });
    }
  };

  const handleGeneratePdf = async () => {
    if (!id) {
      alert('Please save the CV first before generating PDF');
      return;
    }

    setIsGenerating(true);
    try {
      const blob = await cvApi.generatePdf(id, selectedStyle);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}_${selectedStyle}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Failed to generate PDF');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading && id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to List
            </button>
            <div className="flex items-center gap-4">
              <StyleSelector
                selected={selectedStyle}
                onSelect={setSelectedStyle}
              />
              {id && (
                <button
                  onClick={handleGeneratePdf}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {isGenerating ? 'Generating...' : 'Generate PDF'}
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Title Input */}
      <div className="container mx-auto px-4 py-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="CV Title (e.g., John Doe - Full Stack Developer)"
          className="w-full px-4 py-3 text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Editor and Preview */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 gap-4 h-[calc(100vh-220px)]">
          {/* Editor */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h2 className="font-semibold text-gray-700">Markdown Editor</h2>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none"
              placeholder="Write your CV in markdown..."
            />
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h2 className="font-semibold text-gray-700">Preview</h2>
            </div>
            <div className="h-full overflow-auto p-4">
              <MarkdownPreview markdown={markdown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





