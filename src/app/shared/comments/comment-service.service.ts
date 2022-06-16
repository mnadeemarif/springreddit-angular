import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { CommentPayload } from './comment.request.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>(Constants.BASE_URL + '/comments/by-user/' + name);
  }
  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(Constants.BASE_URL + '/comments/by-post/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(Constants.BASE_URL + '/comments/', commentPayload);
  }
}
