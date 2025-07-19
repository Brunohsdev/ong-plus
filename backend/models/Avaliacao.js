const mongoose = require('mongoose');

const AvaliacaoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipo: {
    type: String,
    enum: ['ong', 'campanha'],
    required: true
  },
  alvo: {
    type: mongoose.Schema.ObjectId,
    required: true,
    refPath: 'tipo'
  },
  nota: {
    type: Number,
    required: true,
    min: [1, 'A nota mínima é 1'],
    max: [5, 'A nota máxima é 5']
  },
  comentario: {
    type: String,
    maxlength: [1000, 'Comentário não pode ter mais que 1000 caracteres']
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

// Impedir avaliação duplicada
AvaliacaoSchema.index({ usuario: 1, tipo: 1, alvo: 1 }, { unique: true });


module.exports = mongoose.models.Avaliacao || mongoose.model('Avaliacao', AvaliacaoSchema);

