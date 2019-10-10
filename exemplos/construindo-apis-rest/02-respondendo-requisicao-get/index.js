const express = require('express');
const app = express();
const port = 9001;

app.get('/',function(request, response) {
  response.send('Respondendo à requisição GET');
});

app.listen(port, function() {
  console.log('Servidor ouvindo na porta', port);
});
