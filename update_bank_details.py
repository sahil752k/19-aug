import re

with open('/app/applet/src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

# Update gap between sections
content = content.replace('<div className="p-10 flex-1 flex flex-col gap-6 bg-[#f9fafb]">', '<div className="p-10 flex-1 flex flex-col gap-7 bg-[#f9fafb]">')

# Use Landmark icon instead of Building for Bank Account
content = content.replace('import { User, Zap, FileText, Calendar, CheckCircle2, ThumbsUp, Medal, Clock, Settings, HeadphonesIcon, TrendingUp, ShieldCheck, Leaf, FileCheck, CircleDot, Banknote, Building, QrCode, Phone, Mail, MapPin, CheckCircle, Headset } from \'lucide-react\';', 'import { User, Zap, FileText, Calendar, CheckCircle2, ThumbsUp, Medal, Clock, Settings, HeadphonesIcon, TrendingUp, ShieldCheck, Leaf, FileCheck, CircleDot, Banknote, Building, QrCode, Phone, Mail, MapPin, CheckCircle, Headset, Landmark } from \'lucide-react\';')

# Replace the icon in Official Bank Account header
content = content.replace('<Building size={20} className="text-[#e27d28]" />', '<Landmark size={20} className="text-[#e27d28]" />')

# Oh wait, there are two Building icons. The one in Corporate & Head Office should stay Building.
# Let's target exactly the Bank Account header.
bank_header_original = """<div className="flex items-center gap-3">
                       <Landmark size={20} className="text-[#e27d28]" />
                       <h3 className="font-bold tracking-widest uppercase text-[13px]">OFFICIAL BANK ACCOUNT</h3>"""
# (If it's still Building)
if "OFFICIAL BANK ACCOUNT" in content:
    content = re.sub(
        r'<Building size=\{20\} className="text-\[\#e27d28\]" />\s*<h3 className="font-bold tracking-widest uppercase text-\[13px\]">OFFICIAL BANK ACCOUNT</h3>',
        r'<Landmark size={20} className="text-[#e27d28]" />\n                       <h3 className="font-bold tracking-widest uppercase text-[13px]">OFFICIAL BANK ACCOUNT</h3>',
        content
    )

# Fix bullet sizes back to small
content = content.replace('w-2 h-2 rounded-full', 'w-1.5 h-1.5 rounded-full')
content = content.replace('mt-1.5 shrink-0', 'mt-2 shrink-0')

# Check text sizes in Bank details values
content = content.replace('<span className="font-bold text-[#1e3a5f]">r. s. bhandari Solar Energy Solutions</span>', '<span className="font-bold text-[#1e3a5f] text-[13px]">r. s. bhandari Solar Energy Solutions</span>')
content = content.replace('<span className="font-bold text-gray-900">State Bank of India (SBI)</span>', '<span className="font-bold text-gray-900 text-[13px]">State Bank of India (SBI)</span>')
content = content.replace('<span className="font-black text-gray-900 text-lg tracking-wider">37748474127</span>', '<span className="font-black text-gray-900 text-[15px] tracking-wider">37748474127</span>')
content = content.replace('<span className="font-bold text-gray-900 tracking-wider">SBIN0000503</span>', '<span className="font-bold text-gray-900 tracking-wider text-[13px]">SBIN0000503</span>')
content = content.replace('<span className="font-bold text-gray-900">Patni Chowk, Washim - 444 505</span>', '<span className="font-bold text-gray-900 text-[13px]">Patni Chowk, Washim - 444 505</span>')
content = content.replace('<span className="font-bold text-gray-900">Current Account</span>', '<span className="font-bold text-gray-900 text-[13px]">Current Account</span>')
content = content.replace('<span className="font-bold text-gray-900 tracking-wider">BXPPB1277F</span>', '<span className="font-bold text-gray-900 tracking-wider text-[13px]">BXPPB1277F</span>')
content = content.replace('<span className="font-bold text-gray-900 tracking-wider">27BXPPB1277F1ZG</span>', '<span className="font-bold text-gray-900 tracking-wider text-[13px]">27BXPPB1277F1ZG</span>')

# Update labels to be text-[11px] instead of text-xs for slightly smaller and cleaner look
content = content.replace('text-xs">ACCOUNT NAME', 'text-[11px]">ACCOUNT NAME')
content = content.replace('text-xs">BANK NAME', 'text-[11px]">BANK NAME')
content = content.replace('text-xs">ACCOUNT NUMBER', 'text-[11px]">ACCOUNT NUMBER')
content = content.replace('text-xs">IFSC CODE', 'text-[11px]">IFSC CODE')
content = content.replace('text-xs">BRANCH NAME', 'text-[11px]">BRANCH NAME')
content = content.replace('text-xs">ACCOUNT TYPE', 'text-[11px]">ACCOUNT TYPE')
content = content.replace('text-xs">PAN CARD', 'text-[11px]">PAN CARD')
content = content.replace('text-xs">GSTIN NO.', 'text-[11px]">GSTIN NO.')

# The padding of the Bank Account Box
content = content.replace('<div className="p-8 flex flex-col gap-4 text-[15px]">', '<div className="p-7 flex flex-col gap-4 text-[14px]">')

# Decrease border color strength
content = content.replace('border-gray-100 pb-3', 'border-gray-100 pb-3 border-opacity-70')

# Ensure "Page 8" text in the orange tag is right.
content = content.replace('<div className="bg-white text-[#e27d28] font-bold py-1 px-4 rounded-full text-xs shadow-md">Page 8</div>', '<div className="bg-white text-[#e27d28] font-bold py-1 px-5 rounded-full text-xs shadow-md tracking-wider">Page 8</div>')

with open('/app/applet/src/templates/Proposal.tsx', 'w') as f:
    f.write(content)

