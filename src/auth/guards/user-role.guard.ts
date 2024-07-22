import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';


@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[]= this.reflector.get(META_ROLES, context.getHandler())

    
    if (!validRoles) return true
    if (validRoles.length === 0)  return true
    
    const  req= context.switchToHttp().getRequest()
    //console.log('prueba:',context.switchToHttp())
    const user = req.user
    



    if(!user)
      throw new BadRequestException('Usuario no encontrado')

    // for( const role of user.role){

    //   if(validRoles.includes(role)){
    //     return true
    //   }
    // }


      if(validRoles.includes(user.role)){
        return true
      }
    
    
    throw new ForbiddenException(
      `El usuario: [${user.nombre_completo}] no tiene ninguno de los siguientes roles: [${validRoles}]`
    )

    
    return true;
  }
}
