import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateDtoUser } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import  * as bcrypt from 'bcrypt'


import{ v4 as uuid }from 'uuid'
import { LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
    private readonly jwtService: JwtService
  ){}

  async create(createAuthDto: CreateDtoUser) {
    try {
      // const usuario =  this.usuarioRepository.create(createAuthDto);    
      // await this.usuarioRepository.save(usuario)
      // return usuario;
  
      const usuario = new Usuarios()
      usuario.id=uuid(),
      usuario.email=createAuthDto.email,
      usuario.nombre_completo=createAuthDto.nombre_completo,
      usuario.password=  bcrypt.hashSync( createAuthDto.password,10)

      await this.usuarioRepository.save(usuario)

      delete usuario.password
      
      return {...usuario,token: this.getJwtToken({ email:usuario.email })};
      
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async login(loginUserDto: LoginUserDto){
    try {
      
      const { password,email} = loginUserDto

      const user= await this.usuarioRepository.findOne({
        where:{email},
        select:{email:true,password:true}
      });

      if(!user)
        throw new UnauthorizedException('Las credenciales no son válidads(email)')

      if(!bcrypt.compareSync(password,user.password))
        throw new UnauthorizedException('Las credencias no son válidas(password)')

      return {...user,token: this.getJwtToken({ email:user.email })};

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  private getJwtToken(payload: JwtPayload){
    const token= this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error:any):never{
    if(error.code==='EREQUEST')
    {
      throw new BadRequestException(error.driverError.message)
      console.log(error);
      throw new InternalServerErrorException('Please check server log')
    }
      throw new BadRequestException(error.response)
      console.log(error);
      throw new InternalServerErrorException('Please check server log')
    }

  

}
