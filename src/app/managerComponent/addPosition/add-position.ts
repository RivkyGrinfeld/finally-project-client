import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

import { inject } from '@angular/core';
import { BranchesService } from '../../service/branches-service';
import { Branch } from '../../model/Branch';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-position',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-position.html',
  styleUrls: ['./add-position.scss'],
})
export class AddPosition {

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitPosition = new EventEmitter<any>();

  positionForm: FormGroup;

  branchService: BranchesService = inject(BranchesService)
  branches:Array<Branch> = new Array<Branch>();

  constructor(private fb: FormBuilder) {
    this.positionForm = this.fb.group({
      branchId: ['הייטק', Validators.required],
      description: ['', Validators.required]
    });
  }

  close() {
    this.closeModal.emit();
  }
  //  if (this.branchForm.valid) {
  //     this.submitBranch.emit(this.branchForm.value); // שולח את הערכים להורה
  //     this.closeModal.emit(); // סוגר מודאל
  //   }
  submit() {
    if (this.positionForm.valid) {
      this.submitPosition.emit(this.positionForm.value);
      //this.close();
      this.closeModal.emit();
    }
  }
  async ngOnInit(){
    this.branches = await firstValueFrom(this.branchService.Init());
  }

}
