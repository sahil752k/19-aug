import re

with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

fields_to_remove = [
    r"\s*\{renderField\('AC / DC Protection', 'acDcProtection', 'text', '', 7\)\}",
    r"\s*\{renderField\('Net Metering', 'netMetering', 'text', '', 8\)\}",
    r"\s*\{renderField\('Savings 1 Year \(₹\)', 'savings1Year', 'text', '', 4\)\}",
    r"\s*\{renderField\('Savings 5 Years \(₹\)', 'savings5Years', 'text', '', 5\)\}",
    r"\s*\{renderField\('Savings 10 Years \(₹\)', 'savings10Years', 'text', '', 6\)\}",
    r"\s*\{renderField\('Savings 25 Years \(₹\)', 'savings25Years', 'text', '', 7\)\}",
    r"\s*\{renderField\('Payback Period', 'paybackPeriod', 'text', '', 3\)\}",
    r"\s*\{renderField\('Customer Investment \(₹\)', 'customerInvestment', 'number', '', 3\)\}",
]

for field_regex in fields_to_remove:
    content = re.sub(field_regex, '', content)

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)

print("DataForm.tsx updated successfully.")
