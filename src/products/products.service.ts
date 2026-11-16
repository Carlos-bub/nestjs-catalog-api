/**
 * Serviço de gerenciamento de produtos.
 *
 * Esta classe é responsável por interagir com o banco de dados
 * através do Prisma para realizar operações relacionadas a produtos.
 * 
 * Métodos disponíveis:
 * - create: Cria um novo produto.
 * - findAll: Retorna todos os produtos.
 * - findOne: Retorna um produto específico pelo ID.
 * - update: Atualiza um produto existente.
 * - remove: Remove um produto pelo ID.
 */

// products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { handlePrismaError } from '../prisma/prisma-error.util';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({ data });
    } catch (error) {
      handlePrismaError(error, 'Produto');
    }
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Produto #${id} não encontrado.`);
    }
    return product;
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: { ...data, upd_date: new Date() },
      });
    } catch (error) {
      handlePrismaError(error, 'Produto');
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(error, 'Produto');
    }
  }
}
