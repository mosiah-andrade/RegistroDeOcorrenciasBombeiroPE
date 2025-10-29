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
export interface IOcorrencia extends Document {
  responsavel: IResponsavel;
  regiao: string;
  tipo: string;
  data?: Date;
  status: StatusOcorrencia;

  getResponsavel(): IResponsavel;
  setResponsavel(Resp: IResponsavel): void;
  getRegiao(): string;
  setRegiao(Reg: string): void;
  getTipo(): string;
  setTipo(Tip: string): void;

  getStatus(): StatusOcorrencia;
  setStatus(Stat: StatusOcorrencia): void;
}
class OcorrenciaClass {
  responsavel!: IResponsavel;
  regiao!: string;
  tipo!: string;
  data?: Date;
  status!: StatusOcorrencia;

  constructor(responsavel?: IResponsavel, regiao?: string, tipo?: string,  data?: Date, status?: StatusOcorrencia) {
    if (responsavel) this.responsavel = responsavel;
    if (regiao) this.regiao = regiao;
    if (tipo) this.tipo = tipo;
<<<<<<< HEAD
=======
    if (descricao) this.descricao = descricao;
>>>>>>> 410f64675b10bc54a4511653c28c101a6cd7fa03
    if (data) this.data = data;
    if (status) this.status = status;
  }

  getResponsavel() { return this.responsavel; }
  setResponsavel(Resp: IResponsavel) { this.responsavel = Resp; }

  getRegiao() { return this.regiao; }
  setRegiao(Reg: string) { this.regiao = Reg; }

  getTipo() { return this.tipo; }
  setTipo(Tip: string) { this.tipo = Tip; }
  
  getStatus() { return this.status; }
  setStatus(Stat: StatusOcorrencia) { this.status = Stat; }
}

const OcorrenciaSchema = new Schema<IOcorrencia>({
  responsavel: {
    nome: { type: String, required: true },
    cargo: { type: String, required: true }
  },
  regiao: { type: String, required: true },
  tipo: { type: String, required: true },
  data: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: Object.values(StatusOcorrencia),
    required: true,
    default: StatusOcorrencia.ABERTO
  }
}, { timestamps: true });

OcorrenciaSchema.loadClass(OcorrenciaClass);

const Ocorrencia = mongoose.model<IOcorrencia>('Ocorrencia', OcorrenciaSchema);
export default Ocorrencia;
