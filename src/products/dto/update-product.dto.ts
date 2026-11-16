import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(13)
  ean?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  name?: string;

  @IsOptional()
  @IsInt()
  id_category?: number;

  @IsOptional()
  @IsInt()
  upd_user?: number;
}
