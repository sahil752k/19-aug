import re
with open('/app/applet/src/context/AppContext.tsx', 'r') as f:
    content = f.read()

content = content.replace("localStorage.getItem('activeSolarData');", "(() => { try { return localStorage.getItem('activeSolarData'); } catch (e) { return null; } })()")
content = content.replace("localStorage.getItem('solarDrafts');", "(() => { try { return localStorage.getItem('solarDrafts'); } catch (e) { return null; } })()")
content = content.replace("localStorage.setItem('activeSolarData', JSON.stringify(data));", "try { localStorage.setItem('activeSolarData', JSON.stringify(data)); } catch (e) {}")
content = content.replace("localStorage.setItem('solarDrafts', JSON.stringify(savedDrafts));", "try { localStorage.setItem('solarDrafts', JSON.stringify(savedDrafts)); } catch (e) {}")

with open('/app/applet/src/context/AppContext.tsx', 'w') as f:
    f.write(content)
