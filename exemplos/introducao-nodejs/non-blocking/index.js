const fs = require('fs');

console.log('Faz a chamada de leitura do arquivo');

fs.readFile('bilbo.jpeg', (err, data) => {
  if (err) throw err;
  //se não houver erros imprime o binário do arquivo
  console.log('Imprime o binário do arquivo');
  console.log(data);
});

console.log('Executando outras instruções');
