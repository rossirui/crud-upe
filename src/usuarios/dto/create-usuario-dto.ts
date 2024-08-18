import { IsOptional, IsString, IsArray, ValidateNested } from 'class-Validator';
import { Type } from 'class-transformer';

import { CreateFilhoDTO } from 'src/filho/dto/create-filho-dto';

export class CreateUsuarioDto {

  @IsString()
  nome: string;

  @IsOptional()
  email?: string;

  @IsString()
  endereco: string;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFilhoDTO)
  filhos: CreateFilhoDTO[];
}


