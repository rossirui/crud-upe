import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  boasVindas(): string {
    return '<h1>Bem-vindo ao CRUD-UPE<h1>';
  }
}
