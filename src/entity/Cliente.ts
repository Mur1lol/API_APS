import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, EventSubscriber, BeforeInsert } from "typeorm"
import { Agendamento } from "./Agendamento"

@Unique(['email'])
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
