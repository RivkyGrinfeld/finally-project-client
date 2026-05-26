import { Component, OnInit } from '@angular/core';
import { CvChatService } from '../../service/cv-chat-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CvDto } from '../../model/CvDto';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-cv-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './cv-chat-component.html',
  styleUrls: ['./cv-chat-component.scss']
})
export class CvChatComponent implements OnInit {

  constructor(private chatService: CvChatService, private router: Router) {}

  isPro(): boolean {
    return sessionStorage.getItem('isPro') === 'true';
  }

  goToPayment() {
    this.router.navigate(['/ProPayment']);
  }

  messages: ChatMessage[] = [];
  question: string = '';
  answer: string = '';
  questionAi: string = '';
  isLoading: boolean = false;
  cv: any = {
    FullName: '',
    Email: '',
    Phone: '',
    Skills: [],
    Experience: [],
    Education: [],
    Conversation: []
  };

  ngOnInit() {
    this.question = 'שלום! מה השם המלא שלך?';
    this.messages.push({ role: 'assistant', content: this.question });
  }

  sendAnswer() {
    if (!this.answer.trim() || this.isLoading) return;

    const userAnswer = this.answer.trim();
    this.messages.push({ role: 'user', content: userAnswer });
    this.answer = '';
    this.isLoading = true;

    if (this.cv.Education.length > 0 && this.questionAi) {
      this.handleAiConversation(userAnswer);
    } else {
      this.handleValidatorFlow(userAnswer);
    }
  }

  private handleValidatorFlow(userAnswer: string) {
    if (this.question.includes('שם')) {
      this.cv.FullName = userAnswer;
    } else if (this.question.includes('מייל')) {
      this.cv.Email = userAnswer;
    } else if (this.question.includes('טלפון')) {
      this.cv.Phone = userAnswer;
    } else if (this.question.includes('כישורים')) {
      this.cv.Skills = userAnswer.split(',').map((s: string) => s.trim());
    } else if (this.question.includes('ניסיון')) {
      this.cv.Experience.push({ Role: userAnswer, Company: '', StartDate: '', EndDate: '' });
    } else if (this.question.includes('השכלה')) {
      this.cv.Education.push({ Degree: userAnswer, Institution: '', StartDate: '', EndDate: '' });
    }

    this.cv.Conversation.push({ Role: 'user', Content: userAnswer });

    this.chatService.sendCv(this.cv).subscribe({
      next: (response: HttpResponse<Blob>) => {
        this.handleResponse(response);
      },
      error: (err) => {
        this.isLoading = false;
        this.messages.push({ role: 'assistant', content: 'אירעה שגיאה, נסה שוב.' });
        console.error('CV service error:', err);
      }
    });
  }

  private handleAiConversation(userAnswer: string) {
    this.cv.Conversation.push({ Role: 'user', Content: userAnswer });

    const cvDto = new CvDto();
    cvDto.candidate = this.cv;
    cvDto.ans = userAnswer;

    this.chatService.sendAnswer(cvDto).subscribe({
      next: (response: HttpResponse<Blob>) => {
        this.handleResponse(response);
      },
      error: (err) => {
        this.isLoading = false;
        this.messages.push({ role: 'assistant', content: 'אירעה שגיאה, נסה שוב.' });
        console.error('CV AI service error:', err);
      }
    });
  }

  private handleResponse(response: HttpResponse<Blob>) {
    this.isLoading = false;
    const contentType = response.headers.get('Content-Type') || '';

    if (contentType.includes('application/pdf') && response.body) {
      // Server returned a PDF file
      this.downloadPdf(response.body);
    } else if (response.body) {
      // Server returned JSON, parse it
      response.body.text().then(text => {
        try {
          const res = JSON.parse(text);
          if (res.question) {
            if (res.Role === 'ai' || res.role === 'ai') {
              this.questionAi = res.question;
              this.question = '';
            } else {
              this.question = res.question;
              this.questionAi = '';
            }
            this.messages.push({ role: 'assistant', content: res.question });
            this.cv.Conversation.push({ Role: 'assistant', Content: res.question });
          }
        } catch (e) {
          this.messages.push({ role: 'assistant', content: 'אירעה שגיאה בעיבוד התשובה.' });
          console.error('JSON parse error:', e, text);
        }
      });
    }
  }

  private downloadPdf(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    this.question = '';
    this.questionAi = '';
    this.messages.push({ role: 'assistant', content: 'קורות החיים שלך מוכנים! הקובץ הורד בהצלחה.' });
  }
}
