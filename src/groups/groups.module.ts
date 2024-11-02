import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/entities/group.entity';
import { User } from 'src/entities/user.entity';
import { GroupMember } from 'src/entities/group-member.entity';
import { GroupsMemberController } from './group-member.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Group,
      User,
      GroupMember
    ])
  ],
  providers: [GroupsService],
  controllers: [GroupsController,GroupsMemberController]
})
export class GroupsModule {}
