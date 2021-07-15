import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router} from '@angular/router';
import { IRegister } from 'src/register';
import { RegistrationService } from '../shared/registration.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  title: string = "Student's Form";
  detailsForm!: FormGroup;
  submitted: boolean = false;
  todayDate = new Date;
  disabled: boolean = false;

  get emails() {
    return this.detailsForm.get('email');
  }

  public states = [
    {name: 'Andhra Pradesh', value: 'Andhra Pradesh'},
    {name: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
    {name: 'Assam', value: 'Assam'},
    {name: 'Bihar', value: 'Bihar'},
    {name: 'Chhattisgarh', value: 'Chhattisgarh'},
    {name: 'Delhi', value: 'Delhi'},
    {name: 'Goa', value: 'Goa'},
    {name: 'Gujarat', value: 'Gujarat'},
    {name: 'Haryana', value: 'Haryana'},
    {name: 'Himachal Pradesh', value: 'Himachal Pradesh'},
    {name: 'Jharkhandh', value: 'Jharkhand'},
    {name: 'Karnataka', value: 'Karnataka'},
    {name: 'Kerala', value: 'Kerala'},
    {name: 'Madhya Pradesh', value: 'Madhya Pradesh'},
    {name: 'Maharashtra', value: 'Maharashtra'},
    {name: 'Manipur', value: 'Manipur'},
    {name: 'Meghalaya', value: 'Meghalaya'},
    {name: 'Mizoram', value: 'Mizoram'},
    {name: 'Nagaland', value: 'Nagaland'},
    {name: 'Odisha', value: 'Odisha'},
    {name: 'Punjab', value: 'Punjab'},
    {name: 'Rajasthan', value: 'Rajasthan'},
    {name: 'Sikkim', value: 'Sikkim'},
    {name: 'Tamil Nadu', value: 'Tamil Nadu'},
    {name: 'Telangana', value: 'Telangana'},
    {name: 'Tripura', value: 'Tripura'},
    {name: 'Uttarakhand', value: 'Uttarakhand'},
    {name: 'Uttar Pradesh', value: 'Uttar Pradesh'},
    {name: 'West Bengal', value: 'West Bengal'}
  ]

  getErrorMessage() {
    if (this.detailsForm.get('email')?.hasError('required')) {
      return ('You must enter a value');
    }
    return (this.detailsForm.get('email')?.hasError('email') ? 'Not a valid email' : '');
  }

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: IRegister, public dialogRef: MatDialogRef<FormsComponent>  ) { }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      dob: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    })
    
    if(this.data.id) {
      this.detailsForm.setValue({
        id: this.data.id,
        name: this.data.name,
        email: this.data.email,
        dob: this.data.dob,
        mobileNumber: this.data.mobileNumber,
        state: this.data.state,
        city: this.data.city,
        pinCode: this.data.pinCode
      });
    }
  }
  
  onSubmit() {
    this.save();    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if(this.detailsForm.errors){
      return;
    }
    else if(this.data && (this.data.id === this.detailsForm.value.id)) {
      this.dialogRef.close({id: this.detailsForm.value.id, name: this.detailsForm.value.name, email:this.detailsForm.value.email, mobileNumber: this.detailsForm.value.mobileNumber, dob: this.detailsForm.value.dob, state: this.detailsForm.value.state, city: this.detailsForm.value.city, pinCode: this.detailsForm.value.pinCode})
    }
    else {
      this.dialogRef.close({name: this.detailsForm.value.name, email:this.detailsForm.value.email, mobileNumber: this.detailsForm.value.mobileNumber, dob: this.detailsForm.value.dob, state: this.detailsForm.value.state, city: this.detailsForm.value.city, pinCode: this.detailsForm.value.pinCode})
    }
  }
}