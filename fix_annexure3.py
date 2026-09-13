import re

with open('/app/applet/src/templates/Annexure3.tsx', 'r') as f:
    content = f.read()

# 1. Update CSS: Remove fixed height and overflow hidden
css_old = """      <style>{`
        @media print {
          .annexure3-page { 
            page-break-after: always; 
            height: 1060px;
            position: relative;
            overflow: hidden;
          }
          .annexure3-page:last-child { 
            page-break-after: auto; 
          }
        }
        @media screen {
          .annexure3-page {
            height: 1060px;
            position: relative;
            margin-bottom: 2rem;
            border-bottom: 1px dashed #ccc;
            overflow: hidden;
          }
        }
      `}</style>"""

css_new = """      <style>{`
        @media print {
          .annexure3-page { 
            page-break-after: always; 
            position: relative;
          }
          .annexure3-page:last-child { 
            page-break-after: auto; 
          }
        }
        @media screen {
          .annexure3-page {
            position: relative;
            margin-bottom: 2rem;
            border-bottom: 1px dashed #ccc;
            padding-bottom: 2rem;
          }
        }
      `}</style>"""

content = content.replace(css_old, css_new)

# 2. Adjust font sizes slightly down so everything perfectly fits a standard A4 page without natural breaks
content = content.replace('text-[15px]', 'text-[14px]')

# 3. Adjust Stamp 1 position
stamp1_old = """          <div className="flex gap-4 relative">
            <span className="text-lg tracking-wide shrink-0">3.4</span>
            <p>The Licensee shall not be responsible for any accident resulting in injury to human beings or animals or
            damage to property that may occur due to back- feeding fromthe Roof-top <strong>Renewable Energy Generating<br/>
            System</strong> when the grid supply is off. The Licensee may disconnect the installation at any time in the event
            of such exigencies to prevent such accident.</p>
          </div>
        </div>

        {/* ABSOLUTE BOTTOM RIGHT STAMP FOR PAGE 1 */}
        <div className="absolute bottom-4 right-12 scale-[0.75] origin-bottom-right opacity-90 mix-blend-multiply pointer-events-none"><Stamp /></div>"""

stamp1_new = """          <div className="flex gap-4 relative">
            <span className="text-lg tracking-wide shrink-0">3.4</span>
            <p>The Licensee shall not be responsible for any accident resulting in injury to human beings or animals or
            damage to property that may occur due to back- feeding fromthe Roof-top <strong>Renewable Energy Generating<br/>
            System</strong> when the grid supply is off. The Licensee may disconnect the installation at any time in the event
            of such exigencies to prevent such accident.</p>
            {/* RELATIVE STAMP FOR PAGE 1 */}
            <div className="absolute -bottom-12 right-12 scale-[0.75] origin-center opacity-90 mix-blend-multiply pointer-events-none"><Stamp /></div>
          </div>
        </div>"""

content = content.replace(stamp1_old, stamp1_new)

# 4. Adjust Stamp 2 position
stamp2_old = """          <div className="flex gap-4">
            <span className="text-lg tracking-wide shrink-0">8.3.</span>
            <p>The existing metering System, if not in accordance with the Net Metering Regulations, shall be
            replaced by a bi-directional meter (whole current/CT operated) or a pair of meters (as per the
            definition of 'Net Meter' in the Regulations), and a separate generation meter may be provided to
            measure Solar power generation. The bi-directional meter (whole current/CT operated) or pair of
            meters shall be installed at the inter- connection point to the Licensee's Network forrecording export
            and import of energy.The uni-directional and bi-directional or pair of meters shall be fixed in
            separate meter boxes in the same proximity.</p>
          </div>
        </div>

        {/* ABSOLUTE BOTTOM RIGHT STAMP FOR PAGE 2 */}
        <div className="absolute bottom-4 right-12 scale-[0.75] origin-bottom-right opacity-90 mix-blend-multiply pointer-events-none"><Stamp /></div>"""

stamp2_new = """          <div className="flex gap-4 relative">
            <span className="text-lg tracking-wide shrink-0">8.3.</span>
            <p>The existing metering System, if not in accordance with the Net Metering Regulations, shall be
            replaced by a bi-directional meter (whole current/CT operated) or a pair of meters (as per the
            definition of 'Net Meter' in the Regulations), and a separate generation meter may be provided to
            measure Solar power generation. The bi-directional meter (whole current/CT operated) or pair of
            meters shall be installed at the inter- connection point to the Licensee's Network forrecording export
            and import of energy.The uni-directional and bi-directional or pair of meters shall be fixed in
            separate meter boxes in the same proximity.</p>
            {/* RELATIVE STAMP FOR PAGE 2 */}
            <div className="absolute -bottom-16 right-12 scale-[0.75] origin-center opacity-90 mix-blend-multiply pointer-events-none"><Stamp /></div>
          </div>
        </div>"""

content = content.replace(stamp2_old, stamp2_new)

# 5. Adjust Stamp 3 position
stamp3_old = """        {/* ABSOLUTE BOTTOM LEFT STAMP FOR PAGE 3 */}
        <div className="absolute bottom-4 left-6 scale-[0.75] origin-bottom-left opacity-90 mix-blend-multiply pointer-events-none"><Stamp /></div>"""

stamp3_new = """        {/* RELATIVE STAMP FOR PAGE 3 */}
        <div className="mt-8 ml-6 scale-[0.75] origin-top-left opacity-90 mix-blend-multiply pointer-events-none"><Stamp /></div>"""

content = content.replace(stamp3_old, stamp3_new)

# Additional safety: Decrease overall padding to ensure it fits A4
content = content.replace('className="p-8 font-serif text-[15px]', 'className="p-6 font-serif text-[14px]')

with open('/app/applet/src/templates/Annexure3.tsx', 'w') as f:
    f.write(content)
