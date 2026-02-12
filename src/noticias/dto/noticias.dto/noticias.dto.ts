import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class SeccionDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  iconoWeb: string;
  @IsString()
  @IsNotEmpty()
  iconoIonic: string;
}

export class NoticiaDto {
  @IsArray()
  @IsString({ each: true })
  imagenes: string[];

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  subtitulo: string;

  @ValidateNested()
  @Type(() => SeccionDto)
  @IsNotEmpty()
  seccion: SeccionDto;

  @IsString()
  @IsNotEmpty()
  autor: string;

  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  contenido: string;
}