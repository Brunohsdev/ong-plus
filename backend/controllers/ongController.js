const Ong = require('../models/Ong');
const Usuario = require('../models/Usuario');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');


exports.getMeuPerfil = asyncHandler(async (req, res, next) => {
  const ong = await Ong.findOne({ usuario: req.usuario.id })
    .populate('usuario', 'nome email fotoPerfil');

  if (!ong) {
    return next(new ErrorResponse('ONG não encontrada', 404));
  }

  res.status(200).json({
    success: true,
    data: ong
  });
});


exports.atualizarPerfil = asyncHandler(async (req, res, next) => {
  const ong = await Ong.findOneAndUpdate(
    { usuario: req.usuario.id },
    req.body,
    { new: true, runValidators: true }
  ).populate('usuario', 'nome email fotoPerfil');

  res.status(200).json({
    success: true,
    data: ong
  });
});


exports.getOngs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});


exports.getOng = asyncHandler(async (req, res, next) => {
  const ong = await Ong.findById(req.params.id)
    .populate('usuario', 'nome fotoPerfil');

  if (!ong) {
    return next(new ErrorResponse('ONG não encontrada', 404));
  }

  res.status(200).json({
    success: true,
    data: ong
  });
});
