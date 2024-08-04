import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';



@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  listarUsuarios() {
    const usuarios =  this.usuariosService.findAll();
    return usuarios;
  }

  @Get(':id')
  buscarUsuarioPorId(@Param('id') id: number) {
    const usuario = this.usuariosService.findOneById(id);
    return usuario;
  }

  @Post()
  criarUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Put(':id') /* atualização pelo id */
  atualizarUsuario(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id') // deleção pelo id
  async removerUsuario(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }

}