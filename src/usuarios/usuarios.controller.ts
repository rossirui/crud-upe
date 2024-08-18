import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

import { CreateUsuarioDto } from './dto/create-usuario-dto';
import { UpdateUsuarioDto } from './dto/update-usuario-dto';
import { CreateFilhoDTO } from 'src/filho/dto/create-filho-dto';
import { UpdateFilhoDTO } from 'src/filho/dto/update-filho-dto';



@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Get()
  listarUsuarios() {
    const usuarios = this.usuariosService.findAll();
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

  @Post(':id/filhos')
  adicionarFilho(@Param('id') id: number, @Body() createFilhoDTO: CreateFilhoDTO) {
    return this.usuariosService.addFilho(id, createFilhoDTO);
  }

  @Put(':id') /* atualização pelo id */
  atualizarUsuario(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Put(':usuarioId/filhos/:filhoId') //atualizar filho
  atualizarFilho(
    @Param('usuarioId') usuarioId: number,
    @Param('filhoId') filhoId: number,
    @Body() updateFilhoDTO: UpdateFilhoDTO
  ) {
    return this.usuariosService.updateFilho(usuarioId, filhoId, updateFilhoDTO);
  }


  @Delete(':id') // deleção pelo id
  async removerUsuario(@Param('id') id: number) {
    return this.usuariosService.remove(id);
  }

}