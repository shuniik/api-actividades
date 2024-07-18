import { IsIn, IsString, IsUUID } from "class-validator";


export class CreateEmpresaDto {

    @IsUUID()
    @IsString()
    id_empresa: string;

    @IsIn(['GS','GLOBALPRODUCTS','GLOBALLABS','LABORATORIO','GOCISA','SILICE','CANTERA','KING AUDIO'])
    empresa:string;
}
