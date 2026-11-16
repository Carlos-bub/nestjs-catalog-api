import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

/**
 * Converte erros conhecidos do Prisma (P2002, P2003, P2025) em exceções HTTP do NestJS.
 */
export function handlePrismaError(error: unknown, entityName: string): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      throw new ConflictException(`${entityName} já existe com esses dados únicos.`);
    }
    if (error.code === 'P2003') {
      throw new BadRequestException(`Referência inválida ao salvar ${entityName}.`);
    }
    if (error.code === 'P2025') {
      throw new NotFoundException(`${entityName} não encontrado.`);
    }
  }
  throw error;
}
