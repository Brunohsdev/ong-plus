const mongoose = require('mongoose');

const NotificacaoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario',
    required: true
  },
  tipo: {
    type: String,
    enum: ['doacao', 'voluntariado', 'campanha', 'sistema'],
    required: true
  },
  titulo: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Título não pode ter mais que 100 caracteres']
  },
  mensagem: {
    type: String,
    required: true
  },
  lida: {
    type: Boolean,
    default: false
  },
  metadata: {
    campanha: {
      type: mongoose.Schema.ObjectId,
      ref: 'Campanha'
    },
    doacao: {
      type: mongoose.Schema.ObjectId,
      ref: 'Doacao'
    },
    voluntariado: {
      type: mongoose.Schema.ObjectId,
      ref: 'Voluntariado'
    }
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.models.Notificacao || mongoose.model('Notificacao', NotificacaoSchema);

