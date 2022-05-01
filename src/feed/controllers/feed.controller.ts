import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FeedPost } from '../models/postinterface';
import { FeedService } from '../services/feed.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/controllers/models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService ) {}

    @Roles(Role.ADMIN, Role.USER)
    @UseGuards(JwtGuard, RolesGuard)
    @Post()
    create(@Body () feedPost: FeedPost, @Request() req): Observable<FeedPost> {
        return this.feedService.createPost(req.user, feedPost);
    }

    @Get()
    findAll(): Observable<FeedPost[]> {
        return this.feedService.findAllPosts();
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() feedPost: FeedPost
    ): Observable<UpdateResult> {
        return this.feedService.updatePost(id, feedPost)
    }

    @Delete(':id')
    delete(@Param('id') id: number,): Observable<DeleteResult> {
        return this.feedService.deletePost(id);
    }

}
