require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const campanhaRoutes = require('./routes/authRoutes');
const doacaoRoutes = require('./routes/doacaoRoutes');
const ongRoutes = require('./routes/ongRoutes');
const voluntariadoRoutes = require('./routes/voluntariadoRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

// Configuração do app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/campanhas', campanhaRoutes);
app.use('/api/doacoes', doacaoRoutes);
app.use('/api/ongs', ongRoutes);
app.use('/api/voluntariado', voluntariadoRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);

// Rota para verificar se a API está online
app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'API online' });
});

// Middleware de erro
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
