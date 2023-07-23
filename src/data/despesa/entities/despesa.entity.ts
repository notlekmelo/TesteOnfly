import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from '@common/data/base/base.entity';
import { UsuarioEntity } from '@data/usuario';

@Entity('Despesas')
export class DespesaEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'CodigoDespesa' })
  id: number;

  @Column({ type: 'varchar', name: 'Descricao', length: 191 })
  descricao: string;
  
  @Column({ type: 'money', name: 'Valor' })
  valor: number;
  
  @Column({ type: 'datetime', name: 'Data' })
  data: Date;
  
  @Column({ type: 'int', name: 'CodigoUsuario' })
  usuarioId: number;
  
  @CreateDateColumn({ type: 'datetime', name: 'InseridoEm' })
  createdAt: Date;
  
  @UpdateDateColumn({ type: 'datetime', name: 'ModificadoEm' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UsuarioEntity, (e) => e.id)
  @JoinColumn([{ name: 'CodigoUsuario', referencedColumnName: 'id' }])
  usuario: UsuarioEntity;
}
