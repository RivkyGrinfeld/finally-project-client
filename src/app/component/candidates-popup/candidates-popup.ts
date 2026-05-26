import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { Apply } from '../../model/Apply'
import { Request } from '../../model/Request'
import { Customer } from '../../model/Customer'
import { Tests } from '../../model/Tests'
import { CandidateView } from '../../model/CandidateView'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ApplyService } from '../../service/apply-service'
import { firstValueFrom } from 'rxjs'
import { CustomersService } from '../../service/customers-service'
import { TestsService } from '../../service/tests-service'
import { RequestService } from '../../service/request-service'
import { Post } from '../../model/Post'
import { PostService } from '../../service/post-service'
import { UserService } from '../../service/user-service'
import { HttpClient } from '@angular/common/http'
import { PropertiesService } from '../../service/properties-service'
import { Properties } from '../../model/Properties'


@Component({
  selector: 'app-candidates-popup',
  imports: [FormsModule, CommonModule],
  templateUrl: './candidates-popup.html',
  styleUrls: ['./candidates-popup.scss']
})
export class CandidatesPopupComponent implements OnInit {
  @Input() postId: number | null = null;
  @Input() applies: Apply[] = []
  @Input() requests: Request[] = []
  @Output() close = new EventEmitter<void>();
  customers: Customer[] = []
  tests: Tests[] = []
  posts: Post[] = []
  userService = inject(UserService)
  appliesService = inject(ApplyService)
  customerService = inject(CustomersService)
  testService = inject(TestsService)
  requestsService = inject(RequestService)
  postService = inject(PostService)
  http = inject(HttpClient)
  candidates: CandidateView[] = []
  topCandidates: CandidateView[] = []
  propertiesService: PropertiesService = inject(PropertiesService)
  post: Post = new Post()
  properties: Properties[] = []
  async ngOnInit() {
    this.properties = await firstValueFrom(this.propertiesService.Init());
    this.requests = await firstValueFrom(this.requestsService.init());
    this.applies = await firstValueFrom(this.appliesService.init());
    this.applies = this.applies.filter(a => a.postId == this.postId);
    if (this.userService.status() == 2) {
      this.applies = this.applies.filter(a => a.confirmed == true);
    }
    this.customers = await firstValueFrom(this.customerService.init());
    // Load tests for all candidates
    try {
      for (const a of this.applies) {
        const custId = a.custId;
        try {
          const test = await firstValueFrom(this.testService.getTestByCustomer(custId));
          if (test) this.tests.push(test);
        } catch { }
      }
    } catch { }
    this.posts = await firstValueFrom(this.postService.Init());
    await this.buildCandidates()
    this.post = this.posts.find(p => p.id == this.postId) ?? new Post();


  }

  async buildCandidates() {
    const postRequests = this.requests.filter(r => r.postId == this.postId);

    const requirementDescriptions = postRequests.map(r => `מאפיין ${this.properties.find(p => p.id == r.propertyId)?.description}: ציון מינימלי ${r.minGradeProperty}`);

    this.candidates = [];

    for (const a of this.applies) {
      const customer = this.customers.find(c => c.id == a.custId);
      const test = this.tests.find(t => t.custId == a.custId);

      let testScore = 0;
      let matchScore = 0;

      if (test) {
        testScore = this.calculateTestScore(test);
        matchScore = this.calculateMatchScore(test);
      }

      // Real AI analysis of CV
      let aiScore = 0;
      if (customer?.fileName) {
        // try {
        //   const candidateInfo = customer.url
        //   // const candidateInfo = `שם: ${customer.firstName} ${customer.lastName}, עיר: ${customer.city}, אימייל: ${customer.email}, טלפון: ${customer.phone}`;
        //   const res: any = await firstValueFrom(
        //     this.http.post('https://localhost:7006/api/cv/analyze-match', {
        //       fileName: customer.fileName,
        //       candidateInfo: candidateInfo,
        //       requirements: requirementDescriptions
        //     })
        //   );
        //   aiScore = res.score ?? 0;
        // } catch {
        //   aiScore = 0;
        // }
        aiScore = a.aiMatched ?? 1;
      }

      const finalScore = (matchScore * 0.4) + (testScore * 0.3) + (aiScore * 0.3);

      this.candidates.push({
        custId: a.custId,
        fullName: (customer?.firstName ?? '') + " " + (customer?.lastName ?? ''),
        cvUrl: customer?.url,
        fileName: customer?.fileName,
        testScore,
        matchScore,
        aiScore,
        finalScore,
        confirmed: a.confirmed
      });
    }

    this.candidates.sort((a, b) => b.finalScore - a.finalScore);
    this.topCandidates = this.candidates.slice(0, 3);
  }

  calculateTestScore(test: Tests) {

    let sum = 0

    test.pointsTest.forEach(p => {
      sum += p.gradeProperty
    })

    return sum

  }

  calculateMatchScore(test: Tests) {

    let match = 0

    let total = this.requests.length

    this.requests.forEach(req => {

      const candidateProperty = test.pointsTest.find(p => p.propertyId == req.propertyId)

      if (candidateProperty && candidateProperty.gradeProperty >= req.minGradeProperty) {

        match++

      }

    })

    return Math.round((match / total) * 100)

  }

  getColor(score: number) {

    if (score >= 80)
      return "green"

    if (score >= 60)
      return "orange"

    return "red"

  }

  toggleConfirm(c: CandidateView) {

    c.confirmed = !c.confirmed

  }
  toSuggest() {

    let numberOfCandidated = this.posts.find(x => x.id == this.postId)?.maxCadidated
    if (numberOfCandidated == undefined)
      numberOfCandidated = 0
    let cnt = this.candidates.filter(x => x.confirmed).length
    if (cnt > numberOfCandidated) {
      alert(`you have to choose only: ${numberOfCandidated} `)

    }

    else {

      this.candidates.filter(x => x.confirmed).forEach(x => this.appliesService.confirmedApply(
        this.getApplyByPostAndCust(this.postId ?? 0, x.custId) ?? new Apply()).subscribe(() => {
          this.postService.setAvailble(this.postId ?? 0).subscribe(() => {
            this.close.emit();
          })
        }))
    }
  }
  getApplyByPostAndCust(p: number, c: string) {

    let a = this.applies.find(x => x.custId == c && x.postId == p)
    if (a != undefined)
      a.confirmed = true
    return a
  }
  fixUrl(path: string): string {
    const fileName = path.split('\\').pop() || '';

    return 'https://localhost:7006/Uploads/' + encodeURIComponent(fileName);
  }
  closeFun() {
    this.close.emit(); // משתמש ב-EventEmitter כדי להודיע על סגירת הפופאפ
  }
}
