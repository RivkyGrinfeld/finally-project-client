// import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
// import { Post } from '../../model/Post';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { PostService } from '../../service/post-service';
// import { AddPost } from '../add-post/add-post';
// import { firstValueFrom } from 'rxjs';
// import { CandidatesPopupComponent } from '../candidates-popup/candidates-popup';
// import { Apply } from '../../model/Apply';
// import { ApplyService } from '../../service/apply-service';
// import { UserService } from '../../service/user-service';

// @Component({
//   selector: 'app-posts-list',
//   standalone: true,
//   imports: [CommonModule, FormsModule, AddPost, CandidatesPopupComponent],
//   templateUrl: './posts-list.html',
//   styleUrls: ['./posts-list.scss']
// })
// export class PostsList implements OnInit {
//   posts: Post[] = [];
//   filteredPosts: Post[] = [];
//   selectedPost: Post | null = null;
//   selectedPostId: number | null = null;
//   showCandidatesModal: boolean = false;
//   searchText: string = '';
//   filterAvailable: string = 'הכל';
//   showPostDetail: boolean = false;
//   showAddPostModal: boolean = false;
//   applyService: ApplyService = inject(ApplyService)
//   userService = inject(UserService)
//   postService: PostService = inject(PostService)
//   constructor(private cd: ChangeDetectorRef) { }
//   async ngOnInit(){
//    await this.userService.setStatus()
//     console.log(this.userService.id + "!!!");
//     console.log(this.userService.status() + "@@@");

//     this.posts = await firstValueFrom(this.postService.loadedData())

//     await this.loadPosts();
//     await this.allPosts();
//   //   if (this.userService.status() == 0) {
//   //     alert("אנא התחבר כדי לצפות במשרות")
//   //   }
//   //   if (this.userService.status() == 3) {
//   //     alert("אין לך הרשאות לצפות במשרות")
//   //   }
//   //   if (this.userService.id == undefined) {
//   //     alert("לא הצלחנו לאמת את המשתמש")
//   //   }
//   }
//   async loadPosts() {
//     this.filterPosts();
//     console.log(this.posts + "!!");

//   }
//   async allPosts() {
//     // this.posts = await firstValueFrom(this.postService.loadedData())
//     this.filteredPosts = this.posts
//   }
//   filterPosts(): void {
//     this.filteredPosts = this.posts.filter(post => {
//       const matchesSearch = post.city.toLowerCase().includes(this.searchText.toLowerCase());
//       const matchesAvailable = this.filterAvailable === 'הכל' ||
//         (this.filterAvailable === 'פתוחה' && post.isAvailble) ||
//         (this.filterAvailable === 'סגורה' && !post.isAvailble);
//       return matchesSearch && matchesAvailable;
//     });
//   }

//   selectPost(post: Post): void {
//     this.selectedPost = post;
//     this.showPostDetail = true;
//   }

//   closeDetail(): void {
//     this.showPostDetail = false;
//     this.selectedPost = null;
//   }

//   openAddPostModal(): void {
//     this.showAddPostModal = true;
//   }

//   closeAddPostModal(): void {
//     this.selectedPost = null;

//     this.showAddPostModal = false;
//   }

//   editPost(post: Post): void {
//     this.showPostDetail = false;
//     this.selectedPost = post;
//     this.showAddPostModal = true;
//   }

//   deletePost(post: Post): void {
//     if (confirm(`האם ברצונך למחוק את המשרה?`)) {
//       this.posts = this.posts.filter(p => p.id !== post.id);
//       this.postService.deletePost(post).subscribe()
//       this.filterPosts();
//       this.closeDetail();
//     }
//   }

//   onPostSaved(post: Post): void {
//     const index = this.posts.findIndex(p => p.id === post.id);
//     if (index > -1) {
//       this.posts[index] = post;
//     } else {
//       this.posts.push(post);
//     }
//     this.filterPosts();
//     this.closeAddPostModal();
//   }

//   getAvailabilityLabel(isAvailable: boolean): string {
//     return isAvailable ? 'פתוחה' : 'סגורה';
//   }

//   getAvailabilityColor(isAvailable: boolean): string {
//     return isAvailable ? 'green' : 'red';
//   }

//   getCompanyName(company: any): string {
//     return typeof company === 'string' ? company : company?.name || 'לא ידוע';
//   }

//   getPositionName(position: any): string {
//     return typeof position === 'string' ? position : position?.description || 'לא ידוע';
//   }
//   openAllCust(postId: number) {
//     this.selectedPostId = postId;
//     this.showCandidatesModal = true;
//     this.cd.detectChanges();
//   }
//   send(postId: number) {
//     let thisId = sessionStorage.getItem('customerId')
//     let a = new Apply()
//     a.id = 0
//     a.confirmed = false
//     //  a.custId? thisId
//     a.postId = postId
//     //  a.date = Date.now
//     //  this.applyService.addApply()
//     alert(a)
//     alert("הגשת מועמדים")

//   }
//   closeCandidatesPopup() {
//     this.showCandidatesModal = false;
//     this.selectedPostId = null;

//   }
// }

import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Post } from '../../model/Post';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../service/post-service';
import { AddPost } from '../add-post/add-post';
import { firstValueFrom } from 'rxjs';
import { CandidatesPopupComponent } from '../candidates-popup/candidates-popup';
import { Apply } from '../../model/Apply';
import { ApplyService } from '../../service/apply-service';
import { UserService } from '../../service/user-service';
import { RequestService } from '../../service/request-service';
import { Request } from '../../model/Request';
import { TestsService } from '../../service/tests-service';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddPost, CandidatesPopupComponent],
  templateUrl: './posts-list.html',
  styleUrls: ['./posts-list.scss']
})
export class PostsList implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  recommendedPosts: Post[] = [];
  selectedPost: Post | null = null;
  selectedPostId: number | null = null;
  showCandidatesModal: boolean = false;
  searchText: string = '';
  filterAvailable: string = 'הכל';
  filterSalary: string = 'הכל';
  filterMatch: string = 'הכל';
  showPostDetail: boolean = false;
  showAddPostModal: boolean = false;

  applyService: ApplyService = inject(ApplyService);
  userService = inject(UserService);
  postService: PostService = inject(PostService);
  requestService: RequestService = inject(RequestService);
  testsService: TestsService = inject(TestsService);
  applies: Apply[] = [];
  allRequests: Request[] = [];
  customerPoints: any[] = []; // PointsTest array from customer's test
  private cd = inject(ChangeDetectorRef);

  // constructor(private cd: ChangeDetectorRef) { }

  async ngOnInit() {
    try {
      await this.userService.setStatus();
      console.log(this.userService.id + "!!!");
      console.log(this.userService.status() + "@@@");

      this.posts = await firstValueFrom(this.postService.loadedData());
      await this.loadPosts();
      await this.allPosts();
      await this.loadMatchData();
      // אם יש פונקציה buildRecommendedPosts, קרא לה כאן אחרי טעינת הנתונים
      // await this.buildRecommendedPosts();
    } catch (error) {
      console.error('שגיאה בטעינת נתונים מהשרת:', error);
      alert('אירעה שגיאה בטעינת הנתונים מהשרת. נסה שוב מאוחר יותר.');
    }
  }

  async loadMatchData() {
    try {
      // Load all requests (post requirements)
      this.allRequests = await firstValueFrom(this.requestService.init());
    } catch (e) {
      this.allRequests = [];
    }

    // Load customer's test points from DB
    try {
      const custId = this.userService.id();
      if (custId) {
        const test = await firstValueFrom(this.testsService.getTestByCustomer(custId));
        if (test && test.pointsTest) {
          this.customerPoints = test.pointsTest;
        }
      }
    } catch (e) {
      this.customerPoints = [];
    }
    await this.buildRecommendedPosts();

  }

  async buildRecommendedPosts() {
    const confirmedPosts = this.posts.filter(p => p.isConfirmed && p.isAvailble);

    if (this.customerPoints.length > 0 && this.allRequests.length > 0) {
      // Calculate match score for each post based on test results
      const scored = confirmedPosts.map( post => {
        const postRequests =  this.allRequests.filter(r => r.postId === post.id);
        if (postRequests.length === 0) return { post, score: 50 }; // No requirements = neutral

        let matched = 0;
        postRequests.forEach( req => {
          const point =  this.customerPoints.find((p: any) => p.propertyId === req.propertyId);
          if (point && point.gradeProperty >= req.minGradeProperty) {
            matched++;
          }
        });

        const score =  Math.round((matched / postRequests.length) * 100);
        return { post, score };
      });

      // Recommended = posts with 60%+ match, sorted by score
      this.recommendedPosts = scored
        .filter(s => s.score >= 60)
        .sort((a, b) => b.score - a.score)
        .map(s => s.post);
      alert(this.recommendedPosts.length + " משרות מומלצות נמצאו עבורך!");
    } else {
      // Fallback: show top salary posts if no test data
      this.recommendedPosts = confirmedPosts
        .sort((a, b) => b.salary - a.salary)
        .slice(0, 4);
    }
  }

  async loadPosts() {
    this.filterPosts();
  }

  async allPosts() {
    this.filteredPosts = this.posts;
  }

  filterPosts(): void {
    const search = this.searchText.toLowerCase();
    this.filteredPosts = this.posts.filter(post => {
      const matchesSearch =
        (post.city ?? '').toLowerCase().includes(search) ||
        (post.jobTitle ?? '').toLowerCase().includes(search) ||
        (post.jobDescription ?? '').toLowerCase().includes(search);

      const matchesAvailable =
        this.filterAvailable === 'הכל' ||
        (this.filterAvailable === 'פתוחה' && post.isAvailble) ||
        (this.filterAvailable === 'סגורה' && !post.isAvailble);

      const matchesSalary =
        this.filterSalary === 'הכל' ||
        (this.filterSalary === 'low' && post.salary <= 10000) ||
        (this.filterSalary === 'mid' && post.salary > 10000 && post.salary <= 20000) ||
        (this.filterSalary === 'high' && post.salary > 20000);

      const matchesMatchFilter =
        this.filterMatch === 'הכל' ||
        (this.filterMatch === 'recommended' && this.recommendedPosts.some(r => r.id === post.id));

      return matchesSearch && matchesAvailable && matchesSalary && matchesMatchFilter;
    });
  }

  selectPost(post: Post): void {
    this.selectedPost = post;
    this.showPostDetail = true;
  }

  closeDetail(): void {
    this.showPostDetail = false;
    this.selectedPost = null;
  }

  openAddPostModal(): void {
    this.showAddPostModal = true;
  }

  closeAddPostModal(): void {
    this.selectedPost = null;
    this.showAddPostModal = false;
  }

  editPost(post: Post): void {
    this.showPostDetail = false;
    this.selectedPost = post;
    this.showAddPostModal = true;
  }

  deletePost(post: Post): void {
    if (confirm(`האם ברצונך למחוק את המשרה?`)) {
      this.posts = this.posts.filter(p => p.id !== post.id);
      this.postService.deletePost(post).subscribe();
      this.filterPosts();
      this.closeDetail();
    }
  }

  onPostSaved(post: Post): void {
    const index = this.posts.findIndex(p => p.id === post.id);

    if (index > -1) {
      this.posts[index] = post;
    } else {
      this.posts.push(post);
    }

    this.filterPosts();
    this.closeAddPostModal();
  }

  getAvailabilityLabel(isAvailable: boolean): string {
    return isAvailable ? 'פתוחה' : 'סגורה';
  }

  getAvailabilityColor(isAvailable: boolean): string {
    return isAvailable ? 'green' : 'red';
  }

  getCompanyName(company: any): string {
    return typeof company === 'string' ? company : company?.name || 'לא ידוע';
  }

  getPositionName(position: any): string {
    return typeof position === 'string' ? position : position?.description || 'לא ידוע';
  }

  openAllCust(postId: number) {
    this.selectedPostId = postId;
    this.showCandidatesModal = true;
    this.cd.detectChanges();
  }

  send(postId: number) {
    let thisId = sessionStorage.getItem('customerId');

    let a = new Apply();
    a.id = 0;
    a.confirmed = false;
    a.postId = postId;

    alert(a);
    alert("הגשת מועמדים");
  }

  closeCandidatesPopup() {
    this.showCandidatesModal = false;
    this.selectedPostId = null;
  }

  getAppliesByPostId(postId: number){
    this.applyService.getAppliesByPostId(postId).subscribe(res => this.applies = res);
    this.applies = this.applies.filter(a => a.confirmed == true);
       this.showCandidatesModal = true;
    this.cd.detectChanges();
  }
  toApply(post: Post) {
    let a = new Apply();
    a.confirmed = false;
    a.custId = this.userService.id() ?? '';
    a.postId = post.id;
    a.date = new Date();
    this.applyService.createApply(a).subscribe(res => {
      this.showSuccessPopup = true;
    });
  }

  showSuccessPopup = false;

  closeSuccessPopup() {
    this.showSuccessPopup = false;
  }
   isGridView = false;  // ברירת מחדל היא רשימה

  toggleView() {
    this.isGridView = !this.isGridView;  // משנה את מצב התצוגה
  }

  isRecommended(post: Post): boolean {
    return this.recommendedPosts.some(r => r.id === post.id);
  }
}
