const http = require('http');
http.createServer((req, res) => {
  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
  req.on('end', () => {
    console.log('BROWSER LOG:', body);
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    res.end('ok');
  });
}).listen(3001);
