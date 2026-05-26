import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hasava-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './hasava-component.html',
  styleUrls: ['./hasava-component.scss'],
})
export class HasavaComponent {
  selectedFile: File | null = null;
  isAnalyzing: boolean = false;
  analysisResult: any = '';
    http = inject(HttpClient)
  BASEURL: String = "https://localhost:7006/api"
  constructor(private router: Router) {}

  isPro(): boolean {
    return sessionStorage.getItem('isPro') === 'true';
  }

  goToPayment() {
    this.router.navigate(['/ProPayment']);
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.analysisResult = '';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.analysisResult = '';
    }
  }

  removeFile(event: Event) {
    event.stopPropagation();
    this.selectedFile = null;
    this.analysisResult = '';
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  analyze() {
    if (!this.selectedFile) return;
    this.isAnalyzing = true;
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.http.post<string>(this.BASEURL + "/Handwriting/analyze", formData).subscribe((res)=>{
      this.analysisResult = res;
      this.isAnalyzing = false;
    }, err => {
      this.isAnalyzing = false;
      this.analysisResult = 'אירעה שגיאה בניתוח הקובץ';
    });
  }
}


