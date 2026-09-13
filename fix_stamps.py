with open('/app/applet/src/templates/Annexure3.tsx', 'r') as f:
    content = f.read()

# PAGE 1 STAMP REPLACEMENT
page1_old = """            <div className="flex-list relative">
              <span>3.4</span>
              <p>The Licensee shall not be responsible for any accident resulting in injury to human beings or animals or
              damage to property that may occur due to back- feeding fromthe Roof-top <strong>Renewable Energy Generating<br/>
              System</strong> when the grid supply is off. The Licensee may disconnect the installation at any time in the event
              of such exigencies to prevent such accident.</p>
              
              {/* PAGE 1 STAMP: Positioned exactly over the last line of 3.4 on the right side */}
              <div className="absolute right-8 bottom-[-45px] z-10 pointer-events-none opacity-90 mix-blend-multiply" style={{ transform: 'scale(0.8)' }}>
                <Stamp />
              </div>
            </div>"""

page1_new = """            <div className="flex-list">
              <span>3.4</span>
              <p>The Licensee shall not be responsible for any accident resulting in injury to human beings or animals or
              damage to property that may occur due to back- feeding fromthe Roof-top <strong>Renewable Energy Generating<br/>
              System</strong> when the grid supply is off. The Licensee may disconnect the installation at any time in the event
              of such exigencies to prevent such accident.</p>
            </div>
            
            {/* PAGE 1 STAMP */}
            <div className="flex justify-end pr-12 mt-6">
              <div className="opacity-90 mix-blend-multiply pointer-events-none" style={{ transform: 'scale(0.8)', transformOrigin: 'center right' }}>
                <Stamp />
              </div>
            </div>"""
        
content = content.replace(page1_old, page1_new)

# PAGE 2 STAMP REPLACEMENT
page2_old = """            <div className="flex-list relative">
              <span>8.3.</span>
              <p>The existing metering System, if not in accordance with the Net Metering Regulations, shall be
              replaced by a bi-directional meter (whole current/CT operated) or a pair of meters (as per the
              definition of 'Net Meter' in the Regulations), and a separate generation meter may be provided to
              measure Solar power generation. The bi-directional meter (whole current/CT operated) or pair of
              meters shall be installed at the inter- connection point to the Licensee's Network forrecording export
              and import of energy.The uni-directional and bi-directional or pair of meters shall be fixed in
              separate meter boxes in the same proximity.</p>
              
              {/* PAGE 2 STAMP: Positioned bottom right overlapping 8.3 text slightly */}
              <div className="absolute right-10 bottom-[-55px] z-10 pointer-events-none opacity-90 mix-blend-multiply" style={{ transform: 'scale(0.8)' }}>
                <Stamp />
              </div>
            </div>"""
        
page2_new = """            <div className="flex-list">
              <span>8.3.</span>
              <p>The existing metering System, if not in accordance with the Net Metering Regulations, shall be
              replaced by a bi-directional meter (whole current/CT operated) or a pair of meters (as per the
              definition of 'Net Meter' in the Regulations), and a separate generation meter may be provided to
              measure Solar power generation. The bi-directional meter (whole current/CT operated) or pair of
              meters shall be installed at the inter- connection point to the Licensee's Network forrecording export
              and import of energy.The uni-directional and bi-directional or pair of meters shall be fixed in
              separate meter boxes in the same proximity.</p>
            </div>
            
            {/* PAGE 2 STAMP */}
            <div className="flex justify-end pr-12 mt-6">
              <div className="opacity-90 mix-blend-multiply pointer-events-none" style={{ transform: 'scale(0.8)', transformOrigin: 'center right' }}>
                <Stamp />
              </div>
            </div>"""
        
content = content.replace(page2_old, page2_new)

# PAGE 3 STAMP REPLACEMENT
page3_old = """            {/* PAGE 3 STAMP: Positioned at bottom left overlapping the witness signature text */}
            <div className="absolute left-[-15px] bottom-[-20px] z-10 pointer-events-none opacity-90 mix-blend-multiply" style={{ transform: 'scale(0.8)' }}>
              <Stamp />
            </div>
          </div>
        </div>"""
    
page3_new = """          </div>
          
          {/* PAGE 3 STAMP */}
          <div className="flex justify-start pl-[34px] mt-4">
            <div className="opacity-90 mix-blend-multiply pointer-events-none" style={{ transform: 'scale(0.8)', transformOrigin: 'center left' }}>
              <Stamp />
            </div>
          </div>
        </div>"""
    
content = content.replace(page3_old, page3_new)

with open('/app/applet/src/templates/Annexure3.tsx', 'w') as f:
    f.write(content)
