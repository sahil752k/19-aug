with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

target = '''             </motion.div>
          {activeTab === \\'Model Agreement\\' && ('''

replacement = '''             </motion.div>
          )}
          {activeTab === \\'Model Agreement\\' && ('''

content = content.replace("             </motion.div>\\n          {activeTab === 'Model Agreement' && (", "             </motion.div>\\n          )}\\n          {activeTab === 'Model Agreement' && (")

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)

print("Syntax fixed")
