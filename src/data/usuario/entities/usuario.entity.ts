import { BaseEntity } from '@common/data/base/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('Usuarios')
export class UsuarioEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'CodigoUsuario',
  })
  id: number;

  @Column({ type: 'varchar', name: 'Nome', length: 100 })
  nome: string;

  @Column({ type: 'varchar', name: 'CPF', length: 12 })
  cpf: string;

  @Column({ type: 'varchar', name: 'Senha', length: 255 })
  senha: string;

  @Column({ type: 'varchar', name: 'Login', length: 30 })
  login: string;
  
  @Column({ type: 'varchar', name: 'Email', length: 100 })
  email: string;

  @Column({ type: 'char', name: 'PrimeiroAcesso', length: 1 })
  primeiroAcesso: 'S' | 'N';

  @Column({ name: 'RefreshToken' })
  refreshToken?: string;

  @CreateDateColumn({ name: 'InseridoEm' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModificadoEm' })
  updatedAt: Date;

  //RELATIONS
}
