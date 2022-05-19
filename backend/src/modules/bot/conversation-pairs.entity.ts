import { Entity, PrimaryGeneratedColumn, Index, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ConversationsEntity } from './conversations.entity';

/*
 * Description of the 'conversation-pairs' database entity
 *
 * Used to associate rooms and users. For a chat implementation with individual rooms, 
 * the 'conversation_first' and 'conversation_second' have different room id in the 'conversations' table. For a common room - the same id
 */
@Entity('conversation-pairs')
export class ConversationPairsEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @ManyToOne(() => ConversationsEntity)
  @JoinColumn({ name: 'conversation_first' })
  conversationFirst: ConversationsEntity;

  @ManyToOne(() => ConversationsEntity)
  @JoinColumn({ name: 'conversation_second' })
  conversationSecond: ConversationsEntity;
}
