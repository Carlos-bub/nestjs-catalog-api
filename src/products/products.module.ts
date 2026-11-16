/**
 * Módulo responsável pela gestão dos produtos.
 * 
 * Este módulo encapsula o controlador e o serviço relacionados
 * aos produtos, além de fornecer a instância do `PrismaService`
 * para a manipulação do banco de dados.
 */
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
