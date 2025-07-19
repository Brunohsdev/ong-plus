const Avaliacao = require('../models/Avaliacao');
const Ong = require('../models/Ong');
const Campanha = require('../models/Campanha');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Criar avaliação para ONG ou Campanha
// @route   POST /api/avaliacoes
// @access  Private
exports.criarAvaliacao = asyncHandler(async (req, res, next) => {
  const { tipo, alvoId, nota, comentario } = req.body;

  // Verificar se o alvo existe
  let alvo;
  if (tipo === 'ong') {
    alvo = await Ong.findById(alvoId);
  } else if (tipo === 'campanha') {
    alvo = await Campanha.findById(alvoId);
  } else {
    return next(new ErrorResponse('Tipo de avaliação inválido', 400));
  }

  if (!alvo) {
    return next(new ErrorResponse(`${tipo} não encontrado`, 404));
  }

  // Verificar se já avaliou
  const jaAvaliou = await Avaliacao.findOne({
    usuario: req.usuario.id,
    tipo,
    alvo: alvoId
  });

  if (jaAvaliou) {
    return next(new ErrorResponse(`Você já avaliou esta ${tipo}`, 400));
  }

  const avaliacao = await Avaliacao.create({
    usuario: req.usuario.id,
    tipo,
    alvo: alvoId,
    nota,
    comentario
  });

  // Atualizar média de avaliações
  await atualizarMediaAvaliacoes(tipo, alvoId);

  res.status(201).json({
    success: true,
    data: avaliacao
  });
});
// Obter todas as avaliações (público)
exports.getAvaliacoes = asyncHandler(async (req, res, next) => {
  const avaliacoes = await Avaliacao.find().populate('usuario', 'nome').populate('alvo');
  res.status(200).json({ success: true, count: avaliacoes.length, data: avaliacoes });
});

// Obter avaliações feitas pelo usuário logado
exports.getMinhasAvaliacoes = asyncHandler(async (req, res, next) => {
  const avaliacoes = await Avaliacao.find({ usuario: req.usuario.id });
  res.status(200).json({ success: true, count: avaliacoes.length, data: avaliacoes });
});

// Função auxiliar para atualizar média de avaliações
async function atualizarMediaAvaliacoes(tipo, alvoId) {
  const aggregate = await Avaliacao.aggregate([
    { $match: { tipo, alvo: mongoose.Types.ObjectId(alvoId) } },
    { $group: { _id: null, media: { $avg: '$nota' }, count: { $sum: 1 } } }
  ]);

  if (aggregate.length > 0) {
    const { media, count } = aggregate[0];

    if (tipo === 'ong') {
      await Ong.findByIdAndUpdate(alvoId, {
        avaliacaoMedia: parseFloat(media.toFixed(1)),
        avaliacaoCount: count
      });
    } else {
      await Campanha.findByIdAndUpdate(alvoId, {
        avaliacaoMedia: parseFloat(media.toFixed(1)),
        avaliacaoCount: count
      });
    }
  }
}
