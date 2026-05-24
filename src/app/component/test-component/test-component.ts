import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from '../../service/question-service';
import { first, firstValueFrom } from 'rxjs';
import { Questions } from '../../model/Questions';
import { Answers } from '../../model/Answers';
import { AnswersService } from '../../service/answers-service';
import { TestsService } from '../../service/tests-service';
import { CompareTo } from '../../model/CompareTo';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { PropertiesService } from '../../service/properties-service';
import { Properties } from '../../model/Properties';

@Component({
  standalone: true, // חובה
  selector: 'app-test',
  imports: [FormsModule, CommonModule, ReactiveFormsModule,FormsModule,
    CommonModule,
    CardModule,
    RadioButtonModule,
    InputTextModule,
    ButtonModule,
    ProgressBarModule],
  templateUrl: './test-component.html',
  styleUrls: ['./test-component.scss']
})
export class TestComponent implements OnInit {
  groupedQuestions: any[] = [];
  currentGroupIndex: number = 0;
  questions: Questions[] = [];
  answers: Answers[] = [];
  timer: number = 1800;
  timerInterval: any;
  questionTest: CompareTo[] = [];
  testStarted: boolean = false;

  propertiesService: PropertiesService = inject(PropertiesService);
  questionsService: QuestionService = inject(QuestionService);
  answersService: AnswersService = inject(AnswersService);
  testService: TestsService = inject(TestsService);

  private beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = 'המבחן עדיין פעיל. האם אתה בטוח שברצונך לצאת?';
    return e.returnValue;
  };

  private keydownHandler = (e: KeyboardEvent) => {
    // Block F5, Ctrl+R, Ctrl+W, Alt+F4, Escape
    if (
      e.key === 'F5' ||
      (e.ctrlKey && e.key === 'r') ||
      (e.ctrlKey && e.key === 'w') ||
      (e.altKey && e.key === 'F4') ||
      e.key === 'Escape'
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  private contextMenuHandler = (e: Event) => {
    e.preventDefault();
  };

  constructor(private fb: FormBuilder, private router: Router) {}

  async ngOnInit() {
    this.groupedQuestions = await firstValueFrom(this.propertiesService.Init());
    this.propertiesService.properties = [...this.groupedQuestions];
    await this.loadQuestions();
  }

  startTest() {
    this.testStarted = true;
    this.startTimer();
    this.lockBrowser();
    this.requestFullscreen();
  }

  private lockBrowser() {
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
    document.addEventListener('keydown', this.keydownHandler, true);
    document.addEventListener('contextmenu', this.contextMenuHandler);

    // Detect tab visibility change
    document.addEventListener('visibilitychange', () => {
      if (this.testStarted && document.hidden) {
        // User tried to switch tabs
        alert('אין אפשרות לעזוב את המבחן! חזור למבחן.');
      }
    });
  }

  private unlockBrowser() {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    document.removeEventListener('keydown', this.keydownHandler, true);
    document.removeEventListener('contextmenu', this.contextMenuHandler);
  }

  private requestFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {});
    }
  }

  private exitFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
groupQuestions() {
  const map = new Map<number, any[]>();

  this.questions.forEach(q => {
    const key = q.propertyId ?? -1;

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key)!.push(q);
  });

  this.groupedQuestions = Array.from(map.entries()).map(([propertyId, questions]) => {
    
    const property = this.propertiesService.properties?.find(p => p.id === propertyId);

    return {
      propertyId,
      description: property ? property.description : 'General',
      questions
    };
  });
}
//   groupQuestions() {
//   const map = new Map<string, any[]>();

//   this.questions.forEach(q => {
//     const key = q.propertyId || 'General';

//     if (!map.has(key)) {
//       map.set(key, []);
//     }

//     map.get(key)!.push(q);
//   });

//   // this.groupedQuestions = Array.from(map.entries()).map(([topic, questions]) => ({
//   //   topic,
//   //   questions
//   // }));
// }
  async loadQuestions() {
    // כאן תוכל להחליף לקריאה ל-API שלך
    this.questions = await firstValueFrom(this.questionsService.init())
    this.questions.forEach(x => this.questionTest.push({id: x.id, text: ""}))
    
    this.answers = await firstValueFrom(this.answersService.init())
    // this.questions.forEach((question, index) => {
    //   this.testForm.addControl(`question${index}`, this.fb.control("", Validators.required));
    //   console.log(this.testForm);
      // this.questionTest.forEach()
        this.groupQuestions(); // 👈 הוספה בלבד

    // });
  }

nextGroup() {
  if (this.currentGroupIndex < this.groupedQuestions.length - 1) {
    this.currentGroupIndex++;
  }
}




prevGroup() {
  if (this.currentGroupIndex > 0) {
    this.currentGroupIndex--;
  }
}

goToGroup(i: number) {
  this.currentGroupIndex = i;
}
  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.submitTest();
      }
    }, 1000);
  }

  showSuccessPopup = false;

  submitTest() {
    clearInterval(this.timerInterval);
    this.unlockBrowser();
    this.exitFullscreen();
    this.testStarted = false;

    this.testService.submitTest(this.questionTest).subscribe({
      next: (res) => {
        console.log(res);
        this.showSuccessPopup = true;
      },
      error: () => {
        alert('שגיאה בהגשת המבחן');
      }
    });
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
    this.router.navigate(['/PostList']);
  }
 
  
}
