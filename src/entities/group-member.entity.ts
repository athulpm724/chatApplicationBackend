import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { User } from './user.entity';
import { Group } from './group.entity';
  
  @Entity()
  export class GroupMember {

    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(()=>Group)
    groupId: Group;
    
    @ManyToOne(()=>User)
    userId:User

    @Column({default:true})
    isMember:Boolean

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
  
}
  