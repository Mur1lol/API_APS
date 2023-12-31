import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Funcionario_Funcao } from "./Funcionario_Funcao";


@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'date' })
  data: Date;

  @Column()
  hora: string

  @ManyToOne(() => Cliente, (cliente) => cliente.agendamento)
  cliente: Cliente

  @ManyToOne(() => Funcionario_Funcao, (funcionario_funcao) => funcionario_funcao.agendamento)
  funcionario_funcao: Funcionario_Funcao
}