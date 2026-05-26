import { Component, OnInit, signal, Signal } from '@angular/core';
import { Post } from '../../model/Post';
import { PostService } from '../../service/post-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CompaniesService } from '../../service/companies-service';
import { inject } from '@angular/core';
import { PositionService } from '../../service/position-service';
import de from '@angular/common/locales/extra/de';
import { Position } from '../../model/Position';
import { Companies } from '../../model/Companies';

@Component({
  selector: 'app-unconfirmed-posts',
  imports: [CommonModule, FormsModule],
  templateUrl: './unconfirmed-posts.html',
  styleUrls: ['./unconfirmed-posts.scss'],
})
export class UnconfirmedPosts implements OnInit {
  position: Position[] = []
  companies: Companies[] = []
  posts: Post[] = [];
  loading = signal(false);
  companiesService: CompaniesService = inject(CompaniesService)
  positionsService: PositionService = inject(PositionService)
  de: String = '';
  constructor(private postsService: PostService) { }

  async ngOnInit() {
    this.position = await firstValueFrom(this.positionsService.loadPositions());
    this.loadUnconfirmedPosts();
  }

  async loadUnconfirmedPosts() {
    this.loading.set(true);
    try {
      if (this.postsService.posts.length == 0)
        this.posts = await firstValueFrom(this.postsService.getUnconfirmedPosts());
      else this.posts = this.postsService.posts
      this.posts = this.posts.filter(p => !p.isConfirmed);
      console.log('Loaded posts:', this.posts);
    } catch (error) {
      console.error('Failed to load posts', error);
    } finally {
      this.loading.set(false);
    }


    // this.postsService.getUnconfirmedPosts().subscribe(posts => {
    // this.posts = posts;


  }

  confirmPost(post: Post) {
    this.postsService.confirmPost(post).subscribe(() => {
      post.isConfirmed = true;
      this.posts = this.posts.filter(p => !p.isConfirmed);
    });
  }
  // unconfirmed-posts.component.ts
  async getCompanyName(post: Post) {
    if (!this.companiesService.companies) {
      return 'loading...';
    }
    if (this.companies.length === 0) {
      this.companies = await firstValueFrom(this.companiesService.Init());
    }
    return this.companies?.find(c => c.id === post.companyId)?.name || 'not found';
  }

  getPositionDescription(post: Post) {
    return this.position?.find(p => p.id === post.positionId)?.description || 'not found';
  }

}
