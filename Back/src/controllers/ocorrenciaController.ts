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
    } = req.body;

    if (!responsavel || !responsavel.nome || !responsavel.cargo) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes: responsavel.nome e responsavel.cargo' });
    }
    if (!regiao || !tipo) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes: região e tipo' });
    }
    if (!descricao || !viatura || !equipe) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes: descrição, viatura e equipe' });
    }
    if (gps) {
      if (
        typeof gps.latitude !== "number" || typeof gps.longitude !== "number"
      ){
        return res.status(400).json({ message: 'GPS inválido: latitude e longitude devem ser números' })
      }
    }
    const now = new Date();
    const autor = responsavel.nome;

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

      gps: gps || undefined,
      fotos: [],
      videos: [],
      assinaturas: [],

      status: "aberto",

      sincronizado:  true,
      versao: 1,

      createdAt: now,
      lastModifiedAt: now,
      lastModifiedBy: autor,

      timeline: [
        {
          evento: "criado",
          autor: autor,
          timestamp: now
        }
      ]
    };

    if (data) ocorrenciaData.data = new Date(data);

    const ocorrencia = new Ocorrencia(ocorrenciaData);
    await ocorrencia.save();
    
    return res.status(201).json(ocorrencia);
  } catch (err: any) {
    console.error("Erro ao criar ocorrência:", err);
    return res.status(500).json({ message: 'Erro ao criar ocorrência', error: err.message });
  }
};

export const updateOcorrencia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const ocorrencia = await Ocorrencia.findById(id);
    if (!ocorrencia) {
      return res.status(404).json({ message: 'Ocorrência não encontrada' });
    }

    const updates = req.body;
    const forbidden = [
      "versao",
      "sincronizado",
      "lastModifiedAt",
      "lastModifiedBy",
      "timeline",
      "fotos",
      "videos",
      "assinaturas",
      "createdAt",
      "updatedAt"
    ];

    for (const key of forbidden) {
      if (key in updates) delete updates[key];
    }

    if (updates.responsavel) {
      if (!updates.responsavel.nome || !updates.responsavel.cargo) {
        return res.status(400).json({ message: "Ao atualizar, responsável deve conter nome e cargo." });
      }
      ocorrencia.responsavel = {
        nome: String(updates.responsavel.nome),
        cargo: String(updates.responsavel.cargo)
      };
    }

    if (updates.regiao) ocorrencia.regiao = String(updates.regiao);
    if (updates.tipo) ocorrencia.tipo = String(updates.tipo);
    if (updates.data) ocorrencia.data = new Date(updates.data);
    if (updates.descricao) ocorrencia.descricao = updates.descricao;
    if (updates.viatura) ocorrencia.viatura = updates.viatura;
    if (updates.equipe) ocorrencia.equipe = updates.equipe;
    if (updates.gps) {
      if ( 
        typeof updates.gps.latitude !== "number" || typeof updates.gps.longitude !== "number"
      ) {
        return res.status(400).json({ message: 'GPS inválido' })
      }
      ocorrencia.gps = updates.gps;
    }
    if (updates.status) {
      ocorrencia.status = updates.status;
    }

    const now = new Date();
    const autor = updates?.autor ?? ocorrencia.responsavel.nome;

    ocorrencia.lastModifiedAt = now;
    ocorrencia.lastModifiedBy = autor;

    ocorrencia.versao += 1;

    ocorrencia.timeline.push({
      evento: "editado",
      autor,
      timestamp: now
    });

    await ocorrencia.save();

    return res.json(ocorrencia);

  } catch (err: any) {
    console.error("Erro ao atualizar ocorrência:", err);
    return res.status(500).json({
      message: 'Erro ao atualizar ocorrência',
      error: err.message
    });
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

export const syncOcorrenciasOffline = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const { idOffline, dados, versao } = payload;

    if (!dados) {
      return res.status(400).json({ message: "Corpo inválido para sync." });
    }

    if (!dados._id) {
      const now = new Date();

      const ocorrencia = new Ocorrencia({
        ...dados,
        sincronizado: true,
        versao: versao ?? 1,
        lastModifiedAt: now,
        lastModifiedBy: dados.responsavel?.nome ?? "offline",
        timeline: [
          ...(dados.timeline ?? []),
          {
            evento: "sincronizado",
            autor: dados.responsavel?.nome ?? "offline",
            timestamp: now
          }
        ]
      });

      await ocorrencia.save();

      return res.status(201).json({
        message: "Ocorrência criada via sync offline.",
        ocorrencia
      });
    }

    const ocorrenciaBD = await Ocorrencia.findById(dados._id);

    if (!ocorrenciaBD) {
      return res.status(404).json({ message: "Ocorrência não encontrada no servidor." });
    }

    // conflito de versão é mais antiga que a do servidor
    if (versao < ocorrenciaBD.versao) {
      return res.status(409).json({
        message: "Conflito de versão: servidor possui versão mais recente.",
        servidor: ocorrenciaBD,
        cliente: dados
      });
    }

    const now = new Date();
    Object.assign(ocorrenciaBD, dados);

    ocorrenciaBD.sincronizado = true;
    ocorrenciaBD.lastModifiedAt = now;
    ocorrenciaBD.lastModifiedBy = dados.responsavel?.nome ?? "offline";
    ocorrenciaBD.versao = versao + 1;

    ocorrenciaBD.timeline.push({
      evento: "sincronizado",
      autor: dados.responsavel?.nome ?? "offline",
      timestamp: now
    });

    await ocorrenciaBD.save();

    return res.status(200).json({
      message: "Ocorrência sincronizada com sucesso.",
      ocorrencia: ocorrenciaBD
    });

  } catch (err: any) {
    console.error("Erro no sync offline:", err);
    return res.status(500).json({
      message: "Erro ao sincronizar dados offline",
      error: err.message
    });
  }
};
