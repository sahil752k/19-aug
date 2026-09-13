with open('/app/applet/src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

# Update Solar module in System Summary
old_solar = "{data.moduleWattage} Wp x {data.numberOfModules.toString().padStart(2, '0')}"
new_solar = "{data.solarModuleSpecs || `${data.moduleWattage || 0} Wp x ${(data.numberOfModules || 0).toString().padStart(2, '0')}`}"
content = content.replace(old_solar, new_solar)

# Update Inverter in System Summary
old_inv_summary = "{data.inverterCapacity} kW Phase x {data.inverterPhases}"
new_inv_summary = "{data.inverterSpecification || `${data.inverterCapacity || 0} kW Phase x ${data.inverterPhases || 0}`}"
content = content.replace(old_inv_summary, new_inv_summary)

# Update Inverter Specification in INVERTER DETAILS
old_inv_spec = "{data.inverterCapacity} Kw {data.inverterPhases} Phase"
new_inv_spec = "{data.inverterSpecification || `${data.inverterCapacity || 0} Kw ${data.inverterPhases || 0} Phase`}"
content = content.replace(old_inv_spec, new_inv_spec)

with open('/app/applet/src/templates/Proposal.tsx', 'w') as f:
    f.write(content)
