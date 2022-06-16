import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from './constants';
import { PostModel } from './models/post.model';
import { CreatePostPayload } from './subreddit/create-subreddit/create.post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.httpClient.post(Constants.BASE_URL + '/posts/', postPayload);
  }

  constructor(private httpClient : HttpClient) { }

  getAllPosts() : Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(Constants.BASE_URL + '/posts/');
  }

  getPost(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(Constants.BASE_URL + '/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.httpClient.get<PostModel[]>(Constants.BASE_URL + '/posts/by-user/' + name);
  }

}
