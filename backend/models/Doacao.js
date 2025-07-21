const mongoose = require('mongoose');

const DoacaoSchema = new mongoose.Schema({
  doador: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario',
    required: true
  },
  campanha: {
    type: mongoose.Schema.ObjectId,
    ref: 'Campanha',
    required: true
  },
  valor: {
    type: Number,
    required: [true, 'Por favor, adicione um valor'],
    min: [1, 'O valor deve ser maior que zero']
  },
  mensagem: {
    type: String,
    maxlength: [500, 'Mensagem não pode ter mais que 500 caracteres']
  },
  anonima: {
    type: Boolean,
    default: false
  },
  comprovante: {
    type: String
  },
  dataDoacao: {
    type: Date,
    default: Date.now
  }
});

// Atualizar campanha quando uma doação é feita
DoacaoSchema.post('save', async function(doc) {
  const Campanha = mongoose.model('Campanha');
  await Campanha.findByIdAndUpdate(doc.campanha, {
    $inc: { arrecadado: doc.valor }
  });
});


module.exports = mongoose.models.Doacao || mongoose.model('Doacao', DoacaoSchema);
