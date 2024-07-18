import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empresa {
    @PrimaryGeneratedColumn('uuid')
    id_empresa: string;

    @Column('text')
    empresa:string;
}
