with open('/app/applet/src/components/DataForm.tsx', 'r') as f:
    content = f.read()

# Update System summary
old_summary = """                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Earthing', 'earthing', 'text', '', 0)}
                    {renderField('AC/DC Cables', 'acDcCables', 'text', '', 1)}
                    {renderField('Structure', 'structure', 'text', '', 2)}
                    {renderField('Subsidy (₹)', 'subsidyAmount', 'number', '', 3)}
                    {renderField('Price (₹)', 'totalCost', 'number', '', 4)}
                 </div>"""

new_summary = """                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('Product classification', 'proposalType', 'text', '', 0)}
                    {renderField('System size (kW)', 'installedCapacity', 'number', '', 1)}
                    {renderField('Solar module', 'solarModuleSpecs', 'text', 'e.g. 56 Wp x 890', 2)}
                    {renderField('Inverter', 'inverterSpecification', 'text', 'e.g. 890 kW Phase x', 3)}
                    {renderField('Earthing', 'earthing', 'text', '', 4)}
                    {renderField('AC/DC Cables', 'acDcCables', 'text', '', 5)}
                    {renderField('Structure', 'structure', 'text', '', 6)}
                    {renderField('Subsidy (₹)', 'subsidyAmount', 'number', '', 7)}
                    {renderField('Price (₹)', 'totalCost', 'number', '', 8)}
                 </div>"""

content = content.replace(old_summary, new_summary)

# Update INVERTER DETAILS
old_inverter = """                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('MANUFACTURER', 'inverterMake', 'text', '', 0)}
                    {renderField('RATING KW PER INVERTER', 'inverterCapacity', 'number', '', 1)}
                    {renderField('QUANTITY', 'inverterQuantity', 'number', '', 2)}
                    {renderField('NO. OF PHASES', 'inverterPhases', 'number', '', 3)}
                    {renderField('WARRANTY', 'inverterWarranty', 'text', '', 4)}
                 </div>"""

new_inverter = """                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 gap-y-10">
                    {renderField('MANUFACTURER', 'inverterMake', 'text', '', 0)}
                    {renderField('RATING KW PER INVERTER', 'inverterCapacity', 'number', '', 1)}
                    {renderField('QUANTITY', 'inverterQuantity', 'number', '', 2)}
                    {renderField('INVERTER SPECIFICATION', 'inverterSpecification', 'text', 'e.g. 890 Kw Phase', 3)}
                    {renderField('NO. OF PHASES', 'inverterPhases', 'number', '', 4)}
                    {renderField('WARRANTY', 'inverterWarranty', 'text', '', 5)}
                 </div>"""

content = content.replace(old_inverter, new_inverter)

with open('/app/applet/src/components/DataForm.tsx', 'w') as f:
    f.write(content)
