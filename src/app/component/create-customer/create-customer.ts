import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { CustomersService } from '../../service/customers-service';
import { Branch } from '../../model/Branch';
import { BranchesService } from '../../service/branches-service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  standalone: true, // חובה
  selector: 'app-create-customer',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-customer.html',
  styleUrls: ['./create-customer.scss'],
  animations: [
    trigger('stepAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('300ms ease', style({ opacity: 1, transform: 'none' }))
      ])
    ])
  ]
})
export class CreateCustomer {
  step: number = 1;

  personalForm: FormGroup;
  creditForm: FormGroup;
  fileForm: FormGroup;
  verifyForm: FormGroup;
  customerService = inject(CustomersService);
   branchService = inject(BranchesService)
  branches!: Branch[]
  constructor(private fb: FormBuilder,private router: Router) {
    this.personalForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bornDate: [''],
      city: ['', Validators.required],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      branchId: ['', Validators.required],
      statusId: ['', Validators.required],
      numOfChildren: ['', Validators.min(0)],
    });

    this.creditForm = this.fb.group({
      cardNumber: ['', Validators.required],
      exp: ['', Validators.required],
      cvv: ['', Validators.required]
    });

    this.fileForm = this.fb.group({
      file: [null, Validators.required]
    });

    this.verifyForm = this.fb.group({
      code: ['', Validators.required]
    });
  }

 async ngOnInit() {
    this.branches = await firstValueFrom(this.branchService.Init())
  }
  next() {
    this.step++;
  }

  prev() {
    this.step--;
  }
onMaritalStatusChange(event: any) {
    const status = event.target.value;
    const numOfChildrenControl = this.personalForm.get('numOfChildren');
    if (status === '1') {
      numOfChildrenControl?.clearValidators();
    } else {
      numOfChildrenControl?.setValidators([Validators.required, Validators.min(0)]);
    }
    numOfChildrenControl?.updateValueAndValidity();
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileForm.patchValue({ file });
  }


submit() {
  const formData = new FormData();

  // מוסיף את הנתונים מהטופס ל-FormData
  const personalData = this.personalForm.value;

  for (const key in personalData) {
    if (personalData.hasOwnProperty(key)) {
      formData.append(key, personalData[key]);
    }
  }

  // הוספת השדות שאתה רוצה לשלוח כפי שהם, בלי שהמשתמש ימלא אותם
  const fileInput = this.fileForm.controls['file'].value;
  if (fileInput) {
    const fileName = fileInput.name;  // שם הקובץ
    const fileUrl = URL.createObjectURL(fileInput);  // יוצרים URL זמני לקובץ

    // הוספת השדות ל-FormData
    formData.append('fileName', fileName);  // שם הקובץ
    formData.append('url', fileUrl);        // כתובת ה-URL של הקובץ

    // אם יש לך רשימות של Applies ו-Tests, תוכל להוסיף אותן גם:
    // let applies = []; // כאן תוכל לשים את הערכים של Applies, אם יש
    // let tests = [];   // כאן תוכל לשים את הערכים של Tests, אם יש

    // הוספת השדות כ-JSON (אם הערכים שלך הם מערכים או אובייקטים)
    formData.append('applies', JSON.stringify([]));
    formData.append('tests', JSON.stringify([]));
    formData.append('cvFile', fileInput, fileInput.name)
  }

  // שולח את הנתונים לשרת
  this.customerService.addCustomer(formData).subscribe(
    response => console.log('Customer saved', response),
    error => console.error('Error', error),
    
  );
this.router.navigate(['/Login'])
}
}
