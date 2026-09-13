import re

with open('/app/applet/src/components/DocumentViewer.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "import { Printer, Download, DownloadCloud, Image as ImageIcon } from 'lucide-react';",
    "import { Download, DownloadCloud, Image as ImageIcon } from 'lucide-react';"
)

print_func = """  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return ("""
content = content.replace(print_func, "  return (")

print_button = """            <Download size={18} />
            {loadingAction === 'single' ? 'Generating...' : 'Download'}
          </button>
          <button
            onClick={handlePrint}
            disabled={!!loadingAction}
            className="flex items-center gap-2 px-4 py-2.5 text-sm bg-gray-900 hover:bg-black shadow-md shadow-gray-900/20 text-white rounded-xl font-bold transition-all duration-300 disabled:opacity-50 hover:-translate-y-0.5"
          >
            <Printer size={18} />
            {loadingAction === 'print' ? 'Generating...' : 'Print'}
          </button>
        </div>"""
content = content.replace(print_button, """            <Download size={18} />
            {loadingAction === 'single' ? 'Generating...' : 'Download'}
          </button>
        </div>""")

with open('/app/applet/src/components/DocumentViewer.tsx', 'w') as f:
    f.write(content)

