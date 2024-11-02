import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/entities/group.entity';
import { Repository } from 'typeorm';
import { createGroupDTO } from './dto/create-group.dto';
import { User } from 'src/entities/user.entity';
import { GroupMember } from 'src/entities/group-member.entity';

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
        const result=await this.groupRepo.delete({id:groupId})
        return result
    }

    // GROUP-MEMBER CRUD

    async addGroupMember(){

    }

    async removeGroupMember(){
        
    }
}
