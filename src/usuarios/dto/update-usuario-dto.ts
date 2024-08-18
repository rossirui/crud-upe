import { IsOptional, IsString, IsArray, ValidateNested } from 'class-Validator';
import { Type } from 'class-transformer';
import { UpdateFilhoDTO } from 'src/filho/dto/update-filho-dto';

export class UpdateUsuarioDto {

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  endereco?: string;

    
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFilhoDTO)
  filhos: UpdateFilhoDTO[];
  
}