import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { v4 as uuid} from 'uuid'

@Injectable()
export class EmpresaService {

  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>
  ){}
  async create(createEmpresaDto: CreateEmpresaDto) {
  
    const id= uuid()
    try {
      const empresa = new Empresa()
      empresa.id_empresa=id,
      empresa.empresa=createEmpresaDto.empresa
      await this.empresaRepository.save(empresa)


      return {success:true,data:empresa}

    } catch (error) {
      console.error('Error al ejecutar el procedimiento almacenado:', error);
      this.handleDBExceptions(error);
    }

    
  }

  async findAll() {
    try {
      const empresas = await this.empresaRepository.find(); // Consulta para encontrar todas las empresas

      return empresas; // Devuelve el arreglo de empresas encontradas
     
    } catch (error) {
      console.error('Error al buscar empresas:', error);
     throw new BadRequestException(error)// Re-lanza el error para que sea manejado en un nivel superior
    }
  }
  

  async findOne(id: string) {
    const empresa= await  this.empresaRepository.findOneBy({id_empresa:id})

    if(!empresa)
      throw new NotFoundException(`La empresa con el id ${id} no fue encontrado` )
    return empresa
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return updateEmpresaDto
  }

 async remove(id: string) {
    const empresa= await this.findOne(id);

    await this.empresaRepository.remove(empresa)
    return {success:true,data:empresa}
  }

  handleDBExceptions(error: any)
  {
    if(error.code === 'EPARAM'){
      throw new BadRequestException(error)
    }
else if(error.code==='EREQUEST') {
  throw new BadRequestException(error.driverError.message)
    }
    else  
    {
      throw new BadRequestException(error)
    }

  }
}
