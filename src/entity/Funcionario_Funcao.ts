import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Funcao } from "./Funcao"
import { Funcionario } from "./Funcionario"
import { Agendamento } from "./Agendamento";

@Entity()
export class Funcionario_Funcao {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.funci_func)
  funcionario: Funcionario

  @ManyToOne(() => Funcao, (funcao) => funcao.funci_func)
  funcao: Funcao

  @OneToMany(() => Agendamento, (agendamento) => agendamento.funcionario_funcao)
  agendamento: Agendamento
}