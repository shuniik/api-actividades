import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmpresaService {

  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>
  ){}
  async create(createEmpresaDto: CreateEmpresaDto) {
    try {
      const empresa =  this.empresaRepository.create(createEmpresaDto)  
      await this.empresaRepository.save(empresa)


      return {success:true,data:empresa}
      // return {createEmpresaDto}
    } catch (error) {
      console.error('Error al ejecutar el procedimiento almacenado:', error);
      this.handleDBExceptions(error);
    }

    
  }

  findAll() {
    return `This action returns all empresa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
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
