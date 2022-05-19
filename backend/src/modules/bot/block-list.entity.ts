import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/*
 * Description of the 'block-list' database entity
 *
 * In this demo we moderate messages if they fully match the words from the database. 
 * We can just store the 'word' field, 'id' and 'createdAt' are technical fields 
 */
@Entity('block-list')
export class BlockListEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  word: string = '';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
