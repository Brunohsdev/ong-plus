
const express = require("express");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

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
  const { email, senha } = req.body; // mudar para 'senha'
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
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
  const novaCampanha = {
    _id: uuidv4(),
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    categoria: req.body.categoria,
    meta: parseFloat(req.body.meta),
    arrecadado: 0,
    avaliacaoCount: 0,
    avaliacaoMedia: 0,
    status: "ativa",
    imagem: [], // Ou gere a imagem com base em categoria se quiser
    dataInicio: new Date(),
    dataFim: new Date(req.body.dataFim),
    local: req.body.local,
    ong: {
      _id: req.body.ong?._id || uuidv4(),
      nome: req.body.ong?.nome || 'ONG Anônima',
      logo: req.body.ong?.logo || ''
    }
  };

  campanhas.push(novaCampanha);
  res.status(201).json(novaCampanha);
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



campanhas = [
   {
    _id: uuidv4(),
    titulo: 'Doe sangue, salve vidas',
    descricao: 'Campanha de doação de sangue para hospitais da região.',
    ong: {
      _id: uuidv4(),
      nome: 'Vida+',
      logo: 'http://localhost:3000/imagens/sangue.jpg'
    },
    categoria: 'sangue',
    meta: 10000,
    arrecadado: 6500,
    dataInicio: new Date('2023-01-01'),
    dataFim: new Date('2023-12-31'),
    status: 'ativa',
    imagem: ['http://localhost:3000/imagens/sangue.jpg'],
    local: {
      endereco: 'Rua das Clínicas, 123',
      cidade: 'São Paulo',
      estado: 'SP'
    }
  },
    {
      id: 2,
      titulo: 'Educação para Todos',
      descricao: 'Ajude a fornecer material escolar para crianças carentes.',
      ong: 'Educar ONG',
      categoria: 'educação',
      imagem: 'http://localhost:3000/imagens/educacao.jpg'
    },
    {
      id: 3,
      titulo: 'Reflorestamento do Cerrado',
      descricao: 'Participe do plantio de árvores no cerrado.',
      ong: 'Verde Novo',
      categoria: 'meio ambiente',
      imagem: 'http://localhost:3000/imagens/cerrado.jpg'
    },
    {
      id: 4,
      titulo: 'Acolhimento animal',
      descricao: 'Ajude na vacinação e resgate de animais de rua.',
      ong: 'Pet Feliz',
      categoria: 'animais',
      imagem: 'http://localhost:3000/imagens/rescue-pets.jpg'
    },
    {
      id: 5,
      titulo: 'Tecnologia para inclusão',
      descricao: 'Leve cursos de informática para jovens em vulnerabilidade.',
      ong: 'IncluirTech',
      categoria: 'tecnologia',
      imagem: 'http://localhost:3000/imagens/inclusao.jpg'
    },
    {
      id: 6,
      titulo: 'Apoio à saúde mental',
      descricao: 'Grupo de apoio gratuito com psicólogos voluntários.',
      ong: 'Mente em Paz',
      categoria: 'saúde',
      imagem: 'http://localhost:3000/imagens/saude-mental.jpg'
    }
  ];











// ========================
// ROTAS DE DOAÇÕES
// ========================

app.get("/api/donations", (req, res) => {
  res.json(doacoes);
});




// ========================
// INICIAR SERVIDOR
// ========================

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}/api`);
});
