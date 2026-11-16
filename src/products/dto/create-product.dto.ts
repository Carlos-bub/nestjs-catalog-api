import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  ean: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  name: string;

  @IsInt()
  id_category: number;

  @IsInt()
  ins_user: number;

  @IsInt()
  upd_user: number;
}
