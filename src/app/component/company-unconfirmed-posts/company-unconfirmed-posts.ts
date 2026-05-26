import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../service/post-service';
import { UserService } from '../../service/user-service';
import { firstValueFrom } from 'rxjs';
import { Post } from '../../model/Post';

@Component({
  selector: 'app-company-unconfirmed-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-unconfirmed-posts.html',
  styleUrls: ['./company-unconfirmed-posts.scss']
})
export class CompanyUnconfirmedPostsComponent implements OnInit {
  posts: Array<Post> = [];
  userService = inject(UserService);
  postService = inject(PostService);

 async ngOnInit() {
    const companyId = Number(this.userService.id());
    if (companyId) {
    //   this.postService.getUnconfirmedPostsByCompany(companyId).subscribe((data: Post[]) => {
    //     this.posts = data;
    //   });
    this.posts = await firstValueFrom(this.postService.Init())
    console.log(this.posts.length+"ALL POSTS");
    console.log(this.posts[14]);
    
    if (this.posts.length > 0) {
      this.posts = this.posts.filter(p => p.companyId === companyId && !p.isConfirmed);
    }
    console.log(this.posts);

    }

  }
}
