fetch('http://localhost:3000/')
  .then(r => r.text())
  .then(html => console.log("HTML OK"))
  .catch(e => console.error(e));
