import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../shared/registration.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  detailsForm!: FormGroup

  get email() {
    return this.detailsForm.get('email');
  }

  public states = [
    {name: 'Andhra Pradesh', value: 'Andhra Pradesh'},
    {name: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
    {name: 'Assam', value: 'Assam'},
    {name: 'Bihar', value: 'Bihar'},
    {name: 'Chhattisgarh', value: 'Chhattisgarh'},
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

  constructor(private fb: FormBuilder, private _registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      dob: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      state: [''],
      city: [''],
      pinCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    }) 
  }

  onSubmit() {
    console.log(this.detailsForm.value);
    this._registrationService.register(this.detailsForm.value)
      .subscribe(
        response => console.log('Success', response),
        error => console.error('Error', error)
      )
  }


}
// Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur'
// 'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttarakhand','Uttar Pradesh','West Bengal
