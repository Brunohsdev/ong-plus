const Campanha = require('../models/Campanha');
const Ong = require('../models/Ong');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc    Obter todas campanhas
// @route   GET /api/campanhas
// @access  Public
exports.getCampanhas = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Obter campanha por ID
// @route   GET /api/campanhas/:id
// @access  Public
exports.getCampanha = asyncHandler(async (req, res, next) => {
  const campanha = await Campanha.findById(req.params.id).populate({
    path: 'ong',
    select: 'descricao areasAtuacao'
  });

  if (!campanha) {
    return next(
      new ErrorResponse(`Campanha não encontrada com ID ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: campanha
  });
});

// @desc    Criar campanha
// @route   POST /api/campanhas
// @access  Private (ONG)
exports.createCampanha = asyncHandler(async (req, res, next) => {
  // Verificar se o usuário é uma ONG
  if (req.usuario.tipo !== 'ong') {
    return next(
      new ErrorResponse('Apenas ONGs podem criar campanhas', 403)
    );
  }

  // Verificar se a ONG existe
  const ong = await Ong.findOne({ usuario: req.usuario.id });

  if (!ong) {
    return next(
      new ErrorResponse('ONG não encontrada', 404)
    );
  }

  req.body.ong = ong._id;
  
  const campanha = await Campanha.create(req.body);

  res.status(201).json({
    success: true,
    data: campanha
  });
});

// @desc    Atualizar campanha
// @route   PUT /api/campanhas/:id
// @access  Private (ONG)
exports.updateCampanha = asyncHandler(async (req, res, next) => {
  let campanha = await Campanha.findById(req.params.id);

  if (!campanha) {
    return next(
      new ErrorResponse(`Campanha não encontrada com ID ${req.params.id}`, 404)
    );
  }

  // Verificar se a campanha pertence à ONG do usuário
  const ong = await Ong.findOne({ usuario: req.usuario.id });

  if (campanha.ong.toString() !== ong._id.toString()) {
    return next(
      new ErrorResponse('Usuário não autorizado a atualizar esta campanha', 401)
    );
  }

  campanha = await Campanha.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: campanha
  });
});

// @desc    Deletar campanha
// @route   DELETE /api/campanhas/:id
// @access  Private (ONG)
exports.deleteCampanha = asyncHandler(async (req, res, next) => {
  const campanha = await Campanha.findById(req.params.id);

  if (!campanha) {
    return next(
      new ErrorResponse(`Campanha não encontrada com ID ${req.params.id}`, 404)
    );
  }

  // Verificar se a campanha pertence à ONG do usuário
  const ong = await Ong.findOne({ usuario: req.usuario.id });

  if (campanha.ong.toString() !== ong._id.toString()) {
    return next(
      new ErrorResponse('Usuário não autorizado a deletar esta campanha', 401)
    );
  }

  await campanha.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});