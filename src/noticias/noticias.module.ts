import { Module } from '@nestjs/common';
import { NoticiasController } from './noticias.controller';
import { NoticiaService } from './noticias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticiasSchema } from './schema/noticias.schema/noticias.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Noticia',
        schema: NoticiasSchema,
        collection: 'noticias2526',
      },
    ]),
  ],
  controllers: [NoticiasController],
  providers: [NoticiaService],
})
export class NoticiasModule {}
