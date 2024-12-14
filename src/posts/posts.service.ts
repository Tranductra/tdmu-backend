import { Injectable } from '@nestjs/common';
import { firestore } from '../firebase.config';
import { Post } from './dto/post.dto';
import moment from 'moment';

@Injectable()
export class PostService {
  private postCollection = firestore.collection('posts');
  collection: any;

  // Get all posts
  async getAllPosts(): Promise<{ total: number; posts: Post[] }> {
    const snapshot = await this.postCollection.get();
    const posts = snapshot.docs.map((doc) => doc.data() as Post);
    const total = posts.length; // Total count of posts
    return { total, posts };
  }

  // Get post by ID with error message if not found
  async getPostById(postId: string): Promise<Post | { message: string }> {
    const postDoc = await this.postCollection.doc(postId).get();
    if (!postDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    return postDoc.data() as Post;
  }
  // Get posts by pagination (limit and offset)
  async getPostsByPagination(
    limit: number,
    lastVisiblePostId?: string,
  ): Promise<Post[]> {
    let query = this.postCollection.orderBy('dataPublished').limit(limit);

    if (lastVisiblePostId) {
      const lastPost = await this.postCollection.doc(lastVisiblePostId).get();
      query = query.startAfter(lastPost);
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => doc.data() as Post);
  }

  // Create a new post
  async createPost(post: Post): Promise<Post> {
    const newPostRef = await this.postCollection.add(post);

    const postId = newPostRef.id;
    await this.postCollection.doc(postId).update({ postId });

    return { ...post, postId } as Post;
  }

  // Update an existing post
  async updatePost(
    postId: string,
    post: Partial<Post>,
  ): Promise<{ success?: boolean; updatedPost?: Post; message?: string }> {
    const postDoc = await this.postCollection.doc(postId).get();

    // Kiểm tra nếu bài viết tồn tại
    if (!postDoc.exists) {
      return { message: 'Post not found' };
    }

    // Cập nhật bài viết
    try {
      await this.postCollection.doc(postId).update(post);

      // Lấy lại thông tin bài viết sau khi cập nhật
      const updatedPostDoc = await this.postCollection.doc(postId).get();
      const updatedPost = updatedPostDoc.data() as Post;

      return { updatedPost };
    } catch (error) {
      return { message: `Failed to update post: ${error.message}` };
    }
  }

  // Delete post by ID with error message if not found
  async deletePost(postId: string): Promise<{ message: string }> {
    const postDoc = await this.postCollection.doc(postId).get();
    if (!postDoc.exists) {
      return { message: 'Không tìm thấy Id' };
    }
    await this.postCollection.doc(postId).delete();
    return { message: 'Bài viết đã được xóa thành công' };
  }
}
