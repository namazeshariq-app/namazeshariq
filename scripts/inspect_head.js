const http = require('http');
http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const head = data.slice(0, data.indexOf('</head>') + 7);
    console.log('--- HEAD CONTENT ---');
    console.log(head);
  });
});
