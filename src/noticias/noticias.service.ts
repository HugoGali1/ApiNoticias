import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoticiaDto } from './dto/noticias.dto/noticias.dto';
import {
  Noticia,
  Seccion,
} from './interfaces/noticias/noticias.interface';


@Injectable()
export class NoticiaService {
  constructor(@InjectModel('Noticia') private noticiaModel: Model<Noticia>) {}

  async addNoticia(noticiaDTO: NoticiaDto): Promise<any> {
    const noticia = new this.noticiaModel(noticiaDTO);
    return noticia.save();
  }

  async getNoticias(): Promise<Noticia[]> {
    return this.noticiaModel.find().exec();
  }

  async getNoticiaById(id: string): Promise<Noticia | null> {
    return this.noticiaModel.findById(id).exec();
  }

  async getNoticiaPorTituloAutor(texto: string): Promise<Noticia[]> {
    return this.noticiaModel
      .find({
        $or: [
          { titulo: { $regex: texto, $options: 'i' } },
          { autor: { $regex: texto, $options: 'i' } },
        ],
      })
      .exec();
  }

  async updateNoticia(idNoticia: string, noticiaDTO: NoticiaDto): Promise<any> {
    const updateNoticia = await this.noticiaModel
      .findByIdAndUpdate(idNoticia, { $set: noticiaDTO }, { new: true })
      .exec();
    if (!updateNoticia) {
      throw new NotFoundException({
        status: false,
        message: 'No se ha encontrado la noticia',
      });
    }
    return updateNoticia;
  }

  async deleteNoticia(idNoticia: string): Promise<any> {
    const deletedNoticia = await this.noticiaModel
      .findByIdAndDelete(idNoticia)
      .exec();
    if (!deletedNoticia) {
      throw new NotFoundException({
        status: false,
        message: 'No se ha encontrado la noticia',
      });
    }
    return deletedNoticia;
  }

  async getSecciones(): Promise<Seccion[]> {
    const secciones = await this.noticiaModel.distinct('seccion').exec();

    if (!secciones) {
      throw new NotFoundException({
        status: false,
        message: 'No se ha encontrado ninguna seccion',
      });
    }
    return secciones;
  }

  async buscarNoticia(texto: string): Promise<Noticia[]> {
    const noticia = await this.noticiaModel
      .find({
        $or: [
          { titulo: { $regex: texto, $options: 'i' } },
          { autor: { $regex: texto, $options: 'i' } },
        ],
      })
      .exec();

    if (!noticia) {
      throw new NotFoundException({
        status: false,
        message: 'No se ha encontrado ninguna noticia',
      });
    }
    return noticia;
  }

  async getNoticiasPorSeccion(nombreSeccion: string): Promise<Noticia[]> {
    const noticias = await this.noticiaModel
      .find({
        'seccion.nombre': nombreSeccion,
      })
      .exec();

    if (!noticias) {
      throw new NotFoundException({
        status: false,
        message: 'No se ha encontrado ninguna noticia para esta sección',
      });
    }
    return noticias;
  }
}
