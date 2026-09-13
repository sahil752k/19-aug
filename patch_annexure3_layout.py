import re

with open('/app/applet/src/templates/Annexure3.tsx', 'r') as f:
    content = f.read()

# Replace min-h-[1050px]
content = content.replace('min-h-[1050px]', '')

# Fix page 1 and 2 stamps
old_stamp12 = """        <div className="absolute bottom-0 right-10 flex flex-col items-center">
            <div className="scale-75 origin-bottom-right"><Stamp /></div>
        </div>"""
new_stamp12 = """        <div className="flex justify-end mt-8 mr-10 mb-8">
            <div className="scale-75 origin-right"><Stamp /></div>
        </div>"""
content = content.replace(old_stamp12, new_stamp12)

# Fix page 3 stamp
old_stamp3 = """        <div className="absolute bottom-10 left-4">
          <div className="scale-[0.65] origin-bottom-left"><Stamp /></div>
        </div>"""
new_stamp3 = """        <div className="mt-8 ml-4 mb-8">
          <div className="scale-[0.65] origin-left"><Stamp /></div>
        </div>"""
content = content.replace(old_stamp3, new_stamp3)

with open('/app/applet/src/templates/Annexure3.tsx', 'w') as f:
    f.write(content)
