import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pro-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pro-payment.html',
  styleUrls: ['./pro-payment.scss']
})
export class ProPaymentComponent {
  selectedPlan: string = '';
  showSuccess = false;

  constructor(private router: Router) {}

  selectPlan(plan: string) {
    this.selectedPlan = plan;
  }

  pay() {
    if (!this.selectedPlan) return;
    // Simulate payment
    sessionStorage.setItem('isPro', 'true');
    this.showSuccess = true;
  }

  closeSuccess() {
    this.showSuccess = false;
    this.router.navigate(['/PostList']);
  }

  isPro(): boolean {
    return sessionStorage.getItem('isPro') === 'true';
  }
}
