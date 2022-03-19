import { FeedPost } from './../models/post.interface';
import { FeedPostEntity } from './../models/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}
  // createPost(feedPost: FeedPost): Observable<FeedPost>{
  //     return  from(this.feedPostRepository.save(feedPost))
  // }
  async createPost(feedPost: FeedPost): Promise<FeedPost> {
    return await this.feedPostRepository.save(feedPost);
  }
  async findAllPosts(): Promise<FeedPost[]> {
    return await this.feedPostRepository.find();
  }
  async findPosts(take: number = 10, skip: number = 0): Promise<FeedPost[]> {
    try {
      const posts = await this.feedPostRepository.findAndCount({ take, skip });
      return  <FeedPost[]>posts[0];
    } catch (error) {
        console.log(error)
    }
  }
  async updatePost(feedPost: FeedPost): Promise<UpdateResult> {
    return await this.feedPostRepository.update(feedPost.id, feedPost);
  }
  async deletePost(id: FeedPost['id']): Promise<DeleteResult> {
    return await this.feedPostRepository.delete(id);
  }
}
