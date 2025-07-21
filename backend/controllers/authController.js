const Usuario = require('../models/usuario.js');
const Ong = require('../models/Ong');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.js');

// @desc    Registrar usuário
// @route   POST /api/auth/registrar
// @access  Public
exports.registrar = asyncHandler(async (req, res, next) => {
  const { nome, email, senha, tipo, telefone } = req.body;

  // Criar usuário
  const usuario = await Usuario.create({
    nome,
    email,
    senha,
    tipo,
    telefone
  });

  // Se for ONG, criar perfil de ONG
  if (tipo === 'ong') {
    await Ong.create({
      usuario: usuario._id,
      cnpj: req.body.cnpj,
      descricao: req.body.descricao,
      areasAtuacao: req.body.areasAtuacao
    });
  }

  sendTokenResponse(usuario, 200, res);
});

// @desc    Login usuário
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, senha } = req.body;

  // Validar email e senha
  if (!email || !senha) {
    return next(new ErrorResponse('Por favor, forneça um email e senha', 400));
  }

  // Verificar usuário
  const usuario = await Usuario.findOne({ email }).select('+senha');

  if (!usuario) {
    return next(new ErrorResponse('Credenciais inválidas', 401));
  }

  // Verificar senha
  const isMatch = await usuario.matchPassword(senha);

  if (!isMatch) {
    return next(new ErrorResponse('Credenciais inválidas', 401));
  }

  sendTokenResponse(usuario, 200, res);
});

// Obter token do modelo, criar cookie e enviar resposta
const sendTokenResponse = (usuario, statusCode, res) => {
  // Criar token
  const token = usuario.generateAuthToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      tipo: usuario.tipo
    });
};

// @desc    Obter usuário logado
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const usuario = await Usuario.findById(req.usuario.id);

  let perfil = usuario.toObject();

  if (usuario.tipo === 'ong') {
    const ong = await Ong.findOne({ usuario: usuario._id });
    perfil.ong = ong;
  }

  res.status(200).json({
    success: true,
    data: perfil
  });
});
