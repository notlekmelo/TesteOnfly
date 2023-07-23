import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

/**
 * Includes columns: InseridoEm, InseridoPor
 */
export abstract class BaseEntity {
  /**
   * Primary key (strategy must be override)
   */
  id: number;

  @CreateDateColumn({ name: 'InseridoEm' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'ModificadoEm' })
  updatedAt: Date;
}