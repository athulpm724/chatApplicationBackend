import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { createGroupDTO } from './dto/create-group.dto';

@ApiTags('Group')
@Controller('groups')
export class GroupsController {

    constructor(
        private groupService:GroupsService
    ){}

    @ApiBody({type:createGroupDTO})
    @Post()
    async createGroup(@Body()createGroupDTO:createGroupDTO){
        return await this.groupService.createGroup(createGroupDTO)
    }

    @Delete(':groupId')
    async deleteGroup(@Param('groupId')groupId:number){
        return await this.groupService.deleteGroup(groupId)
    }
}
