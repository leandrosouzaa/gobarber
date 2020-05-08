import {
   Entity,
   Column,
   PrimaryGeneratedColumn,
   CreateDateColumn,
   UpdateDateColumn,
   Generated,
} from 'typeorm';

@Entity('users_tokens')
class UserToken {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Generated('uuid')
   @Column()
   token: string;

   @CreateDateColumn()
   created_at: Date;

   @Column()
   user_id: string;

   @UpdateDateColumn()
   updated_at: Date;
}

export default UserToken;
