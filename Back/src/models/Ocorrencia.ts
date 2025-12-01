import mongoose, { Document, Schema } from 'mongoose';

export enum StatusOcorrencia {
  ABERTO = 'aberto',
  EM_ANDAMENTO = 'em_andamento',
  CONCLUIDO = 'concluido',
  CANCELADO = 'cancelado'
}

export interface IResponsavel {
  nome: string;
  cargo: string;
}
export interface IMidia {
  url: string;
  hash: string;
  mimetype?: string;
  tamanho?: number;
  createdAt: Date;
}
export interface IGpsInfo {
  latitude: number;
  longitude: number;
  precisao?: number;
  timestamp: Date;
}
export interface IAssinatura {
  pessoa: string;
  url: string;
  createdAt: Date;
}
export interface ITimelineEvento {
  evento: string; //aq vai ser tipo "criado", "editado" "status-atualizado" etc
  autor: string; 
  timestamp: Date;
}
export interface IOcorrencia extends Document {
  responsavel: IResponsavel;
  regiao: string;
  tipo: string;
  data?: Date;
  descricao: string;
  viatura: string;
  equipe: string[];
  
  gps?: IGpsInfo;
  
  fotos: IMidia[];
  videos: IMidia[];
  assinaturas: IAssinatura[];

  sincronizado: boolean;
  versao: number; //verificar conflitos nas versoes (offline)
  lastModifiedAt?: Date;
  lastModifiedBy?: string;

  timeline: ITimelineEvento[];

  status: StatusOcorrencia;
}

const MidiaSchema = new Schema<IMidia>({
  url: { type: String, required: true },
  hash: { type: String, required: true},
  mimetype: { type: String },
  tamanho: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

const GpsSchema = new Schema<IGpsInfo>({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  precisao: { type: Number },
  timestamp: { type: Date, default: Date.now }
});

const AssinaturaSchema = new Schema<IAssinatura>({
  pessoa: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const TimelineSchema = new Schema<ITimelineEvento>({
  evento: { type: String, required: true },
  autor: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const OcorrenciaSchema = new Schema<IOcorrencia>(
  {
    responsavel: {
      nome: { type: String, required: true },
      cargo: { type: String, required: true }
    },

    regiao: { type: String, required: true },
    tipo: { type: String, required: true },
    data: { type: Date, default: Date.now },

    descricao: { type: String, required: true },
    viatura: { type: String, required: true },
    equipe: [{ type: String, requiered: true }],

    gps: GpsSchema,

    fotos: { type: [MidiaSchema], default: [] },
    videos: { type: [MidiaSchema], default: [] },
    assinaturas: { type: [AssinaturaSchema], default: [] },

    sincronizado: { type: Boolean, default: true },

    versao: { type: Number, default: 1 },
    lastModifiedAt: { type: Date },
    lastModifiedBy: { type: String },

    timeline: { type: [TimelineSchema], default: [] },

    status: {
      type: String,
      enum: Object.values(StatusOcorrencia),
      required: true,
      default: StatusOcorrencia.ABERTO
    }
  },
  { timestamps: true }
);

const Ocorrencia = mongoose.model<IOcorrencia>('Ocorrencia', OcorrenciaSchema);
export default Ocorrencia;