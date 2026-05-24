import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  analysisResult: string = '';

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

    // TODO: Connect to actual graphology API endpoint
    // For now simulate a delay
    setTimeout(() => {
      this.isAnalyzing = false;
      this.analysisResult = 'הניתוח הושלם. חבר את ה-endpoint של ניתוח הגרפולוגיה בשרת.';
    }, 2000);
  }
}
