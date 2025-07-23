const express = require("express");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const serverless = require("serverless-http");

const app = express();

// ✅ CORS liberado (desenvolvimento)
app.use(cors());

// ✅ Ou, se quiser mais controle, pode usar isso no lugar:
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ========================
// DADOS EM MEMÓRIA
// ========================
let usuarios = [];
let campanhas = [];
let doacoes = [];

// ========================
// ROTAS DE AUTENTICAÇÃO
// ========================
app.post("/register", (req, res) => {
  const { email } = req.body;
  if (usuarios.find(u => u.email === email)) {
    return res.status(409).json({ message: "Usuário já existe" });
  }

  const novoUsuario = {
    _id: uuidv4(),
    ...req.body,
    dataCriacao: new Date()
  };

  usuarios.push(novoUsuario);
  res.status(201).json({ user: novoUsuario, token: "fake-token" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === password);
  if (!usuario) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
  res.status(200).json({ user: usuario, token: "fake-token" });
});

// ========================
// ROTAS DE CAMPANHAS
// ========================
app.get("/campanhas", (req, res) => {
  res.json(campanhas);
});

app.get("/campanhas/:id", (req, res) => {
  const campanha = campanhas.find(c => c._id === req.params.id);
  if (!campanha) return res.status(404).json({ message: "Campanha não encontrada" });
  res.json(campanha);
});

app.post("/campanhas", (req, res) => {
  const nova = {
    _id: uuidv4(),
    arrecadado: 0,
    avaliacaoCount: 0,
    avaliacaoMedia: 0,
    status: "ativa",
    ...req.body
  };
  campanhas.push(nova);
  res.status(201).json(nova);
});

app.put("/campanhas/:id", (req, res) => {
  const index = campanhas.findIndex(c => c._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Campanha não encontrada" });
  campanhas[index] = { ...campanhas[index], ...req.body };
  res.json(campanhas[index]);
});

app.delete("/campanhas/:id", (req, res) => {
  campanhas = campanhas.filter(c => c._id !== req.params.id);
  res.status(204).send();
});

// ========================
// CAMPANHAS MODELO
// ========================
campanhas = [
  {
    _id: uuidv4(),
    titulo: 'Doe sangue, salve vidas',
    descricao: 'Campanha de doação de sangue para hospitais da região.',
    ong: 'Vida+, Saúde',
    categoria: 'saude',
    imagem: '/imagens/sangue.jpg'
  },
  {
    _id: uuidv4(),
    titulo: 'Educação para Todos',
    descricao: 'Ajude a fornecer material escolar para crianças carentes.',
    ong: 'Educar ONG',
    categoria: 'educacao',
    imagem: '/imagens/educacao.jpg'
  },
  {
    _id: uuidv4(),
    titulo: 'Reflorestamento do Cerrado',
    descricao: 'Participe do plantio de árvores no cerrado matogrossense.',
    ong: 'Verde Novo',
    categoria: 'meio ambiente',
    imagem: '/imagens/cerrado.jpg'
  },
  {
    _id: uuidv4(),
    titulo: 'Acolhimento animal',
    descricao: 'Ajude na vacinação e resgate de animais de rua.',
    ong: 'Pet Feliz',
    categoria: 'animais',
    imagem: '/imagens/rescue-pets.jpg'
  },
  {
    _id: uuidv4(),
    titulo: 'Tecnologia para inclusão',
    descricao: 'Leve cursos de informática para jovens em vulnerabilidade.',
    ong: 'IncluirTech',
    categoria: 'tecnologia',
    imagem: '/imagens/inclusao.jpg'
  },
  {
    _id: uuidv4(),
    titulo: 'Apoio à saúde mental',
    descricao: 'Grupo de apoio gratuito com psicólogos voluntários.',
    ong: 'Mente em Paz',
    categoria: 'saude',
    imagem: '/imagens/saude-mental.jpg'
  }
];

// ========================
// ROTAS DE DOAÇÕES
// ========================
app.get("/donations", (req, res) => {
  res.json(doacoes);
});

app.post("/donations", (req, res) => {
  const nova = {
    _id: uuidv4(),
    dataDoacao: new Date(),
    ...req.body
  };
  doacoes.push(nova);

  const campanha = campanhas.find(c => c._id === nova.campanha._id);
  if (campanha) campanha.arrecadado += nova.valor;

  res.status(201).json(nova);
});

// ========================
// EXPORTAÇÃO PARA VERCEL
// ========================
module.exports = app;
module.exports.handler = serverless(app);
