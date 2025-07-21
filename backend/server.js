require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const morgan = require('morgan');

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const campanhaRoutes = require('./routes/campanhaRoutes');
const doacaoRoutes = require('./routes/doacaoRoutes');
const ongRoutes = require('./routes/ongRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');

// Importar middlewares
const errorHandler = require('./middlewares/errorHandler');

// Iniciar aplicação
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(morgan('dev'));

// Limitar requisições
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 100 // 100 requisições por IP
});
app.use(limiter);

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/campanhas', campanhaRoutes);
app.use('/api/doacoes', doacaoRoutes);
app.use('/api/ongs', ongRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.use('/api/avaliacoes', avaliacaoRoutes);

// Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota para verificar status
app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 'API ONG+ online' });
});

// Middleware de erro
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
