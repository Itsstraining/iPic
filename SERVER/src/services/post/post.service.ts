import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) { }

  async getAllPosts() {
    try {
      return await this.postModel.find();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getPostById(id: string) {
    try {
      const post = await this.postModel.findById(id);
      if (!post) {
        throw new HttpException('This post not exist', HttpStatus.BAD_REQUEST);
      }
      return post;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createPost(post: Post) {
    try {
      let createPost = new this.postModel(post);
      return await createPost.save();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePost(id: string, post: Post) {
    try {
      const updatePost = await this.postModel.findByIdAndUpdate(id, post, {
        new: true,
      });
      if (!updatePost) {
        throw new HttpException('Update Failure', HttpStatus.BAD_REQUEST);
      }
      return updatePost;
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deletePost(id: string) {
    return await this.postModel.findByIdAndDelete(id);
  }
}
