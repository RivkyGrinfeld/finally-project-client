import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-enter',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './enter.html',
  styleUrl: './enter.scss',
})
export class Enter {
 password!: string
 name!:string
  logIn() {

    // this.help = this.srv.getAllCustomer().find(x => x.password == this.password && x.name == this.name) ?? new Customer()
    
    // this.srv.currentUser?.set(this.help)
    // if (this.srv.currentUser().id == 0)
    //   alert("try again")
    // else
    // this.router.navigate(["home"], { relativeTo: this.router.config.values.prototype })
  }

}
