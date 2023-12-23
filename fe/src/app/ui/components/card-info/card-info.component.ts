import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../../interfaces/Card';
import { FilterUrlPipe } from '../../pipes/filter-url.pipe';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [FilterUrlPipe],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss',
})
export class CardInfoComponent implements OnInit {
  @Input() card!: Card;

  ngOnInit(): void {}
}
