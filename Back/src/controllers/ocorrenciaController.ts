import crypto from "crypto";
import path from "path";
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Ocorrencia, { StatusOcorrencia } from '../models/Ocorrencia';

export const addMidia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }

    const ocorrencia = await Ocorrencia.findById(id);
    if (!ocorrencia) {
      return res.status(404).json({ message: "Ocorrência não encontrada." });
    }

    for (const file of files) {
      const hash = crypto
        .createHash("sha256")
        .update(file.path)
        .digest("hex");

      const midia = {
        url: "/uploads/midias/" + file.filename,
        hash,
        mimetype: file.mimetype,
        tamanho: file.size,
        createdAt: new Date()
      };

      if (file.mimetype.startsWith("video")) {
        ocorrencia.videos.push(midia);
      } else {
        ocorrencia.fotos.push(midia);
      }

      ocorrencia.timeline.push({
        evento: file.mimetype.startsWith("video")
          ? "video_adicionado"
          : "foto_adicionada",
        autor: req.body?.autor || "sistema",
        timestamp: new Date()
      });

      ocorrencia.versao += 1;
      ocorrencia.lastModifiedAt = new Date();
      ocorrencia.lastModifiedBy = req.body?.autor || "sistema";
    }

    await ocorrencia.save();

    return res.status(200).json({
      message: "Mídias adicionadas com sucesso!",
      ocorrencia
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      message: "Erro ao anexar mídia",
      error: err.message
    });
  }
};

export const getAllOcorrencias = async (req: Request, res: Response) => {
  try {
    const { regiao, tipo, status, responsavelNome,  startDate, endDate } = req.query;
    const filter: any = {};

    if (regiao) filter.regiao = { $regex: String(regiao), $options: 'i' };
    if (tipo) filter.tipo = { $regex: String(tipo), $options: 'i' };
    if (status) filter.status = String(status);
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
    const {
      responsavel, 
      regiao, 
      tipo, 
      data,
      descricao,
      viatura,
      equipe,
      gps,
      fotos,
      videos,
      assinaturas, 
      status,
      sincronizado,
      versao,
      lastModifiedAt,
      lastModifiedBy,
      timeline
    } = req.body;

    if (!responsavel || !responsavel.nome || !responsavel.cargo) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes: responsavel.nome e responsavel.cargo' });
    }
    if (!regiao || !tipo) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes: região e tipo' });
    }

    const ocorrenciaData: any = {
      responsavel: {
        nome: String(responsavel.nome),
        cargo: String(responsavel.cargo)
      },
      regiao: String(regiao),
      tipo: String(tipo),

      descricao,
      viatura,
      equipe,

      gps,
      fotos,
      videos,
      assinaturas,

      status,

      sincronizado: sincronizado ?? true,
      versao: versao ?? 1,

      lastModifiedAt,
      lastModifiedBy,

      timeline: timeline ?? []
    };

    if (data) ocorrenciaData.data = new Date(data);

    const ocorrencia = new Ocorrencia(ocorrenciaData);
    await ocorrencia.save();
    
    return res.status(201).json(ocorrencia);
  } catch (err: any) {
    console.error("Erro detalhado ao criar ocorrência:", err);
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
        return res.status(400).json({ message: 'Ao atualizar, responsável deve conter nome e cargo.' });
      }
      allowed.responsavel = {
        nome: String(updates.responsavel.nome),
        cargo: String(updates.responsavel.cargo)
      };
    }
    if (updates.regiao) allowed.regiao = String(updates.regiao);
    if (updates.tipo) allowed.tipo = String(updates.tipo);
    if (updates.data) allowed.data = new Date(updates.data);
    if (updates.descricao) allowed.descricao = updates.descricao;
    if (updates.viatura) allowed.viatura = updates.viatura;
    if (updates.equipe) allowed.equipe = updates.equipe;
    if (updates.gps) allowed.gps = updates.gps;
    if (updates.fotos) allowed.fotos = updates.fotos;
    if (updates.videos) allowed.videos = updates.videos;
    if (updates.assinaturas) allowed.assinaturas = updates.assinaturas;
    if (updates.sincronizado !== undefined ) allowed.sincronizado = updates.sincronizado;
    if (updates.versao) allowed.versao = updates.versao;
    if (updates.lastModifiedAt)
      allowed.lastModifiedAt = new Date(updates.lastModifiedAt);
    if (updates.lastModifiedBy) allowed.lastModifiedBy = updates.lastModifiedBy;
    if (updates.timeline)allowed.timeline = updates.timeline;
    if (updates.status) allowed.status = updates.status;

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
    const { regiao, tipo, responsavelNome, startDate, endDate, status, lastModifiedAt } = req.query; 
    const filter: any = {};

    if (regiao) filter.regiao = { $regex: String(regiao), $options: 'i' };
    if (tipo) filter.tipo = { $regex: String(tipo), $options: 'i' };
    if (status) filter.status = String(status);
    if (responsavelNome) filter['responsavel.nome'] = { $regex: String(responsavelNome), $options: 'i' };

    if (startDate || endDate) {
      filter.data = {};
      if (startDate) filter.data.$gte = new Date(String(startDate));
      if (endDate) filter.data.$lte = new Date(String(endDate));
    }

    if (lastModifiedAt) {
      filter.lastModifiedAt = {
        $gte: new Date(String(lastModifiedAt))
      };
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
