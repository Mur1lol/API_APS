import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Funcionario_Funcao } from "./Funcionario_Funcao"

@Entity()
export class Funcionario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    senha: string

    @OneToMany(() => Funcionario_Funcao, (funci_funcao) => funci_funcao.funcionario)
    funci_func: Funcionario_Funcao
}