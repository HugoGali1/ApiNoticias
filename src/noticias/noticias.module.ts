import { Module } from '@nestjs/common';
import { NoticiasController } from './noticias.controller';
import { NoticiasService } from './noticias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticiasSchema } from './schema/noticias.schema/noticias.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Noticias',
        schema: NoticiasSchema,
        collection: 'noticias2526',
      },
    ]),
  ],
  controllers: [NoticiasController],
  providers: [NoticiasService],
})
export class NoticiasModule {}
