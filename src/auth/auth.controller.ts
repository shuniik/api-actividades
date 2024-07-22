import { Controller, Post, Body, Get, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateDtoUser,LoginUserDto } from './dto/';
import { GetUser, RawHeaders } from './decorators/index';
import { Usuarios } from './entities/user.entity';

import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';




@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registrar')
  create(@Body() createAuthDto: CreateDtoUser) {
    
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    // @Req() request: Express.Request
    @GetUser() usuario: Usuarios,
    @RawHeaders() rawHeaders:string[]
  ){
    // console.log({user: request.user});
    console.log(usuario);
    return{ok:true,
      messge:"Holamundo private",
      usuario,
      rawHeaders
    }
  }
  // @SetMetadata('roles',['user'])
  
  @Get('private2')
  @Auth(ValidRoles.user,ValidRoles.superUser)
  privateReoute2(
    @GetUser() usuario:Usuarios
  ){

    return {
      ok:true,
      usuario
    }
  }

}
