/**
 * Serviço responsável pela lógica de negócios relacionada às categorias.
 * 
 * O `CategoriesService` fornece métodos para criar, recuperar, atualizar e 
 * remover categorias no banco de dados. Ele utiliza o `PrismaService` 
 * para interagir com a camada de persistência de dados.
 */

// categories/categories.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { handlePrismaError } from '../prisma/prisma-error.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data,
      });
    } catch (error) {
      handlePrismaError(error, 'Categoria');
    }
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Categoria #${id} não encontrada.`);
    }
    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data,
      });
    } catch (error) {
      handlePrismaError(error, 'Categoria');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error, 'Categoria');
    }
  }
}
