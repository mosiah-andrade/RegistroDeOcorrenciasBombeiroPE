import mongoose, { Document, Schema } from 'mongoose'

export enum Role {
  ADMINISTRADOR = 'Administrador',
  CHEFE = 'Chefe',
  USER = 'Usuario'
}

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  CPF: string
  role: Role

  getFirstName(): string
  setFirstName(firstN: string): void
  getLastName(): string
  setLastName(lastN: string): void
  getEmail(): string
  setEmail(mail: string): void
  getPhone(): string
  setPhone(phon: string): void
  getCPF(): string
  setCPF(cpf: string): void
  gerRole(): Role
  setRole(rol: Role) : void
}

class UserClass {
  firstName!: string
  lastName!: string
  email!: string
  password!: string
  phone!: string
  CPF!: string
  role!: Role

  constructor(firstName?: string, lastName?: string, email?: string, password?: string, phone?: string, CPF?: string, role?: Role) {
    if (firstName) this.firstName = firstName
    if (lastName) this.lastName = lastName
    if (email) this.email = email
    if (password) this.password = password
    if (phone) this.phone = phone
    if (CPF) this.CPF = CPF
    if (role) this.role = role
  }

  getFirstName() { return this.firstName; }
  setFirstName(firstN: string) { this.firstName = firstN }

  getLastName() { return this.lastName }
  setLastName(lastN: string) { this.lastName = lastN }

  getEmail() { return this.email }
  setEmail(mail: string) { this.email = mail }

  getPhone() { return this.phone }
  setPhone(phon: string) { this.phone = phon }

  getCPF() { return this.CPF }
  setCPF(cpf: string) { this.CPF = cpf }

  getRole(): Role { return this.role}
  setRole(rol: Role): void {this.role = rol}
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  CPF: { type: String, required: true, unique: true },
  role: {type: String, enum: Object.values(Role), required: true, default: Role.USER}
}, { timestamps: true });

UserSchema.loadClass(UserClass)

const User = mongoose.model<IUser>('User', UserSchema)
export default User