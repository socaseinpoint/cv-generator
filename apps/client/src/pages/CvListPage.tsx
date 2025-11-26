import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, FileText } from 'lucide-react';
import { cvApi } from '../api/client';

export default function CvListPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: cvs, isLoading } = useQuery({
    queryKey: ['cvs'],
    queryFn: cvApi.list,
  });

  const deleteMutation = useMutation({
    mutationFn: cvApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cvs'] });
    },
  });

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <FileText className="w-10 h-10 text-blue-600" />
          CV Editor
        </h1>
        <button
          onClick={() => navigate('/cv/new')}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          New CV
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading CVs...</p>
        </div>
      ) : cvs && cvs.length > 0 ? (
        <div className="grid gap-4">
          {cvs.map((cv) => (
            <div
              key={cv.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {cv.title}
                  </h2>
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>Created: {new Date(cv.createdAt).toLocaleDateString()}</p>
                    <p>Updated: {new Date(cv.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/cv/${cv.id}/edit`)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cv.id, cv.title)}
                    disabled={deleteMutation.isPending}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">No CVs yet</p>
          <button
            onClick={() => navigate('/cv/new')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Create your first CV
          </button>
        </div>
      )}
    </div>
  );
}





