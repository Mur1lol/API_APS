import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Funcionario_Funcao } from "./Funcionario_Funcao";

@Entity()
export class Funcao {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome_funcao: string

  @OneToMany(() => Funcionario_Funcao, (funci_funcao) => funci_funcao.funcao)
  funci_func: Funcionario_Funcao
}