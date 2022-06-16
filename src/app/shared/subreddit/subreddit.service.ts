import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { SubredditModel } from '../models/subreddt.model';
import { SubredditResponse } from './subreddit.response';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  constructor(private httpClient : HttpClient) { }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.httpClient.post<SubredditModel>(Constants.BASE_URL + '/subreddit',subredditModel);
  }
  
  getAllSubreddits() : Observable<Array<SubredditResponse>>{
    return this.httpClient.get<Array<SubredditResponse>>(Constants.BASE_URL + '/subreddit');
  }
}
