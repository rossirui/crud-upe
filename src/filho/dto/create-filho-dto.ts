import { IsInt, IsString }from 'class-validator'

export class CreateFilhoDTO {

    @IsString()
    nome: string;

    @IsInt()
    idade: number;
}