import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';



@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  async listarUsuarios() {
    const usuarios = await this.usuariosService.findAll();
    console.log('Usuários:');                                   //
    usuarios.forEach(usuario => {                               // COlocado apenas para testar
      console.log(`ID: ${usuario.id}, Nome: ${usuario.nome}`);  //
    });
    return usuarios;
  }

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Put(':id') /* atualização pelo id */
  async update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id') // deleção pelo id5
  async remove(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }

}