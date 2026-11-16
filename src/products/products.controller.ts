/**
 * Controlador responsável pela gestão dos produtos.
 * 
 * Este controlador lida com as operações CRUD (Criar, Ler, 
 * Atualizar e Deletar) relacionadas aos produtos. Ele define 
 * as rotas da API para a manipulação dos dados dos produtos 
 * utilizando o `ProductsService`.
 */

// products/products.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { JwtAuthGuard } from '../users/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.remove(id);
  }
}
