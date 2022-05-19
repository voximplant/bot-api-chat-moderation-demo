import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';

/*
 * Description of the 'users' database entity
 *
 * Used for normal chat funcioning. The minimum set of fields is 'user_id' and 'user_name'
 */
@Entity('users')
export class UserEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'user_id' })
  userId: number;

  @Column({ type: 'text', name: 'user_name' })
  userName: string = '';

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;
}
