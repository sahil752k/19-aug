const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
const script = `
<script>
  window.onerror = function(msg, url, lineNo, columnNo, error) {
    fetch('http://localhost:3001', { method: 'POST', body: 'ERROR: ' + msg + ' ' + error?.stack });
    return false;
  };
  const origLog = console.log;
  console.log = function(...args) {
    fetch('http://localhost:3001', { method: 'POST', body: 'LOG: ' + args.join(' ') });
    origLog.apply(console, args);
  };
  const origError = console.error;
  console.error = function(...args) {
    fetch('http://localhost:3001', { method: 'POST', body: 'CONSOLE ERROR: ' + args.join(' ') });
    origError.apply(console, args);
  };
</script>
`;
html = html.replace('</head>', script + '</head>');
fs.writeFileSync('index.html', html);
