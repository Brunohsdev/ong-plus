const express = require("express");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
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

app.get("/api/campanhas", (req, res) => {
  res.json(campanhas);
});

app.get("/api/campanhas/:id", (req, res) => {
  const campanha = campanhas.find(c => c._id === req.params.id);
  if (!campanha) return res.status(404).json({ message: "Campanha não encontrada" });
  res.json(campanha);
});

app.post("/api/campanhas", (req, res) => {
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

app.put("/api/campanhas/:id", (req, res) => {
  const index = campanhas.findIndex(c => c._id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Campanha não encontrada" });
  campanhas[index] = { ...campanhas[index], ...req.body };
  res.json(campanhas[index]);
});

app.delete("/api/campanhas/:id", (req, res) => {
  campanhas = campanhas.filter(c => c._id !== req.params.id);
  res.status(204).send();
});

// CAMPANHAS MODELO COMPLETO
campanhas = [
  {
    _id: uuidv4(),
    titulo: 'Doe sangue, salve vidas',
    descricao: 'Campanha de doação de sangue para hospitais da região.',
    ong: {
      _id: uuidv4(),
      nome: 'Vida+, Saúde',
      logo: ''
    },
    categoria: 'sangue',
    meta: 100,
    arrecadado: 0,
    dataInicio: new Date('2025-07-01'),
    dataFim: new Date('2025-08-01'),
    status: 'ativa',
    imagem: ['http://localhost:3000/imagens/sangue.jpg'],
    local: {
      endereco: 'Rua da Vida, 100',
      cidade: 'Salvador',
      estado: 'BA'
    },
    avaliacaoMedia: 0,
    avaliacaoCount: 0
  },
  {
    _id: uuidv4(),
    titulo: 'Educação para Todos',
    descricao: 'Ajude a fornecer material escolar para crianças carentes.',
    ong: {
      _id: uuidv4(),
      nome: 'Educar ONG',
      logo: ''
    },
    categoria: 'outros',
    meta: 200,
    arrecadado: 0,
    dataInicio: new Date('2025-07-01'),
    dataFim: new Date('2025-08-15'),
    status: 'ativa',
    imagem: ['http://localhost:3000/imagens/educacao.jpg'],
    local: {
      endereco: 'Rua da Educação, 50',
      cidade: 'Feira de Santana',
      estado: 'BA'
    },
    avaliacaoMedia: 0,
    avaliacaoCount: 0
  }
];

// ========================
// ROTAS DE DOAÇÕES
// ========================

app.get("/api/donations", (req, res) => {
  res.json(doacoes);
});

app.post("/api/donations", (req, res) => {
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
// INICIAR SERVIDOR
// ========================

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}/api`);
});