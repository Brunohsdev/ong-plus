const Usuario = require('../models/Usuario');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Obter perfil do usuário
// @route   GET /api/usuarios/me
// @access  Private
exports.getMeuPerfil = asyncHandler(async (req, res, next) => {
  const usuario = await Usuario.findById(req.usuario.id);

  res.status(200).json({
    success: true,
    data: usuario
  });
});

// @desc    Atualizar perfil do usuário
// @route   PUT /api/usuarios/me
// @access  Private
exports.atualizarPerfil = asyncHandler(async (req, res, next) => {
  const camposAtualizar = {
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    endereco: req.body.endereco,
    fotoPerfil: req.body.fotoPerfil
  };

  const usuario = await Usuario.findByIdAndUpdate(
    req.usuario.id,
    camposAtualizar,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    data: usuario
  });
});

// @desc    Atualizar senha do usuário
// @route   PUT /api/usuarios/atualizarsenha
// @access  Private
exports.atualizarSenha = asyncHandler(async (req, res, next) => {
  const usuario = await Usuario.findById(req.usuario.id).select('+senha');

  // Verificar senha atual
  if (!(await usuario.matchPassword(req.body.senhaAtual))) {
    return next(new ErrorResponse('Senha atual incorreta', 401));
  }

  usuario.senha = req.body.novaSenha;
  await usuario.save();

  res.status(200).json({
    success: true,
    data: {}
  });
});
