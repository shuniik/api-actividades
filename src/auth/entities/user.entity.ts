import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuarios {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique:true
    })
    email: string;

    @Column('text',{
        select:false
    })
    password: string;

    @Column('text')
    nombre_completo: string;

    @Column({type:'bit',default:1})
    estado: boolean;

    @Column('text')
    role:string

    @BeforeInsert()
    checkEmailbeforeInser(){
        this.email= this.email.toLowerCase().trim();
    }
    @BeforeUpdate()
    checkEmailbeforeUpdate(){
        this.checkEmailbeforeInser()
    }
}
