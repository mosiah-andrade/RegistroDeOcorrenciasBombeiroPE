const mongoose = require('mongoose');

const ocorrenciaSchema = new mongoose.Schema({
  responsavel: {
    nome: { type: String, required: true },
    cargo: { type: String, enum: ['Analista', 'Chefe'], required: true }, //checar os tipos de cargos pra add
  },
  data: { type: Date, default: Date.now },
  status: { type: String, enum: ['Aberto', 'Aprovado', 'Em Análise', 'Rejeitado'], default: 'Aberto' }, //checar como vai funcionar status na criacao de oc (required?)
  regiao: { type: String, enum: ['Recife-PE', 'São Paulo-SP', 'Belo Horizonte-MG' ], required: true },
  tipo: { type: String, enum: ['Incêndio', 'Resgate', 'Químico'], required: true },
  //descricao: { type: String, required: true},
});

module.exports = mongoose.model('Ocorrencia', ocorrenciaSchema);
