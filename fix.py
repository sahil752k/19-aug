with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()
content = content.replace("             </motion.div>\n          {activeTab === 'Model Agreement' && (", "             </motion.div>\n          )}\n          {activeTab === 'Model Agreement' && (")
with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)
