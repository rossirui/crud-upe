import { IsInt, IsString }from 'class-validator'

export class UpdateFilhoDTO {

    @IsString()
    nome: string;

    @IsInt()
    idade: number;
}