import mongoose, { Document, Schema } from 'mongoose';

export interface IResponsavel {
  nome: string;
  cargo?: string;
}

export interface IOcorrencia extends Document {
  responsavel: IResponsavel;
  regiao: string;
  tipo: string;
  data?: Date;

  getResponsavel(): IResponsavel;
  setResponsavel(Resp: IResponsavel): void;
  getRegiao(): string;
  setRegiao(Reg: string): void;
  getTipo(): string;
  setTipo(Tip: string): void;
}

class OcorrenciaClass {
  responsavel!: IResponsavel;
  regiao!: string;
  tipo!: string;
  data?: Date;

  constructor(responsavel?: IResponsavel, regiao?: string, tipo?: string, data?: Date) {
    if (responsavel) this.responsavel = responsavel;
    if (regiao) this.regiao = regiao;
    if (tipo) this.tipo = tipo;
    if (data) this.data = data;
  }

  getResponsavel() { return this.responsavel; }
  setResponsavel(Resp: IResponsavel) { this.responsavel = Resp; }

  getRegiao() { return this.regiao; }
  setRegiao(Reg: string) { this.regiao = Reg; }

  getTipo() { return this.tipo; }
  setTipo(Tip: string) { this.tipo = Tip; }
}

const OcorrenciaSchema = new Schema<IOcorrencia>({
  responsavel: {
    nome: { type: String, required: true },
    cargo: { type: String, required: true }
  },
  regiao: { type: String, required: true },
  tipo: { type: String, required: true },
  data: { type: Date, default: Date.now }
}, { timestamps: true });

OcorrenciaSchema.loadClass(OcorrenciaClass);

const Ocorrencia = mongoose.model<IOcorrencia>('Ocorrencia', OcorrenciaSchema);
export default Ocorrencia;