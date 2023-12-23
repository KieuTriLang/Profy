import { Component, Input } from '@angular/core';
import { Alert } from '../../../interfaces/Alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  @Input() data !: Alert;

}
