const Ocorrencia = require('../models/Ocorrencia');

exports.getAllOcorrencias = async (req, res) => {
  try {
    const ocorrencias = await Ocorrencia.find().sort({ data: -1 }); // ordencao por mais recente, checar se vamos ordernar por outro
    res.json(ocorrencias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar ocorrências', error: err.message });
  }
};

exports.getOcorrenciasStats = async (req, res) => {
  try {
    const totalRegistradas = await Ocorrencia.countDocuments();
    const totalEmAberto = await Ocorrencia.countDocuments({ status: 'Aberto' }); 
    const totalFinalizadas = await Ocorrencia.countDocuments({ status: 'Aprovado' });
    const totalAnalise = await Ocorrencia.countDocuments({ status: 'Em Análise' });

    res.json({
      totalRegistradas,
      totalEmAberto,
      totalFinalizadas,
      totalAnalise
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar estatísticas', error: err.message });
  }
};

exports.createOcorrencia = async (req, res) => {
  const { responsavel, regiao, tipo } = req.body;

  if (!responsavel || !responsavel.nome || !responsavel.cargo || !regiao || !tipo) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
  }

  const cargosValidos = ['Analista', 'Chefe'];
  const regioesValidas = ['Recife-PE', 'São Paulo-SP', 'Belo Horizonte-MG'];
  const tiposValidos = ['Incêndio', 'Resgate', 'Químico'];
  const cargoResponsavel = responsavel.cargo;

  if (!cargosValidos.includes(cargoResponsavel)) {
    return res.status(400).json({ message: `Cargo inválido. Opções válidas: ${cargosValidos.join(', ')}` });
  }
  if (!regioesValidas.includes(regiao)) {
    return res.status(400).json({ message: `Região inválida. Opções válidas: ${regioesValidas.join(', ')}` });
  }
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({ message: `Tipo inválido. Opções válidas: ${tiposValidos.join(', ')}` });
  }

  try {
    const novaOcorrencia = new Ocorrencia({ responsavel, regiao, tipo });
    await novaOcorrencia.save();
    res.status(201).json(novaOcorrencia);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar ocorrência', error: err.message });
  }
};

exports.updateOcorrencia = async (req, res) => {
  const { id } = req.params;
  const { status, responsavel, regiao, tipo } = req.body;

  const statusValidos = ['Aberto', 'Aprovado', 'Em Análise', 'Rejeitado'];
  const cargosValidos = ['Analista', 'Chefe'];
  const regioesValidas = ['Recife-PE', 'São Paulo-SP', 'Belo Horizonte-MG'];
  const tiposValidos = ['Incêndio', 'Resgate', 'Químico'];

  if (status && !statusValidos.includes(status)) {
    return res.status(400).json({ message: `Status inválido. Opções válidas: ${statusValidos.join(', ')}` });
  }

  if (responsavel && responsavel.cargo && !cargosValidos.includes(responsavel.cargo)) {
    return res.status(400).json({ message: `Cargo inválido. Opções válidas: ${cargosValidos.join(', ')}` });
  }

  if (regiao && !regioesValidas.includes(regiao)) {
    return res.status(400).json({ message: `Região inválida. Opções válidas: ${regioesValidas.join(', ')}` });
  }

  if (tipo && !tiposValidos.includes(tipo)) {
    return res.status(400).json({ message: `Tipo inválido. Opções válidas: ${tiposValidos.join(', ')}` });
  }

  try {
    const ocorrencia = await Ocorrencia.findById(id);
    if (!ocorrencia) return res.status(404).json({ message: 'Ocorrência não encontrada.' });
    
    if (status) ocorrencia.status = status;
    if (responsavel) ocorrencia.responsavel = responsavel;
    if (regiao) ocorrencia.regiao = regiao;
    if (tipo) ocorrencia.tipo = tipo;

    await ocorrencia.save();
    res.json(ocorrencia);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar ocorrência', error: err.message });
  }
};

exports.deleteOcorrencia = async (req, res) => {
  const { id } = req.params;
  try {
    const ocorrencia = await Ocorrencia.findByIdAndDelete(id);
    if (!ocorrencia) return res.status(404).json({ message: 'Ocorrência não encontrada.' });
    res.json({ message: 'Ocorrência deletada com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar ocorrência', error: err.message });
  }
};

exports.filterOcorrencias = async (req, res) => {
  const { status, tipo, regiao } = req.query;
  const filter = {};

  if (status && status !== 'Todos') filter.status = status;
  if (tipo && tipo !== 'Todos') filter.tipo = tipo;
  if (regiao && regiao !== 'Todas') filter.regiao = regiao;

  try {
    const ocorrencias = await Ocorrencia.find(filter).sort({ data: -1 });
    res.json(ocorrencias);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao filtrar ocorrências', error: err.message });
  }
};
