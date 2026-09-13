with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

# Update System summary to use the new variables
old_str1 = "{renderField('Product classification', 'proposalType', 'text', '', 0)}"
new_str1 = "{renderField('Product classification', 'productClassification', 'text', '', 0)}"
content = content.replace(old_str1, new_str1)

old_str2 = "{renderField('System size (kW)', 'installedCapacity', 'number', '', 1)}"
new_str2 = "{renderField('System size (kW)', 'systemSummarySize', 'number', '', 1)}"
content = content.replace(old_str2, new_str2)

# Alternative just in case it's string or number: let's leave renderField type as 'text' or 'number', the user used 'number'

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)
