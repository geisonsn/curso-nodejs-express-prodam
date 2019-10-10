const express = require('express');
const app = express();
const port = 9003;

app.use(express.json());

let cursos = [];

app.get('/api/cursos/', function(request, response) {
  response.json(cursos);
});

app.get('/api/cursos/:id', function(request, response) {
  let id = request.params.id;
  let curso = cursos.find(function(c) {
    return c.id == id;
  });
  response.status(curso ? 200 : 404).json(curso); 
});

app.post('/api/cursos', function(request, response) {
  let payload = request.body;
  payload.id = cursos.length + 1; 
  cursos.push(payload);
  response.status(201).json(payload);
});

app.put('/api/cursos/:id', function(request, response) {
  let id = request.params.id;
  let payload = request.body;
  let curso = cursos.find(function(c) {
    return c.id == id;
  });
  Object.assign(curso, payload);
  response.sendStatus(204);
});

app.delete('/api/cursos/:id', function(request, response) {
  let id = request.params.id;
  let cursosAposRemocaoItem = cursos.filter(function(c) {
    return c.id != id;
  });
  cursos = cursosAposRemocaoItem;
  response.sendStatus(204);
});

app.listen(port, function() {
  console.log('Servidor ouvindo na porta', port);
});
