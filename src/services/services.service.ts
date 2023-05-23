import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private servicesRepository: Repository<Service>
  ) {}

  static notFoundError: string = 'Il servizio richiesto non è stato trovato';

  async create(createServiceDto: CreateServiceDto) {
    return (await this.servicesRepository.save(createServiceDto)).id;
  }

  async findAll() {
    return await this.servicesRepository.find({});
  }

  async findOne(id: number) {
    return await this.servicesRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    // eseguendo servicesRepository.update non viene controllato se l'entità esiste già, quindi lo facciamo «manualmente» prima
    let entityToRemove = await this.servicesRepository.findOneByOrFail({ id });
    if (!entityToRemove) {
      // Se entityToRemove è nullo allora vuol dire che l'elemento all'id specificato non esiste ancora
      throw new HttpException(
        ServicesService.notFoundError,
        HttpStatus.NOT_FOUND
      );
    }

    this.servicesRepository.update({ id }, updateServiceDto);
  }

  async remove(id: number) {
    // eseguendo servicesRepository.update non viene controllato se l'entità esiste già, quindi lo facciamo «manualmente» prima
    let entityToRemove = await this.servicesRepository.findOneByOrFail({ id });
    if (!entityToRemove) {
      // Se entityToRemove è nullo allora vuol dire che l'elemento all'id specificato non esiste ancora
      throw new HttpException(
        ServicesService.notFoundError,
        HttpStatus.NOT_FOUND
      );
    }

    this.servicesRepository.remove(
      await this.servicesRepository.findOneBy({ id })
    );
  }
}
