import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Empresa {
    @PrimaryGeneratedColumn('uuid')
    id_empresa: string;

    @Column('text',{
        unique:true
    })
    empresa:string;

    @BeforeInsert()
    checkEmpresaInsert(){
        
        this.empresa = this.empresa
            .toUpperCase()

    }

    @BeforeUpdate()
    checkEmpresaUpdate(){
        this.empresa = this.empresa
        .toUpperCase()
    }
}
