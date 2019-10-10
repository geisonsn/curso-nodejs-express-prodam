const express = require('express');
const app = express();
const port = 9003;

const Sequelize = require('sequelize');
const sequelize = new Sequelize('cursonodejs', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 4
  },
  define: {
    timestamps: false,
  },
});

sequelize.authenticate().then(() => {
  console.log('Conexão estabelecida com o banco postgres');
}).catch((error) => {
  console.log('Falha ao conectar ao banco postgres');
});

//Define o objeto/relacional Eixo ligado a tabela eixo
class Eixo extends Sequelize.Model {};

Eixo.init(
  {
    id: { 
      type: Sequelize.INTEGER, 
      primaryKey: true,
      autoIncrement: true 
    },
    nome: { 
      type: Sequelize.STRING, 
      allowNull: false 
    }
  },
  { sequelize, modelName: 'eixo', freezeTableName: true }
);

//Define o objeto/relacional Curso ligado a tabela curso
class Curso extends Sequelize.Model {};

Curso.init(
  {
    id: { 
      type: Sequelize.INTEGER, 
      primaryKey: true,
      autoIncrement: true 
    },
    eixoId: {
      type: Sequelize.INTEGER,
      field: 'eixo_id',
      references: {
        model: Eixo,
        key: 'id'
      }
    },
    nome: { type: Sequelize.STRING, allowNull: false },
    cargaHoraria: { 
      field: 'carga_horaria',
      type: Sequelize.INTEGER, allowNull: false 
    },
    vagas: { type: Sequelize.INTEGER, allowNull: true },
    vagasReserva: { 
      field: 'vagas_reserva', 
      type: Sequelize.INTEGER, 
      allowNull: true 
    },
  },
  { sequelize, modelName: 'curso', freezeTableName: true }
);

//Define o vínculo objeto/relacional existe entre a tabela curso e eixo
Curso.belongsTo(Eixo);

app.use(express.json());

app.get('/api/cursos/', async function(request, response) {
  const cursos = await Curso.findAll({
    include: [
      {model: Eixo, as: 'eixo'}
    ],
    order: [
      ['id', 'ASC']
    ]
  });
  response.status(cursos.length > 0 ? 200 : 404).json(cursos); 
});

app.get('/api/cursos/:id', async function(request, response) {
  let id = request.params.id;

  const curso = await Curso.findByPk(id);
  
  response.status(curso ? 200 : 404).json(curso); 
});

app.post('/api/cursos', async function(request, response) {
  let payload = request.body;
  let { eixoId, nome, cargaHoraria, vagas, vagasReserva } = payload;
  let curso = { eixoId, nome, cargaHoraria, vagas, vagasReserva };
  curso = await Curso.create(curso);
  response.status(201).json(curso);
});

app.put('/api/cursos/:id', async function(request, response) {
  let id = request.params.id;

  const curso = await Curso.findByPk(id);
  
  if (curso) {
    let payload = request.body;
    let { eixoId, nome, cargaHoraria, vagas, vagasReserva } = payload;
  
    let atributosAlterados = { eixoId, nome, cargaHoraria, vagas, vagasReserva };
    
    await Curso.update(atributosAlterados, {
      where: {id}
    });
     
    response.sendStatus(204);
  } else {
    response.sendStatus(404);
  }
});

app.delete('/api/cursos/:id', async function(request, response) {
  
  let id = request.params.id;
  const curso = await Curso.findByPk(id);
  
  if (curso) {
    await Curso.destroy({
      where: {id}
    });
    response.sendStatus(204);
  } else {
    response.sendStatus(404);
  }
});

app.listen(port, function() {
  console.log('Servidor ouvindo na porta', port);
});
