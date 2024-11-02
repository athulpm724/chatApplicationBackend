import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { createGroupDTO } from './dto/create-group.dto';
import { createGroupMemberDTO } from './dto/create-groupMember.dto';
import { deleteGroupMemberDTO } from './dto/delete-groupMember.dto';

@ApiTags('Group-Member')
@Controller('group-members')
export class GroupsMemberController {

    constructor(
        private groupService:GroupsService
    ){}

    @ApiBody({type:createGroupMemberDTO})
    @Post('add')
    async createGroupMember(@Body()createGroupMemberDTO:createGroupMemberDTO){
        return await this.groupService.addGroupMember(createGroupMemberDTO)
    }

    @Post('remove')
    async deleteGroup(@Body()deleteGroupMemberDTO:deleteGroupMemberDTO){
        return await this.groupService.removeGroupMember(deleteGroupMemberDTO)
    }
}
