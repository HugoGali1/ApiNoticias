import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NoticiaService } from './noticias.service';
import { NoticiaDto } from './dto/noticias.dto/noticias.dto';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiaService: NoticiaService) {}

  @Post('agregar')
  async addNoticia(@Body() noticiaDto: NoticiaDto) {
    try {
      await this.noticiaService.addNoticia(noticiaDto);
      return {
        status: true,
        message: 'Noticia agregada con exito',
      }
    }catch (error:any) {
      throw new BadRequestException(
        {
          status:false,
          message: error.message,
        }
      )
    }
  }

  @Get('')
  async getNoticias(){
    try {
      const data=await this.noticiaService.getNoticias();
      return {
        status: true,
        message: data,
      }
    } catch (error: any) {
      throw new BadRequestException(
        {
          status:false,
          message: error.message,
        }
      )
    }
  } 
  
  @Put('update/:id')
  async updateNoticia(@Param('id') id: string, @Body() noticiaDto: NoticiaDto) {
    try {
      await this.noticiaService.updateNoticia(id, noticiaDto);
      return {
        status: true,
        message: 'Noticia actualizada con exito',
      }
    } catch (error: any) {
      throw new BadRequestException(
        {
          status:false,
          message: error.message,
        }
      )
    }
  }

  @Delete('delete/:id')
  async deleteNoticia(@Param('id') id: string) {
    try {
      await this.noticiaService.deleteNoticia(id);
      return {
        status: true,
        message: 'Noticia eliminada con exito',
      }
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(
        {
          status:false,
          message: e.message,
        }
      );
    }
  }

  @Get('Noticia/:id')
  async getNoticia(@Param('id') id: string) {
    try {
      const data = await this.noticiaService.getNoticiaById(id);
      return {
        status: true,
        noticia: data,
      }
    }catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new  BadRequestException()
    }
  }

  @Get('buscarNoticiaToAutor/:tituloAutor')
  async getNoticiaPorTituloAutor(@Param('tituloAutor') tituloAutor: string) {
    try {
      const data= await this.noticiaService.getNoticiaPorTituloAutor(tituloAutor);
      return {
        status: true,
        noticia: data,
      }
    }catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new  BadRequestException()
    }
  }
  @Get('secciones')
  async getSecciones(){
    try {
      const data=await this.noticiaService.getSecciones();
      return {
        status: true,
        noticia: data,
      }
    }catch (error: any) {
      throw new BadRequestException(
        {
          status:false,
          message: error.message,
        }
      )
    }
  }
  @Get('noticiasPorSeccion/:nombre')
  async getNoticiasPorSeccion(@Param('nombre') nombre: string) {
    try {
      const data=await this.noticiaService.getNoticiasPorSeccion(nombre);
      return {
        status: true,
        noticia: data,
      }
    }catch (error: any) {
      throw new BadRequestException(
        {
          status:false,
          message: error.message,
        }
      )
    }
  }
}
