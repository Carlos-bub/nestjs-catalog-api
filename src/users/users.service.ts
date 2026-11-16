import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { handlePrismaError } from '../prisma/prisma-error.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const USER_PUBLIC_SELECT = {
  id: true,
  username: true,
  email: true,
  last_password_change: true,
  ins_date: true,
  upd_date: true,
  ins_user: true,
  upd_user: true,
  type: true,
  password_validity: true,
  password_expires: true,
  is_active: true,
} as const;

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.prisma.appUser.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException(
        'E-mail e/ou senha incorretos, verifique e tente novamente',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'E-mail e/ou senha incorretos, verifique e tente novamente',
      );
    }

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    try {
      return await this.prisma.appUser.create({
        data: { ...createUserDto, password: hashedPassword },
        select: USER_PUBLIC_SELECT,
      });
    } catch (error) {
      handlePrismaError(error, 'Usuário');
    }
  }

  async findOne(id: number) {
    const user = await this.prisma.appUser.findUnique({
      where: { id },
      select: USER_PUBLIC_SELECT,
    });
    if (!user) {
      throw new NotFoundException(`Usuário #${id} não encontrado.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.appUser.update({
        where: { id },
        data: { ...updateUserDto, upd_date: new Date() },
        select: USER_PUBLIC_SELECT,
      });
    } catch (error) {
      handlePrismaError(error, 'Usuário');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.appUser.delete({
        where: { id },
        select: USER_PUBLIC_SELECT,
      });
    } catch (error) {
      handlePrismaError(error, 'Usuário');
    }
  }

  async findAll() {
    return this.prisma.appUser.findMany({ select: USER_PUBLIC_SELECT });
  }
}
