import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';

/*
 * Description of the 'logs' database entity
 *
 * Used to log moderated messages
 */
@Entity('logs')
export class LogsEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'blocked_content' })
  blockedContent: string = '';

  @Column({ type: 'text', name: 'conversation_uuid' })
  conversationUUID: string;

  @Column({ type: 'text', name: 'original_text' })
  originalText: string;

  @Column({ type: 'integer', name: 'user_id' })
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
