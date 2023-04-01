import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { Map } from './entities/map.entity';
import { writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';

@Injectable()
export class MapService {
  constructor() {
    this.data = [];
    try {
      this.data = JSON.parse(readFileSync('./data.json', { encoding: 'utf8' }));
    } catch (err) {
      if (err.code == 'ENOENT') {
        console.log(
          'Il file "data.json" non è stato trovato, verrà creato alla radice del progetto'
        );
        try {
          writeFile('./data.json', '[]');
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  data: Map[];

  static notFoundError: string = 'La mappa richiesta non è stata trovata';

  async create(createMapDto: CreateMapDto) {
    this.data.push(new Map(createMapDto.name));
    this.writeSaveFile(this.data);
  }

  async findAll(): Promise<Map[]> {
    return this.data;
  }

  async findOne(id: string) {
    let map = (await this.findAll()).find((map: Map) => {
      return map.id == id;
    });
    if (!map) {
      throw new HttpException(MapService.notFoundError, HttpStatus.NOT_FOUND);
    }
    return map;
  }

  async update(id: string, updateMapDto: UpdateMapDto) {
    let index = (await this.findAll()).findIndex((map: Map) => {
      return map.id == id;
    });
    if (index != -1) {
      this.data[index] = { ...this.data[index], ...updateMapDto }; // "Unisco" i due oggetti, vedi "JS Object Spread"
      this.writeSaveFile(this.data);
      return;
    }
    throw new HttpException(MapService.notFoundError, HttpStatus.NOT_FOUND);
  }

  async replace(id: string, updateMapDto: UpdateMapDto) {
    let index = (await this.findAll()).findIndex((map: Map) => {
      return map.id == id;
    });
    if (index != -1) {
      this.data[index] = new Map(updateMapDto.name);
      this.writeSaveFile(this.data);
      return;
    }
    throw new HttpException(MapService.notFoundError, HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    let index = (await this.findAll()).findIndex((map: Map) => {
      return map.id == id;
    });
    if (index != -1) {
      this.data.splice(index, 1);
      this.writeSaveFile(this.data);
      return;
    }
    throw new HttpException(MapService.notFoundError, HttpStatus.NOT_FOUND);
  }

  writeSaveFile(data: Map[]) {
    try {
      writeFile('./data.json', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }
}
