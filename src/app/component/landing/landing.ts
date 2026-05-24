import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})
export class LandingComponent {
  currentStep = 1;
  isDarkMode = false;

  constructor(private router: Router) {
    setInterval(() => {
      this.currentStep = this.currentStep >= 4 ? 1 : this.currentStep + 1;
    }, 3000);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  goToLogin() {
    this.router.navigate(['/Login']);
  }

  goToRegister() {
    this.router.navigate(['/Create-customer']);
  }
}
