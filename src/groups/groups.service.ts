import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/entities/group.entity';
import { Repository } from 'typeorm';
import { createGroupDTO } from './dto/create-group.dto';
import { User } from 'src/entities/user.entity';
import { GroupMember } from 'src/entities/group-member.entity';
import { createGroupMemberDTO } from './dto/create-groupMember.dto';
import { deleteGroupMemberDTO } from './dto/delete-groupMember.dto';

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(Group)private groupRepo:Repository<Group>,
        @InjectRepository(User)private userRepo:Repository<User>,
        @InjectRepository(GroupMember)private groupMemberRepo:Repository<GroupMember>

    ){}

    // GROUP CRUD

    async createGroup(createGroupDTO:createGroupDTO){

        const user=await this.userRepo.findOneBy({id:createGroupDTO.createdBy})
        
        if(!user){
            throw new HttpException('Invalid User',404)
        }

        const group=await this.groupRepo.findOneBy({createdBy:{id:createGroupDTO.createdBy},groupName:createGroupDTO.groupName})
        if(group){
            throw new HttpException('Group Name already exists for this user',404)
        }

        const newGroup= await this.groupRepo.create({
            groupName:createGroupDTO.groupName,
            createdBy:user
        })
        return await this.groupRepo.save(newGroup)
        
    }

    async deleteGroup(groupId:number){
        const group=await this.groupRepo.findOneBy({id:groupId})
        if(!group){
            throw new HttpException('invalid group id',404)
        }
        const result=await this.groupRepo.delete({id:groupId})
        return result
    }

    // GROUP-MEMBER CRUD

    async addGroupMember(createGroupMemberDTO:createGroupMemberDTO){
        const group=await this.groupRepo.findOneBy({id:createGroupMemberDTO.groupId})
        if(!group){
            throw new HttpException('invalid group id',404)
        }
        const user=await this.userRepo.findOneBy({id:createGroupMemberDTO.userId})
        
        if(!user){
            throw new HttpException('Invalid User',404)
        }

        const groupMember=await this.groupMemberRepo.findOneBy({groupId:{id:createGroupMemberDTO.groupId},userId:{id:createGroupMemberDTO.userId}})
        
        if(groupMember && groupMember.isMember==true){
            throw new HttpException('user already member of the group',404)
        }

        const newGroupMember=await this.groupMemberRepo.create({
            groupId:group,
            userId:user
        })

        return await this.groupMemberRepo.save(newGroupMember)
        
    }

    async removeGroupMember(deleteGroupMemberDTO:deleteGroupMemberDTO){
        const group=await this.groupRepo.findOneBy({id:deleteGroupMemberDTO.groupId})
        if(!group){
            throw new HttpException('invalid group id',404)
        }
        const user=await this.userRepo.findOneBy({id:deleteGroupMemberDTO.userId})
        
        if(!user){
            throw new HttpException('Invalid User',404)
        }

        const groupMember=await this.groupMemberRepo.findOneBy({groupId:{id:deleteGroupMemberDTO.groupId},userId:{id:deleteGroupMemberDTO.userId}})

        if(groupMember.isMember==false){
            throw new HttpException('user not a member of the group',404)
        }

        return await this.groupMemberRepo.update(groupMember.id,{isMember:false})
    }
}
