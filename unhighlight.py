with open('/app/applet/src/templates/Annexure3.tsx', 'r') as f:
    content = f.read()

content = content.replace('<span className="bg-blue-100">Roof-top Renewable Energy Generating System of {data.installedCapacity} kilowatt</span>', 'Roof-top Renewable Energy Generating System of {data.installedCapacity} kilowatt')

with open('/app/applet/src/templates/Annexure3.tsx', 'w') as f:
    f.write(content)
