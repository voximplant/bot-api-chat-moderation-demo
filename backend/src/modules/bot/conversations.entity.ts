import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, OneToMany } from 'typeorm';
import { ConversationPairsEntity } from './conversation-pairs.entity';

/*
 * Description of the 'conversations' database entity
 *
 * Used to store chat rooms. The 'owner' field contains the owner's 'user_id' and the 'conversation_uuid' – the room identification number
 */
@Entity('conversations')
export class ConversationsEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'owner' })
  owner: number;

  @Column({ type: 'text', name: 'conversation_uuid' })
  conversationUUID: string = '';

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @OneToMany(() => ConversationPairsEntity, (conversations) => conversations.id)
  conversations: ConversationsEntity;
}
