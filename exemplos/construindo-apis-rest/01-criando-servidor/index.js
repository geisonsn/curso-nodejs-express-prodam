const express = require('express');
const app = express();
const port = 9000;

app.listen(port, function() {
  console.log('Servidor ouvindo na porta', port);
});
