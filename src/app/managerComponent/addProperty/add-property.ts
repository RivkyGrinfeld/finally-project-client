import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-property',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-property.html',
  styleUrl: './add-property.scss',
})
export class AddProperty {
 @Output() closeModal = new EventEmitter<void>();
  @Output() submitProperty = new EventEmitter<any>();

  propertyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.propertyForm = this.fb.group({
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
    if (this.propertyForm.valid) {
      this.submitProperty.emit(this.propertyForm.value);
      //this.close();
      this.closeModal.emit();
    }
  }
}
