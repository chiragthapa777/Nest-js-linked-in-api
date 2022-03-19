import { JwtGuard } from './../../auth/guards/jwt.guard';
import { FeedPost } from './../models/post.interface';
import { FeedService } from '../services/feed.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

@UseGuards(JwtGuard)
@Controller('feed')
export class FeedController {
    constructor(private feedService:FeedService){}

    @Post()
    createPost(@Body() post: FeedPost,@Req() req:Request){
        console.log(req.user)
        post.author=req.user
        return this.feedService.createPost(post)
    }

    @Get()
    findAll(@Req() req:Request) :Promise<FeedPost[]>{
        return this.feedService.findAllPosts()
    }

    @Get("onlyuserpost")
    findUserPost(@Req() req:Request) :Promise<FeedPost[]>{
        return this.feedService.findOnlyUserPosts(req.user)
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
