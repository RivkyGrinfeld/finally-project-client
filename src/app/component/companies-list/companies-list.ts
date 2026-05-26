import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from '../../service/companies-service';
import { Companies } from '../../model/Companies';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCompany } from '../../managerComponent/add-company/add-company';
import { PostService } from '../../service/post-service';
import { log } from 'echarts/types/src/util/log.js';

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddCompany, ReactiveFormsModule],
  templateUrl: './companies-list.html',
  styleUrls: ['./companies-list.scss']
})
export class CompaniesList implements OnInit {

   companies: Companies[] = [];
  filteredCompanies: Companies[] = [];
  searchTerm: string = '';
  companiesWithNums: any[] = [];
  showModal: boolean = false;
  companyForm: FormGroup;
  postService = inject(PostService)
  constructor(
    private companyService: CompaniesService,
    private fb: FormBuilder
  ) {
    this.companyForm = this.fb.group({
       id: 0,//['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCompanies();
    this.companiesWithNums = this.companies.map((company) => ({
      ...company,
      num: this.postService.getNumOfPosts(company.id)
    }));
    console.log(this.companiesWithNums+"POSTS NUMS");
    alert(this.companiesWithNums.length + " חברות נמצאו!");
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
      this.filteredCompanies = data;
    });
  }

  filterCompanies(): void {
    this.filteredCompanies = this.companies.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.companiesWithNums = this.filteredCompanies.map((company) => ({
      ...company,
      num: this.postService.getNumOfPosts(company.id)
    }));
    
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.companyForm.reset();
  }

  submit(): void {
    if (this.companyForm.valid) {
      this.companyService.addCompany(this.companyForm.value)
        .subscribe(() => {
          this.loadCompanies();
          this.closeModal();
        });
    }
  }
}
