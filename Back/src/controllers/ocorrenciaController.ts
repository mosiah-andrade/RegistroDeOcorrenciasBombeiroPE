import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Ocorrencia, { StatusOcorrencia } from '../models/Ocorrencia';

export const getAllOcorrencias = async (req: Request, res: Response) => {
  try {
    const { regiao, tipo, status, responsavelNome, startDate, endDate } = req.query;
    const filter: any = {};

    if (regiao) filter.regiao = { $regex: String(regiao), $options: 'i' };
    if (tipo) filter.tipo = { $regex: String(tipo), $options: 'i' };
    if (status) filter.status = String(status); // Status deve ser correspondência exata
    if (responsavelNome) filter['responsavel.nome'] = { $regex: String(responsavelNome), $options: 'i' };

    if (startDate || endDate) {
      const dateField = (await Ocorrencia.exists({ data: { $exists: true } })) ? 'data' : 'createdAt';
      filter[dateField] = {};
      if (startDate) filter[dateField].$gte = new Date(String(startDate));
      if (endDate) filter[dateField].$lte = new Date(String(endDate));
    }

    const ocorrencias = await Ocorrencia.find(filter).sort({ createdAt: -1 });
    return res.json(ocorrencias);
  } catch (err: any) {
    return res.status(500).json({ message: 'Erro ao buscar ocorrências', error: err.message });
  }
};

export const getOcorrenciasStats = async (req: Request, res: Response) => {
  try {
    const stats = await Ocorrencia.aggregate([
      { $group: { _id: '$regiao', count: { $sum: 1 } } },
      { $project: { regiao: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);
    return res.json(stats);
  } catch (err: any) {
    return res.status(500).json({ message: 'Erro ao gerar estatísticas', error: err.message });
  }
};

export const createOcorrencia = async (req: Request, res: Response) => {
  try {
    const { responsavel, regiao, tipo, data, status } = req.body;

    if (!responsavel || !responsavel.nome || !responsavel.cargo) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes: responsavel.nome e responsavel.cargo' });
    }
    if (!regiao || !tipo) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes: regiao e tipo' });
    }

    const ocorrenciaData: any = {
      responsavel: {
        nome: String(responsavel.nome),
        cargo: String(responsavel.cargo)
      },
      regiao: String(regiao),
      tipo: String(tipo),
    };

    if (data) ocorrenciaData.data = new Date(data);
    if (status) ocorrenciaData.status = String(status);

    const ocorrencia = new Ocorrencia(ocorrenciaData);
    await ocorrencia.save();
    return res.status(201).json(ocorrencia);
  } catch (err: any) {
    return res.status(500).json({ message: 'Erro ao criar ocorrência', error: err.message });
  }
};

export const updateOcorrencia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const updates: any = req.body;

    const allowed: any = {};
    if (updates.responsavel) {
      if (!updates.responsavel.nome || !updates.responsavel.cargo) {
        return res.status(400).json({ message: 'Ao atualizar, responsavel deve conter nome e cargo.' });
      }
      allowed.responsavel = {
        nome: String(updates.responsavel.nome),
        cargo: String(updates.responsavel.cargo)
      };
    }
    if (updates.regiao) allowed.regiao = String(updates.regiao);
    if (updates.tipo) allowed.tipo = String(updates.tipo);
    if (updates.data) allowed.data = new Date(updates.data);
    if (updates.status) allowed.status = String(updates.status);

    const updated = await Ocorrencia.findByIdAndUpdate(id, allowed, { new: true });
    if (!updated) return res.status(404).json({ message: 'Ocorrência não encontrada' });

    return res.json(updated);
  } catch (err: any) {
    return res.status(500).json({ message: 'Erro ao atualizar ocorrência', error: err.message });
  }
};

export const deleteOcorrencia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const deleted = await Ocorrencia.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Ocorrência não encontrada' });

    return res.status(200).json({ message: 'Ocorrência excluída com sucesso' });
  } catch (err: any) {
    return res.status(500).json({ message: 'Erro ao excluir ocorrência', error: err.message });
  }
};


export const filterOcorrencias = async (req: Request, res: Response) => {
  try {
    const { regiao, tipo, responsavelNome, startDate, endDate, status } = req.query; // Adicionado status
    const filter: any = {};

    if (regiao) filter.regiao = { $regex: String(regiao), $options: 'i' };
    if (tipo) filter.tipo = { $regex: String(tipo), $options: 'i' };
    if (status) filter.status = String(status); // Adicionado filtro de status
    if (responsavelNome) filter['responsavel.nome'] = { $regex: String(responsavelNome), $options: 'i' };

    if (startDate || endDate) {
      filter.data = {};
      if (startDate) filter.data.$gte = new Date(String(startDate));
      if (endDate) filter.data.$lte = new Date(String(endDate));
    }

    const results = await Ocorrencia.find(filter).sort({ createdAt: -1 });
    return res.json(results);
  } catch (err: any) {
    return res.status(500).json({ message: 'Erro ao filtrar ocorrências', error: err.message });
  }
};

export const getFiltroOptions = async (req: Request, res: Response) => {
  try {
  
    const regioesPromise = Ocorrencia.aggregate([
      { $group: { _id: '$regiao' } },
      { $sort: { _id: 1 } }
    ]);

    const responsaveisPromise = Ocorrencia.aggregate([
      { $group: { _id: '$responsavel.nome' } },
      { $sort: { _id: 1 } }
    ]);

    const tiposPromise = Ocorrencia.aggregate([
      { $group: { _id: '$tipo' } },
      { $sort: { _id: 1 } }
    ]);

    const [regioesData, responsaveisData, tiposData] = await Promise.all([
      regioesPromise,
      responsaveisPromise,
      tiposPromise
    ]);

    const formatResponse = (data: any[]) => data.map(item => item._id).filter(Boolean);

    return res.json({
      regioes: formatResponse(regioesData),
      responsaveis: formatResponse(responsaveisData),
      tipos: formatResponse(tiposData)
    });

  } catch (err: any) {
    return res.status(500).json({ message: 'Erro ao buscar opções de filtro', error: err.message });
  }
};