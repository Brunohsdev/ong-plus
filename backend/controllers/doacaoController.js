const Doacao = require('../models/Doacao');
const Campanha = require('../models/Campanha');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

exports.criarDoacao = asyncHandler(async (req, res, next) => {
  const { campanhaId, valor, mensagem, anonima } = req.body;

  // Verificar se a campanha existe
  const campanha = await Campanha.findById(campanhaId);
  if (!campanha) {
    return next(new ErrorResponse('Campanha não encontrada', 404));
  }

  // Criar doação
  const doacao = await Doacao.create({
    doador: req.usuario.id,
    campanha: campanhaId,
    valor,
    mensagem,
    anonima
  });

  // Atualizar total arrecadado na campanha
  campanha.arrecadado += valor;
  await campanha.save();

  res.status(201).json({
    success: true,
    data: doacao
  });
});


exports.getMinhasDoacoes = asyncHandler(async (req, res, next) => {
  const doacoes = await Doacao.find({ doador: req.usuario.id })
    .populate({
      path: 'campanha',
      select: 'titulo descricao imagem'
    });

  res.status(200).json({
    success: true,
    count: doacoes.length,
    data: doacoes
  });
});


exports.getDoacoesCampanha = asyncHandler(async (req, res, next) => {
  const doacoes = await Doacao.find({ campanha: req.params.id })
    .populate({
      path: 'doador',
      select: 'nome fotoPerfil',
      match: { anonima: false }
    });

  res.status(200).json({
    success: true,
    count: doacoes.length,
    data: doacoes
  });
});
