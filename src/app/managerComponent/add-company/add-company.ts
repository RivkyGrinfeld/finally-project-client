import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompaniesService } from '../../service/companies-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-company.html',
  styleUrls: ['./add-company.scss']
})
export class AddCompany {

  companyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private companyService: CompaniesService,
    private router: Router
  ) {
    this.companyForm = this.fb.group({
      // id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit(): void {
    if (this.companyForm.valid) {
      this.companyService.addCompany(this.companyForm.value)
        .subscribe(() => {
          this.router.navigate(['/companiesList']);
        });
    }
  }
}
