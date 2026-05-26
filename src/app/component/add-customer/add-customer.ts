import { Component, inject } from '@angular/core';
import { CustomersService } from '../../service/customers-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Branch } from '../../model/Branch';
import { BranchesService } from '../../service/branches-service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-add-customer',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-customer.html',
  styleUrls: ['./add-customer.scss'],
})
export class AddCustomer {
  selectedFile: File | null = null;
  branchService = inject(BranchesService)
  branches!: Branch[]

  constructor(private customerService: CustomersService) { }
  async ngOnInit() {
    this.branches = await firstValueFrom(this.branchService.Init())
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitCustomer(formValues: any) {
    const formData = new FormData();


    formData.append('firstName', formValues.firstName);
    formData.append('lastName', formValues.lastName);
    formData.append('email', formValues.email);
    formData.append('id', formValues.id);
    formData.append('phone', formValues.phone);
    formData.append('bornDate', formValues.bornDate);
    formData.append('city', formValues.city);
    formData.append('address', formValues.address);
    formData.append('numOfChildren', formValues.numOfChildren);
    formData.append('branchId', formValues.branchId);
    formData.append('userName', formValues.userName);
    formData.append('password', formValues.password);
    formData.append('fileName', "");
    formData.append('url', "");
    formData.append('statusId', formValues.statusId);
    sessionStorage.setItem('customerId', JSON.stringify(formValues.id));

    // localStorage.setItem('customer')
    // הוספת שדות טקסט
    // formData.append('firstName', formValues.firstName);
    // formData.append('lastName', formValues.lastName);
    // formData.append('email', formValues.email);
    // formData.append('id', formValues.id);
    // formData.append('bornDate', formValues.bornDate);
    // formData.append('city', formValues.city);
    // formData.append('adress', formValues.adress);
    // formData.append('numOfChildren', formValues.numOfChildren);
    // formData.append('branchId', formValues.branchId);
    // formData.append('city', formValues.city);
    // // formData.append('fileName', formValues.branchId);
    // formData.append('userName', formValues.userName);
    // formData.append('password', formValues.password);
    // formData.append('fileName', "");
    // formData.append('url', "");
    // formData.append('statusId', formValues.statusId);

    // הוספת הקובץ אם נבחר
    if (this.selectedFile) {
      formData.append('cvFile', this.selectedFile, this.selectedFile.name);
    }

    this.customerService.addCustomer(formData).subscribe(
      response => console.log('Customer saved', response),
      error => console.error('Error', error)
    );

  }
}
