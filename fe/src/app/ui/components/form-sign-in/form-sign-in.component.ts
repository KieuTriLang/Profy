import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Alert } from '../../../interfaces/Alert';

@Component({
  selector: 'app-form-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-sign-in.component.html',
  styleUrl: './form-sign-in.component.scss'
})
export class FormSignInComponent implements OnInit{
  @Output() openForm = new EventEmitter<string>();
  @Output() sendAlert = new EventEmitter<Alert>();

  form!: FormGroup;


  constructor(private fb: FormBuilder,private authService:AuthService){

  }
  ngOnInit(): void {
      this.form = this.fb.group({
        username: ['',[Validators.required]],
        password: ['',[Validators.required,Validators.minLength(8)]]
      })
  }
  openAuthForm(typeFrom: string){
    this.openForm.emit(typeFrom);
  }

  submit() {
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;

      this.authService.signIn(username, password).subscribe({
        next: (res) => {
          localStorage.setItem("prftoken",res["access_token"])
          this.authService.authenticatedState.next(true);
          this.sendAlert.emit({type:'noti',message:'Welcome back!!'})
          this.openAuthForm('');
        },
        error: (error) => {
          this.sendAlert.emit({type:'danger',message:error?.message})
        },
      });
    }
  }
}
