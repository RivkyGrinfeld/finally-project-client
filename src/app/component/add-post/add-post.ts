// import { Component, OnInit, Input, Output, EventEmitter, inject, Optional, Signal, ChangeDetectorRef } from '@angular/core';
// import { Post } from '../../model/Post';
// import { Request as PostRequest } from '../../model/Request';
// import { Companies } from '../../model/Companies';
// import { Branch } from '../../model/Branch';
// import { Position } from '../../model/Position';
// import { Properties } from '../../model/Properties';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CompaniesService } from '../../service/companies-service';
// import { PropertiesService } from '../../service/properties-service';
// import { BranchesService } from '../../service/branches-service';
// import { PositionService } from '../../service/position-service';
// import { AddBranch } from "../../managerComponent/addBranch/add-branch";
// import { RouterOutlet } from '@angular/router';
// import { AddPosition } from '../../managerComponent/addPosition/add-position';
// import { AddProperty } from '../../managerComponent/addProperty/add-property';
// import { firstValueFrom } from 'rxjs';
// import { PostService } from '../../service/post-service';
// import { UserService } from '../../service/user-service';

// @Component({
//   selector: 'app-add-post',
//   standalone: true,
//   imports: [CommonModule, FormsModule, AddBranch, RouterOutlet, AddPosition, AddProperty],
//   templateUrl: './add-post.html',
//   styleUrls: ['./add-post.scss']
// })
// export class AddPost implements OnInit {
//   @Input() postToEdit: Post | null = null;
//   @Output() closeModal = new EventEmitter<void>();
//   @Output() savePost = new EventEmitter<Post>();

//   post: Post = new Post();
//   companies: Companies[] = [];
//   branches: Branch[] = [];
//   positions: Position[] = [];
//   properties: Properties[] = [];

//   selectedPositionId: number = 0;
//   selectedBranchId: number = 0;
//   selectedCompanyId: number = 0;
//   selectedPropertyId: number = 0;
//   minGrade: number = 0;
//   maxGrade: number = 0;
//   selectedRequests: PostRequest[] = [];

//   companiesService: CompaniesService = inject(CompaniesService)
//   propertiesService: PropertiesService = inject(PropertiesService)
//   branchesService: BranchesService = inject(BranchesService)
//   positionsService: PositionService = inject(PositionService)
//   postService: PostService = inject(PostService)
//   userService: UserService = inject(UserService)
//   companyService: CompaniesService = inject(CompaniesService)
//   flagBranches: boolean = false;
//   flagPositions: boolean = false;
//   flagProperty: boolean = false;

//   //  ngOnInit(): void {
//   //      this.loadData();
//   //   if (this.postToEdit) {
//   //     this.post = { ...this.postToEdit };
//   //     if (this.postToEdit.requests) {
//   //       this.selectedRequests = this.postToEdit.requests as any;
//   //     }
//   //   }
//   // }
//   async ngOnInit(): Promise<void> {
//     await this.loadData();

//     if (this.postToEdit) {
//       this.post = { ...this.postToEdit };
//       if (this.userService.status() == 2) {
//         this.selectedCompanyId = Number(await this.companyService.findCompanyByUserId(Number(this.userService.id())));
//       } else { 
//         this.selectedCompanyId = this.post.companyId as number; 
//       }

//       this.selectedPositionId = this.post.positionId as number;
//       // טען את כל ה-positions קודם
//       this.positions = await firstValueFrom(this.positionsService.Init());

//       // מצא את ה-branch לפי position
//       const pos = this.positions.find(p => p.id == this.selectedPositionId);
//       if (pos) {
//         this.selectedBranchId = pos.branchId as number;
//       }

//       // עכשיו סנן positions לפי branch
//       if (this.selectedBranchId) {
//         this.positions = this.positions.filter(p => p.branchId == this.selectedBranchId);
//       }

//       if (this.postToEdit.requests) {
//         this.selectedRequests = this.postToEdit.requests as any;
//       }
//       this.selectedPositionId = pos?.id as number;

//     }
//   }
//   async loadData() {
//     this.companies = await firstValueFrom(this.companiesService.Init());
//     //  = this.companiesService.companies;
//     //   this.branches = [
//     //     { id: 1, description: 'טכנולוגיה' },
//     //     { id: 2, description: 'הנדסה' },
//     //     { id: 3, description: 'שיווק' },
//     //     { id: 4, description: 'מכירות' }
//     //   ];
//     this.branches = await firstValueFrom(this.branchesService.Init());
//     //  = this.branchesService.branches;
//     this.properties = await firstValueFrom(this.propertiesService.Init());
//     // = this.propertiesService.properties;
//   }

//   async onBranchSelected() {
//     if (this.selectedBranchId) {
//       this.positions = await firstValueFrom(this.positionsService.Init())
//       this.positions = this.positions.filter(c => c.branchId == this.selectedBranchId)
//       // = this.positionsService.position
//       // const positionsByBranch: { [key: number]: Position[] } = {
//       // 1: [
//       //   { id: 1, description: 'Senior Developer', branchId: { id: 1, description: 'טכנולוגיה' } },
//       //   { id: 2, description: 'Junior Developer', branchId: { id: 1, description: 'טכנולוגיה' } },
//       //   { id: 3, description: 'DevOps Engineer', branchId: { id: 1, description: 'טכנולוגיה' } }
//       // ],
//       // 2: [
//       //   { id: 4, description: 'Software Architect', branchId: { id: 2, description: 'הנדסה' } },
//       //   { id: 5, description: 'QA Engineer', branchId: { id: 2, description: 'הנדסה' } }
//       // ]
//     };
//     //   this.positions = positionsByBranch[this.selectedBranchId] || [];
//     // } else {
//     //   this.positions = [];
//     // }
//   }

//   async onPositionSelect() {
//     if (this.selectedPositionId) {
//       this.positions = await firstValueFrom(this.positionsService.Init())
//       this.positions = this.positions.filter(c => c.branchId == this.selectedBranchId)

//     }
//   }
//   addRequest(): void {
//     if (!this.selectedPropertyId || this.minGrade < 0) {
//       alert('בחר Property והזן ציונים');
//       return;
//     }


//     const propertyObj = this.properties.find(p => p.id === this.selectedPropertyId);
//     if (this.selectedRequests.some(r => (r.propertyId as any)?.id === this.selectedPropertyId)) {
//       alert('מאפיין זה כבר נוסף');
//       return;
//     }

//     const newRequest = new PostRequest();
//     // newRequest.id = this.selectedRequests.length + 1;
//     // newRequest.postId = this.post.id;
//     // newRequest.propertyId = propertyObj?.id as any;
//     newRequest.propertyId = Number(this.selectedPropertyId) as any;
//     newRequest.minGradeProperty = this.minGrade;


//     this.selectedRequests.push(newRequest);

//     this.selectedPropertyId = 0;
//     this.minGrade = 0;

//   }

//   removeRequest(index: number): void {
//     this.selectedRequests.splice(index, 1);
//   }

//   saveNewPost(): void {
//     if (!this.post.city || this.post.salary <= 0 || !this.selectedCompanyId) {
//       alert('אנא מלא את כל השדות החובה');
//       return;
//     }
//     if (this.selectedPositionId != null)

//       this.post.positionId = this.selectedPositionId as any
//     this.post.companyId = this.selectedCompanyId as any//this.companies.find(c => c.id === this.selectedCompanyId)?.id as any;
//     this.post.requests = this.selectedRequests as any;

//     if (!this.post.id) {
//       this.post.id = 0;
//       this.post.date = new Date();
//       this.post.isAvailble = true;
//       this.post.isConfirmed = false;
//     }
//     this.postService.addPost(this.post).subscribe(res => res)

//     this.savePost.emit(this.post);
//     this.close();

//   }

//   close(): void {
//     this.closeModal.emit();

//   }






//   addBranch() {
//     this.flagBranches = true;
//     // this.cdr.detectChanges();
//   }
//   handleBranch(branchData: Branch) {
//     console.log('Branch received:', branchData);
//     this.branches.push(branchData); // מוסיפים לרשימה
//     console.log('Branch data received:', branchData);
//     this.branchesService.addBranch(branchData)
//     // כאן אפשר להוסיף לרשימה או לשלוח לשרת
//   }


//   closeBranch() {
//     this.flagBranches = false;
//   }
//   ///////////////////position add
//   addPosition() {
//     this.flagPositions = true;
//     // this.cdr.detectChanges();
//   }
//   handlePosition(positionData: Position) {
//     console.log('Position received:', positionData);
//     this.positions.push(positionData); // מוסיפים לרשימה
//     console.log('Position data received:', positionData);
//     // positionData.branchId = this.branches.find(b => b.id == this.selectedBranchId) as any
//     this.positionsService.addPosition(positionData)
//     // כאן אפשר להוסיף לרשימה או לשלוח לשרת
//   }
//   closePosition() {
//     this.flagPositions = false;
//   }



//   ////////////////////add property  
//   addProperty() {
//     this.flagProperty = true;
//     // this.cdr.detectChanges();
//   }
//   handleProperty(propertyData: Properties) {
//     console.log('Branch received:', propertyData);
//     this.properties.push(propertyData); // מוסיפים לרשימה
//     console.log('Branch data received:', propertyData);
//     this.propertiesService.addProperty(propertyData)
//     // כאן אפשר להוסיף לרשימה או לשלוח לשרת
//   }
//   closeProperty() {
//     this.flagProperty = false;
//   }
// }


import { Component, OnInit, Input, Output, EventEmitter, inject, Optional, Signal, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../model/Post';
import { Request as PostRequest } from '../../model/Request';
import { Companies } from '../../model/Companies';
import { Branch } from '../../model/Branch';
import { Position } from '../../model/Position';
import { Properties } from '../../model/Properties';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompaniesService } from '../../service/companies-service';
import { PropertiesService } from '../../service/properties-service';
import { BranchesService } from '../../service/branches-service';
import { PositionService } from '../../service/position-service';
import { AddBranch } from "../../managerComponent/addBranch/add-branch";
import { RouterOutlet } from '@angular/router';
import { AddPosition } from '../../managerComponent/addPosition/add-position';
import { AddProperty } from '../../managerComponent/addProperty/add-property';
import { firstValueFrom } from 'rxjs';
import { PostService } from '../../service/post-service';
import { UserService } from '../../service/user-service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule, AddBranch, RouterOutlet, AddPosition, AddProperty],
  templateUrl: './add-post.html',
  styleUrls: ['./add-post.scss']
})
export class AddPost implements OnInit {
  @Input() postToEdit: Post | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() savePost = new EventEmitter<Post>();

  post: Post = new Post();
  companies: Companies[] = [];
  branches: Branch[] = [];
  positions: Position[] = [];
  properties: Properties[] = [];

  selectedPositionId: number = 0;
  selectedBranchId: number = 0;
  selectedCompanyId: number = 0;
  selectedPropertyId: number = 0;
  minGrade: number = 0;
  maxGrade: number = 0;
  selectedRequests: PostRequest[] = [];

  companiesService: CompaniesService = inject(CompaniesService)
  propertiesService: PropertiesService = inject(PropertiesService)
  branchesService: BranchesService = inject(BranchesService)
  positionsService: PositionService = inject(PositionService)
  postService: PostService = inject(PostService)
  userService: UserService = inject(UserService)
  companyService: CompaniesService = inject(CompaniesService)
  flagBranches: boolean = false;
  flagPositions: boolean = false;
  flagProperty: boolean = false;

  //  ngOnInit(): void {
  //      this.loadData();
  //   if (this.postToEdit) {
  //     this.post = { ...this.postToEdit };
  //     if (this.postToEdit.requests) {
  //       this.selectedRequests = this.postToEdit.requests as any;
  //     }
  //   }
  // }
  async ngOnInit(): Promise<void> {

    await this.loadData();
    if (Number(this.userService.status()) == 2) {
      this.selectedCompanyId = Number(this.userService.id()) as number;
      alert(this.selectedCompanyId);
    }
    if (this.postToEdit) {
      this.post = { ...this.postToEdit };

      if (Number(this.userService.status()) != 2) {
        this.selectedCompanyId = this.post.companyId as number;
      }

      this.selectedPositionId = this.post.positionId as number;
      // טען את כל ה-positions קודם
      this.positions = await firstValueFrom(this.positionsService.Init());

      // מצא את ה-branch לפי position
      const pos = this.positions.find(p => p.id == this.selectedPositionId);
      if (pos) {
        this.selectedBranchId = pos.branchId as number;
      }

      // עכשיו סנן positions לפי branch
      if (this.selectedBranchId) {
        this.positions = this.positions.filter(p => p.branchId == this.selectedBranchId);
      }

      if (this.postToEdit.requests) {
        this.selectedRequests = this.postToEdit.requests as any;
      }
      this.selectedPositionId = pos?.id as number;

    }
  }
  async loadData() {
    this.companies = await firstValueFrom(this.companiesService.Init());
    //  = this.companiesService.companies;
    //   this.branches = [
    //     { id: 1, description: 'טכנולוגיה' },
    //     { id: 2, description: 'הנדסה' },
    //     { id: 3, description: 'שיווק' },
    //     { id: 4, description: 'מכירות' }
    //   ];
    this.branches = await firstValueFrom(this.branchesService.Init());
    //  = this.branchesService.branches;
    this.properties = await firstValueFrom(this.propertiesService.Init());
    // = this.propertiesService.properties;
  }

  async onBranchSelected() {
    if (this.selectedBranchId) {
      this.positions = await firstValueFrom(this.positionsService.Init())
      this.positions = this.positions.filter(c => c.branchId == this.selectedBranchId)
      // = this.positionsService.position
      // const positionsByBranch: { [key: number]: Position[] } = {
      // 1: [
      //   { id: 1, description: 'Senior Developer', branchId: { id: 1, description: 'טכנולוגיה' } },
      //   { id: 2, description: 'Junior Developer', branchId: { id: 1, description: 'טכנולוגיה' } },
      //   { id: 3, description: 'DevOps Engineer', branchId: { id: 1, description: 'טכנולוגיה' } }
      // ],
      // 2: [
      //   { id: 4, description: 'Software Architect', branchId: { id: 2, description: 'הנדסה' } },
      //   { id: 5, description: 'QA Engineer', branchId: { id: 2, description: 'הנדסה' } }
      // ]
    };
    //   this.positions = positionsByBranch[this.selectedBranchId] || [];
    // } else {
    //   this.positions = [];
    // }
  }

  async onPositionSelect() {
    if (this.selectedPositionId) {
      this.positions = await firstValueFrom(this.positionsService.Init())
      this.positions = this.positions.filter(c => c.branchId == this.selectedBranchId)

    }
  }
  addRequest(): void {
    if (!this.selectedPropertyId || this.minGrade < 0) {
      alert('בחר Property והזן ציונים');
      return;
    }


    const propertyObj = this.properties.find(p => p.id === this.selectedPropertyId);
    if (this.selectedRequests.some(r => (r.propertyId as any)?.id === this.selectedPropertyId)) {
      alert('מאפיין זה כבר נוסף');
      return;
    }

    const newRequest = new PostRequest();
    // newRequest.id = this.selectedRequests.length + 1;
    // newRequest.postId = this.post.id;
    // newRequest.propertyId = propertyObj?.id as any;
    newRequest.propertyId = Number(this.selectedPropertyId) as any;
    newRequest.minGradeProperty = this.minGrade;


    this.selectedRequests.push(newRequest);

    this.selectedPropertyId = 0;
    this.minGrade = 0;

  }

  removeRequest(index: number): void {
    this.selectedRequests.splice(index, 1);
  }

  saveNewPost(): void {
    if (!this.post.city || this.post.salary <= 0 || !this.selectedCompanyId) {
      alert('אנא מלא את כל השדות החובה' + this.post.city + this.post.salary + this.selectedCompanyId);
      return;
    }
    if (this.selectedPositionId != null)

      this.post.positionId = this.selectedPositionId as any
    this.post.companyId = this.selectedCompanyId as any//this.companies.find(c => c.id === this.selectedCompanyId)?.id as any;
    this.post.requests = this.selectedRequests as any;

    if (!this.post.id) {
      this.post.id = 0;
      this.post.date = new Date();
      this.post.isAvailble = true;
      this.post.isConfirmed = false;
    }
    this.postService.addPost(this.post).subscribe(res => res)

    this.savePost.emit(this.post);
    this.close();

  }

  close(): void {
    this.closeModal.emit();

  }



  addBranch() {
    this.flagBranches = true;
    // this.cdr.detectChanges();
  }
  handleBranch(branchData: Branch) {
    console.log('Branch received:', branchData);
    this.branches.push(branchData); // מוסיפים לרשימה
    console.log('Branch data received:', branchData);
    this.branchesService.addBranch(branchData)
    // כאן אפשר להוסיף לרשימה או לשלוח לשרת
  }


  closeBranch() {
    this.flagBranches = false;
  }
  ///////////////////position add
  addPosition() {
    this.flagPositions = true;
    // this.cdr.detectChanges();
  }
  handlePosition(positionData: Position) {
    console.log('Position received:', positionData);
    this.positions.push(positionData); // מוסיפים לרשימה
    console.log('Position data received:', positionData);
    // positionData.branchId = this.branches.find(b => b.id == this.selectedBranchId) as any
    this.positionsService.addPosition(positionData)
    // כאן אפשר להוסיף לרשימה או לשלוח לשרת
  }
  closePosition() {
    this.flagPositions = false;
  }



  ////////////////////add property  
  addProperty() {
    this.flagProperty = true;
    // this.cdr.detectChanges();
  }
  handleProperty(propertyData: Properties) {
    console.log('Branch received:', propertyData);
    this.properties.push(propertyData); // מוסיפים לרשימה
    console.log('Branch data received:', propertyData);
    this.propertiesService.addProperty(propertyData)
    // כאן אפשר להוסיף לרשימה או לשלוח לשרת
  }
  closeProperty() {
    this.flagProperty = false;
  }
}








