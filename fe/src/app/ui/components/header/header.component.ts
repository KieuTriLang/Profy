import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Alert } from '../../../interfaces/Alert';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() openForm = new EventEmitter<string>();
  @Output() sendAlert = new EventEmitter<Alert>();

  isAuthenticated : boolean = false;
  constructor(public authService:AuthService){

  }

  openAuthForm(typeFrom: string){
    this.openForm.emit(typeFrom);
    
  }

  logout(){
    
    this.authService.logout().subscribe({
      next: res =>{
        localStorage.removeItem("prftoken");
        this.authService.authenticatedState.next(false);
        this.sendAlert.emit({type:'noti',message:'Logout successfully.'})
      },
      error: err =>{
        this.sendAlert.emit({type:'danger',message:'Logout fail.'})
      }
    });
  }

}
