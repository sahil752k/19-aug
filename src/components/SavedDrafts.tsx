import React from 'react';
import { useAppContext } from '../context/AppContext';
import { format, isValid } from 'date-fns';

const safeFormatDate = (dateStr: string | undefined | null, formatStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return isValid(d) ? format(d, formatStr) : '';
};
import { Trash2, Edit } from 'lucide-react';

export const SavedDrafts: React.FC<{ onSelect: () => void }> = ({ onSelect }) => {
  const { savedDrafts, loadDraft, deleteDraft, createNew } = useAppContext();

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-300">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Saved Drafts</h2>
          <p className="text-gray-500 mt-1">Manage your saved customer projects</p>
        </div>
        <button
          onClick={() => {
            createNew();
            onSelect();
          }}
          className="px-6 py-2 bg-yellow-500 rounded-md text-gray-900 font-bold hover:bg-yellow-600 transition-colors"
        >
          + New Project
        </button>
      </div>

      {savedDrafts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No saved drafts yet. Create and save a project to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedDrafts.map((draft) => (
            <div key={draft.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{draft.draftName || draft.name || 'Untitled Project'}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-1">{draft.consumerNumber ? `Cons No: ${draft.consumerNumber}` : 'No consumer num'}</p>
              
              <div className="text-xs text-gray-400 mb-6">
                Last updated: {safeFormatDate(draft.updatedAt, 'MMM dd, yyyy HH:mm')}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    loadDraft(draft.id);
                    onSelect();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md transition-colors"
                >
                  <Edit size={16} /> Open
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteDraft(draft.id);
                  }}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors z-10 relative cursor-pointer"
                  title="Delete Draft"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
