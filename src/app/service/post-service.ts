// import { inject, Injectable } from '@angular/core';
// import { Post } from '../model/Post';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostService {
//   posts:Array< Post>  = new Array<Post>();
//     BASEURL: String = "http://localhost:7006/api/Posts"

//   http =inject(HttpClient) 

//  constructor(){
//     this.http.get<Array<Post>>(this.BASEURL+"/Get" ).subscribe( res => this.posts = res)
//   }
// loadedData():Observable<Array<Post>>{
//   return this.http.get<Array<Post>>(this.BASEURL+"/Get")
// }
//   confirmPost(post: Post):Observable<Post> {
//     post.isConfirmed = true;
//    return this.http.post<Post>(this.BASEURL + "/update", post)
// }
// getUnconfirmedPosts(): Observable<Array<Post>> {
//   return this.http.get<Array<Post>>(this.BASEURL +"/Get");
// }
// addPost(p:Post):Observable<boolean>{
//   return this.http.post<boolean>(this.BASEURL+"/AddPost", p)
// }
// deletePost(p:Post): Observable<boolean>{
//   return this.http.post<boolean>(this.BASEURL+"/Delete",p)
// }
// Init():Observable<Array<Post>>{
// return this.http.get<Array<Post>>(this.BASEURL+"/Get")
// }
// }


import { inject, Injectable } from '@angular/core';
import { Post } from '../model/Post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Array<Post> = new Array<Post>();
  BASEURL: string = "https://localhost:7006/api/Posts";

  http = inject(HttpClient);

  constructor() {
    this.http.get<Array<Post>>(this.BASEURL + "/Get")
      .subscribe(res => {
        this.posts = res ?? [];
      });
  }

  loadedData(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.BASEURL + "/Get");
  }

  confirmPost(post: Post): Observable<Post> {
    post.isConfirmed = true;
    return this.http.post<Post>(this.BASEURL + "/update", post);
  }

  getUnconfirmedPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.BASEURL + "/Get");
  }

  addPost(p: Post): Observable<boolean> {
    return this.http.post<boolean>(this.BASEURL + "/AddPost", p);
  }

  deletePost(p: Post): Observable<boolean> {
    return this.http.post<boolean>(this.BASEURL + "/Delete", p);
  }

  Init(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.BASEURL + "/Get");
  }
  setAvailble(postId: number): Observable<Post> {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.isAvailble = false;
      return this.http.post<Post>(this.BASEURL + "/update", post);

    }
    return new Observable<Post>(subscriber => {
      subscriber.error(new Error("Post not found"));
    });
  }
  getNumOfPosts(companyId: number): number {
    if(!this.posts || this.posts.length === 0) {
      this.Init().subscribe(res => this.posts = res)
    }
    return this.posts.filter(p => p.companyId === companyId).length;
  }
  getUnconfirmedPostsByCompany(companyId: number): Observable<Post[]> {
    return new Observable<Post[]>(subscriber => {
      this.loadedData().subscribe(posts => {
        const filtered = posts.filter(p => p.companyId === companyId && !p.isConfirmed);
        subscriber.next(filtered);
        subscriber.complete();
      }, err => subscriber.error(err));
    });
  }
}
