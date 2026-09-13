import re

with open('/app/applet/src/templates/Proposal.tsx', 'r') as f:
    content = f.read()

# Change HeadphonesIcon to Headset
content = content.replace('HeadphonesIcon size={18}', 'Headset size={18}')
content = content.replace('import { User, Zap, FileText, Calendar, CheckCircle2, ThumbsUp, Medal, Clock, Settings, HeadphonesIcon, TrendingUp, ShieldCheck, Leaf, FileCheck, CircleDot, Banknote, Building, QrCode, Phone, Mail, MapPin, CheckCircle } from \'lucide-react\';', 'import { User, Zap, FileText, Calendar, CheckCircle2, ThumbsUp, Medal, Clock, Settings, HeadphonesIcon, TrendingUp, ShieldCheck, Leaf, FileCheck, CircleDot, Banknote, Building, QrCode, Phone, Mail, MapPin, CheckCircle, Headset } from \'lucide-react\';')

# Change CheckCircle to ShieldCheck in Payment Instructions header
content = content.replace('<CheckCircle size={18} className="text-[#e27d28]" />', '<ShieldCheck size={18} className="text-[#e27d28]" />')

# Change important notice color
content = content.replace('<div className="text-[11px] font-bold tracking-wider text-gray-300 uppercase">', '<div className="text-[11px] font-bold tracking-wider text-white/90 uppercase">')

# Change bullet sizes and alignment
content = content.replace('className="w-1.5 h-1.5 rounded-full', 'className="w-2 h-2 rounded-full')
content = content.replace('mt-2 shrink-0', 'mt-1.5 shrink-0')

# Change gap-8 to gap-12 in payment instructions
content = content.replace('<div className="p-6 flex-1 flex gap-8">', '<div className="p-6 flex-1 flex gap-12">')

with open('/app/applet/src/templates/Proposal.tsx', 'w') as f:
    f.write(content)

