import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-branch',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-branch.html',
  styleUrls: ['./add-branch.scss'],
})
export class AddBranch {
 @Output() closeModal = new EventEmitter<void>();
  @Output() submitBranch = new EventEmitter<any>();

  branchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.branchForm = this.fb.group({
      // id: ['', Validators.required],
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
    if (this.branchForm.valid) {
      this.submitBranch.emit(this.branchForm.value);
      //this.close();
      this.closeModal.emit();
    }
  }
}


