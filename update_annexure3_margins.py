import re

with open('/app/applet/src/templates/Annexure3.tsx', 'r') as f:
    content = f.read()

# 1. Update container CSS
old_container = """        .annexure3-container {
          font-family: 'Times New Roman', Times, serif;
          font-size: 13.5px;
          line-height: 1.25;
          color: black;
        }"""
new_container = """        .annexure3-container {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12.5px;
          line-height: 1.2;
          color: black;
        }"""
content = content.replace(old_container, new_container)

# 2. Update page padding (screen)
old_page = """        .a4-page {
          width: 210mm;
          min-height: 297mm;
          background: white;
          padding: 15mm 20mm; /* Reduced padding to fit content */
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          box-sizing: border-box;
          position: relative;
        }"""
new_page = """        .a4-page {
          width: 210mm;
          min-height: 297mm;
          background: white;
          padding: 10mm 20mm 15mm 20mm; /* Reduced top padding, kept bottom padding */
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          box-sizing: border-box;
          position: relative;
        }"""
content = content.replace(old_page, new_page)

# 3. Update print padding
old_print = """            padding: 15mm 20mm !important;"""
new_print = """            padding: 10mm 20mm 15mm 20mm !important;"""
content = content.replace(old_print, new_print)

# 4. Remove top margin from title
old_title = """<h2 className="text-center text-[20px] mb-6 mt-4">ANNEXURE &ndash; 3</h2>"""
new_title = """<h2 className="text-center text-[19px] mb-4 mt-0">ANNEXURE &ndash; 3</h2>"""
content = content.replace(old_title, new_title)

old_subtitle = """<h3 className="text-center font-bold mb-4 leading-snug text-[15px]">"""
new_subtitle = """<h3 className="text-center font-bold mb-3 leading-snug text-[14.5px]">"""
content = content.replace(old_subtitle, new_subtitle)

# 5. Fix stamp margins
content = content.replace('className="flex justify-end pr-12 mt-6"', 'className="flex justify-end pr-12 mt-1"')
content = content.replace('className="flex justify-start pl-[34px] mt-4"', 'className="flex justify-start pl-[34px] mt-1"')

with open('/app/applet/src/templates/Annexure3.tsx', 'w') as f:
    f.write(content)

