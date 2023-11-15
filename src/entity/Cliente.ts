import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Agendamento } from "./Agendamento"

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    senha: string

    @OneToMany(() => Agendamento, (agendamento) => agendamento.cliente)
    agendamento: Agendamento
}
