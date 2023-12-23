import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../../services/card.service';
import { Card } from '../../../interfaces/Card';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Alert } from '../../../interfaces/Alert';

@Component({
  selector: 'app-form-card-visit',
  standalone: true,
  imports: [FormsModule,DragDropModule],
  templateUrl: './form-card-visit.component.html',
  styleUrl: './form-card-visit.component.scss',
})
export class FormCardVisitComponent implements OnInit {

  @Input() isUpdateForm : boolean = false;
  @Input() cardId!:string;
  @Output() createdData = new EventEmitter<Card>();
  @Output() updatedData = new EventEmitter<Card>();
  @Output() sendAlert = new EventEmitter<Alert>();

  datas: any[] = [{ fieldName: '', value: '' }];

  constructor(private cardService:CardService){}
  ngOnInit(): void {
      if(this.cardId!= null){
        this.cardService.get(this.cardId).subscribe({
          next: (res:Card) =>{
            this.datas = [];
            for (const [key,value] of res.infos) {
              this.datas = [...this.datas,{ fieldName: key, value: value }]
            }
          },
          error: (err) =>{

          }
        })
      }
  }
  addField() {
    this.datas = [...this.datas, { fieldName: '', value: '' }];
  }
  removeItem(index: number) {
    this.datas.splice(index, 1);
  }

  submit() {
    const result = this.convertToMap(this.datas);
    if(result.size > 0){
      if(this.isUpdateForm){
        this.cardService.update(this.cardId,result).subscribe({
          next: (res:Card) =>{
            this.updatedData.emit(res);
            this.sendAlert.emit({type:'noti',message:'Update successfully.'})
          },
          error: err =>{
            this.sendAlert.emit({type:'danger',message:'Update fail.'})
          }
        })
      }else{
        this.cardService.create(result).subscribe({
        next: (res:Card) =>{
            this.createdData.emit(res);
            this.sendAlert.emit({type:'noti',message:'Create successfully.'})
        },
        error: (err) =>{
          this.sendAlert.emit({type:'noti',message:'Create fail.'})
        }
      });
      }
      
    }
  }

  convertToMap(inputs: any[]): Map<string, string> {
    var result = new Map<string, string>();
    inputs.forEach((item) => {
      if (item.fieldName != '' && item.value != ''){
        result.set(item.fieldName, item.value);
      }
    });
    return result;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.datas, event.previousIndex, event.currentIndex);
  }
}
