fetch('http://localhost:3000/src/main.tsx')
  .then(r => r.text())
  .then(t => console.log('Length:', t.length, 'Content preview:', t.slice(0, 100)))
  .catch(e => console.error(e));
