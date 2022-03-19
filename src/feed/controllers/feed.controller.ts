import { FeedPost } from './../models/post.interface';
import { FeedService } from '../services/feed.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('feed')
export class FeedController {
    constructor(private feedService:FeedService){}
    @Post()
    create(@Body() post: FeedPost){
        return this.feedService.createPost(post)
    }
    @Get()
    findAll() :Promise<FeedPost[]>{
        return this.feedService.findAllPosts()
    }
    @Get("filter")
    findSelected(@Query('take') take: number=1,@Query('skip') skip: number=1) :Promise<FeedPost[]>{
        take= take>20?20:take
        return this.feedService.findPosts(take, skip)
    }
    @Put()
    update(@Body() updatePost: FeedPost){
        return this.feedService.updatePost(updatePost)
    }
    @Delete(":id")
    delete(@Param() id : FeedPost["id"])
    {   
        return this.feedService.deletePost(id)
    }

}
