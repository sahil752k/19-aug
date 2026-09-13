with open('/app/applet/src/templates/Annexure3.tsx', 'r') as f:
    content = f.read()

old_para = """        <p className="mb-4 text-justify">
          &nbsp;&nbsp;&nbsp;&nbsp;This Agreement is made and entered into at Washim on this <strong>{data.agreementDate ? formatDate(data.agreementDate) : '2025-12-11'}</strong> between the
          Eligible Consumer <strong>{data.name}</strong> having premises at <strong>{data.address}</strong> and Consumer No
           <strong>{data.consumerNumber}</strong> as the first Party, AND The Distribution Licensee MSEDCL (hereinafter referred to as 'the Licensee')
           and having its Registered Office at Washim
           - as second Party of this Agreement;
        </p>"""

new_para = """        <p className="mb-4 text-justify">
          &nbsp;&nbsp;&nbsp;&nbsp;This Agreement is made and entered into at Washim on this <strong>{data.agreementDate ? formatDate(data.agreementDate) : '2025-12-11'}</strong> between the Eligible Consumer <strong>{data.name}</strong> having premises at <strong>{data.address}</strong> and Consumer No <strong>{data.consumerNumber}</strong> as the first Party, AND The Distribution Licensee MSEDCL (hereinafter referred to as 'the Licensee') and having its Registered Office at Washim - as second Party of this Agreement;
        </p>"""

content = content.replace(old_para, new_para)

with open('/app/applet/src/templates/Annexure3.tsx', 'w') as f:
    f.write(content)

