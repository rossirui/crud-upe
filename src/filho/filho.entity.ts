import { Usuario } from 'src/usuarios/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Filho {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  idade: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.filhos, { onDelete : 'CASCADE'})
  usuario: Usuario;

}
