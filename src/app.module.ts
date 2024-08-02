import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Usuario } from './usuarios/usuario.entity'; // entidade usuario
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'crud-upe',
      entities: [Usuario], // 
      synchronize: true, // criando as tabelas automaticamente (não usar em produção)
    }),
    TypeOrmModule.forFeature([Usuario]),
  ],
  controllers: [AppController, UsuariosController],
  providers: [AppService, UsuariosService],
})
export class AppModule { }
