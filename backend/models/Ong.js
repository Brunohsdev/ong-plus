const mongoose = require('mongoose');

const OngSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario',
    required: true,
    unique: true
  },
  cnpj: {
    type: String,
    required: [true, 'Por favor, adicione um CNPJ'],
    unique: true
  },
  descricao: {
    type: String,
    required: [true, 'Por favor, adicione uma descrição']
  },
  areasAtuacao: {
    type: [String],
    required: true
  },
  site: {
    type: String
  },
  redesSociais: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String
  },
  selos: [{
    tipo: String,
    dataConquista: {
      type: Date,
      default: Date.now
    }
  }],
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.models.Ong || mongoose.model('Ong', OngSchema);
