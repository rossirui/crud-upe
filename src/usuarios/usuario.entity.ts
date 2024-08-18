import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Filho } from 'src/filho/filho.entity';

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable : true})
  email?: string;

  @Column()
  endereco: string;

  @OneToMany(() => Filho, (filho) => filho.usuario, {cascade: true})
  filhos: Filho[];

}
