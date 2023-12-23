import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../../interfaces/Card';
import { FilterUrlPipe } from '../../pipes/filter-url.pipe';
import { CardService } from '../../../services/card.service';
import { Alert } from '../../../interfaces/Alert';

@Component({
  selector: 'app-card-visit-detail',
  standalone: true,
  imports: [FilterUrlPipe],
  templateUrl: './card-visit-detail.component.html',
  styleUrl: './card-visit-detail.component.scss',
})
export class CardVisitDetailComponent implements OnInit {
  @Input() card!: Card;
  @Output() openForm = new EventEmitter<string>();
  @Output() deleteCard = new EventEmitter<string>();
  @Output() sendAlert = new EventEmitter<Alert>();

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}
  delete() {
    this.cardService.delete(this.card.id).subscribe({
      next: res =>{
        this.deleteCard.emit(this.card.id);
        this.sendAlert.emit({type:'noti',message:'Delete successfully.'})
      },
      error: err=>{
        this.sendAlert.emit({type:'danger',message:'Delete Fail.'})

      }
    })
  }

  openEditForm() {
    this.openForm.emit('card-form');
  }
}
