// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './usuario.entity';
import { UpdateUsuarioDto } from './dto/update-usuario-dto';
import { CreateUsuarioDto } from './dto/create-usuario-dto';
import { Filho } from 'src/filho/filho.entity';
import { CreateFilhoDTO } from 'src/filho/dto/create-filho-dto';


@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Filho)
    private readonly filhoRepository: Repository<Filho>,
  ) { }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({ relations: ['filhos'] });
  }

  async findOneById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['filhos']
    });
    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ['filhos'] });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuario);

  }

  //adicionar filho a um usuário
  async addFilho(id: number, creatFilhoDto: CreateFilhoDTO): Promise<Filho> {
    const usuario = await this.usuarioRepository.findOne({ where: { id }, relations: ['filhos'] });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const filho = this.filhoRepository.create(creatFilhoDto);
    filho.usuario = usuario;
    return this.filhoRepository.save(filho);
  }

  async updateFilho(usuarioId, filhoId, updateFilhoDTO) {
    const filho = await this.filhoRepository.findOne({ where: { id: filhoId, usuario: { id: usuarioId } } });
    if (!filho) {
      throw new Error("Filho não encontrado")
    }

    Object.assign(filho, updateFilhoDTO);
    return this.filhoRepository.save(filho);
  }


  async removeFilho(usuarioId: number, filhoId: number): Promise<void> {
    const filho = await this.filhoRepository.findOne({ where: { id: filhoId, usuario: { id: usuarioId } } });

    if (!filho) {
      throw new Error('Filho não encontrado');
    }

    await this.filhoRepository.remove(filho);
  }


  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
