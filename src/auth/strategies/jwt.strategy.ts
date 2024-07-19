import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";
import { Usuarios } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(

        @InjectRepository(Usuarios)
        private readonly userRepository: Repository<Usuarios>,
        configService:ConfigService
    ){
        super({
            secretOrKey:configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    async validate(payload: JwtPayload): Promise<Usuarios>{
        
        

        const{ email} = payload;

        const usuario = await this.userRepository.findOneBy({email});
        if(!usuario)
            throw new UnauthorizedException('Token no válido')
        
        if(!usuario.estado)
            throw new UnauthorizedException('Usuario inactivo, comuníquese con el admin')

        return usuario;
    }
}