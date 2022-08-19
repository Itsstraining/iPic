import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostService } from 'src/services/post/post.service';
import { UserService } from 'src/services/user/user.service';
import * as Schema from 'src/schemas/post.schema';
import { User } from 'src/models/user.model';

@Controller('post')
export class PostController {

    constructor(
        private PostService: PostService,
        private UserService: UserService
    ) { }

    @Get('/all')
    public async testPost() {
        return await this.PostService.getAllPosts();
    }

    @Get('/')
    public async getPostById(@Query(`id`) id: string) {
        return await this.PostService.getPostById(id);
    }

    @Post('/add')
    public async createPost(@Body() post: Schema.Post, @Req() req: any) {

        let payload = req.payload;
        let _user: User;
        // let _user = await this.UserService.findUserByUid(payload.uid);

        if (!_user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }

        post.authorId = _user._id;
        console.log(post)
        // return await this.PostService.createPost(post);
    }

    @Put('/update')
    public async updatePost(@Query(`id`) id: string, @Body() post: Schema.Post) {
        return await this.PostService.updatePost(id, post);
    }

    @Delete('/delete')
    public async deletePost(@Query(`id`) id: string) {
        return await this.PostService.deletePost(id);
    }
}
