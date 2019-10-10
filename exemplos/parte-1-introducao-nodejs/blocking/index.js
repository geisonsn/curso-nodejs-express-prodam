const fs = require('fs');
console.log('Faz a chamada de leitura do arquivo');

const data = fs.readFileSync('bilbo.jpeg');

console.log('Imprime o binário do arquivo');
console.log(data);

console.log('Executa outras intruções...');
