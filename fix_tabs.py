import re

with open('src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

old_block = '''        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label htmlFor="document-selector" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            Select Document:
          </label>
          <select
            id="document-selector"
            value={activeDoc}
            onChange={(e) => setActiveDoc(e.target.value as DocType)}
            disabled={!!loadingAction}
            className="flex-1 sm:w-64 bg-white border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 block p-2.5 font-bold shadow-sm transition-all"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id} className="font-semibold">
                {tab.label}
              </option>
            ))}
          </select>
        </div>'''

new_block = '''        <div className="flex items-center w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <div className="flex bg-gray-100 p-1 rounded-xl gap-1 w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDoc(tab.id)}
                disabled={!!loadingAction}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                  activeDoc === tab.id 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>'''

content = content.replace(old_block, new_block)

with open('src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)
