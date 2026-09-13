import re

with open('/app/applet/src/templates/AnnexureI.tsx', 'r') as f:
    content = f.read()

date_formatter = """
const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const AnnexureI: React.FC = () => {
"""

content = content.replace("export const AnnexureI: React.FC = () => {", date_formatter)
content = content.replace("{data.installationDate}", "{formatDate(data.installationDate)}")

with open('/app/applet/src/templates/AnnexureI.tsx', 'w') as f:
    f.write(content)
