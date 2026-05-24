import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../service/user-service';
import { first, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { CustomersService } from '../../service/customers-service';
import { CompaniesService } from '../../service/companies-service';
import { ManagersService } from '../../service/managers-service';
@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'],
})


export class Nav {
  userService = inject(UserService);
    managerService = inject(ManagersService);
    companyService = inject(CompaniesService);
    customerService = inject(CustomersService);
  id: number = Number(localStorage.getItem('userId')) ?? 0;
  name:Signal<string> = computed(()=>{
  return  this.userService.getNameById().charAt(0)
  })
  router = inject(Router);
  async ngOnInit() {
    await this.userService.initTry(); // חשוב!
   await this.userService.setStatusById(this.id);
   await this.userService.setId();
  }
  logout() {
    localStorage.removeItem('userId');
    this.userService.status.set(0);
     // איפוס ה־signal
     this.userService.id.set("")
     this.userService.currentUser.set(null)
    this.router.navigate(['/Login']);
  }
  
  
}

