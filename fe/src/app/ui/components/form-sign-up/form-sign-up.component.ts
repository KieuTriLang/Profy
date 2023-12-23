import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Alert } from '../../../interfaces/Alert';

@Component({
  selector: 'app-form-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-sign-up.component.html',
  styleUrl: './form-sign-up.component.scss'
})
export class FormSignUpComponent implements OnInit {
  
  @Output() openForm = new EventEmitter<string>();
  @Output() sendAlert = new EventEmitter<Alert>();
  form!: FormGroup;

  constructor(private fb:FormBuilder,private authService:AuthService){

  }
  ngOnInit(): void {
      this.form = this.fb.group({
        username:['',[Validators.required]],
        password:['',[Validators.required,Validators.minLength(8)]],
        confirmPassword:['',[Validators.required,Validators.minLength(8)]]
      })
  }
  openAuthForm(typeFrom: string){
    this.openForm.emit(typeFrom);
  }

  submit() {
    if (this.form.invalid || !this.matchPassword()) {
      return;
    }
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    this.authService.signUp(username, password).subscribe({
      next: (res) => {
        this.sendAlert.emit({type:'noti',message:'Sign up successfully.'})
        this.openAuthForm('sign-in');
      },
      error: (error) => {
        this.sendAlert.emit({type:'danger',message:'Sign up fail.'})
      },
    });
    
  }
  matchPassword(): boolean {
    return (
      this.form.get('password')?.value ===
      this.form.get('confirmPassword')?.value
    );
  }
}
