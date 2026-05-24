import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user-service';
import { firstValueFrom } from 'rxjs';
import { ManagersService } from '../../service/managers-service';
import { CompaniesService } from '../../service/companies-service';
import { CustomersService } from '../../service/customers-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password?: string;

  userService = inject(UserService);
  managerService = inject(ManagersService);
  companyService = inject(CompaniesService);
  customerService = inject(CustomersService);


  constructor(private router: Router) { }

  // async onSubmit() {

  //   if (this.username && this.password) {

  //     // אפשר להוסיף כאן קריאת API לבדוק את שם המשתמש והסיסמה
  //     let id = (await firstValueFrom(this.userService.isValid(this.password, this.username))).toString()
  //     if (id) {
  //       localStorage.setItem('userId', id)
  //       this.router.navigate(['/dashboard']);
  //     }
  //     else {
  //       alert('Please enter username and password');
  //     }
  //   }
  // }
  async onSubmit() {

    if (this.username && this.password) {

      const id = await firstValueFrom(
        this.userService.isValid(this.password, this.username)
      );

      if (id) {
        localStorage.setItem('userId', id.toString());

        await this.userService.initTry(); // טוען משתמשים
        // this.userService.setStatusById(Number(id)); // מעדכן signal
        await this.userService.setStatusAfterLogin(Number(id));
        this.userService.setId()
        this.router.navigate(['/dashboard']);
      } else {
        alert('Please enter username and password');
      }
    }
  }
}
