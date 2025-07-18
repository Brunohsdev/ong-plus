const mongoose = require('mongoose');

const CampanhaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Por favor, adicione um título']
  },
  descricao: {
    type: String,
    required: [true, 'Por favor, adicione uma descrição']
  },
  ong: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ong',
    required: true
  },
  categoria: {
    type: String,
    enum: ['alimentos', 'roupas', 'dinheiro', 'sangue', 'brinquedos', 'outros'],
    required: true
  },
  meta: {
    type: Number,
    required: [true, 'Por favor, adicione uma meta']
  },
  arrecadado: {
    type: Number,
    default: 0
  },
  dataInicio: {
    type: Date,
    default: Date.now
  },
  dataFim: {
    type: Date,
    required: [true, 'Por favor, adicione uma data de término']
  },
  status: {
    type: String,
    enum: ['ativa', 'encerrada', 'suspensa'],
    default: 'ativa'
  },
  fotos: [String],
  local: {
    endereco: String,
    cidade: String,
    estado: String
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Campanha', CampanhaSchema);