import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './ui/components/header/header.component';
import { CardInfoComponent } from './ui/components/card-info/card-info.component';
import { FormSignInComponent } from './ui/components/form-sign-in/form-sign-in.component';
import { FormSignUpComponent } from './ui/components/form-sign-up/form-sign-up.component';
import { CardVisitDetailComponent } from './ui/components/card-visit-detail/card-visit-detail.component';
import { FormCardVisitComponent } from './ui/components/form-card-visit/form-card-visit.component';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CardService } from './services/card.service';
import { LoadingComponent } from './ui/components/loading/loading.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, map } from 'rxjs';
import { Card } from './interfaces/Card';
import { AlertComponent } from './ui/components/alert/alert.component';
import { Alert } from './interfaces/Alert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    CardInfoComponent,
    FormSignInComponent,
    FormSignUpComponent,
    CardVisitDetailComponent,
    FormCardVisitComponent,
    LoadingComponent,
    AlertComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Profy';

  isOpenedForm: boolean = false;
  typeForm: string = '';
  page: number = 1;
  totalPage: number = 0;

  searchText = new FormControl();
  searchModal = { fieldName: '', value: '' };

  constructor(
    public authService: AuthService,
    private cardService: CardService
  ) {}

  items: Card[] = [];
  card!: any;
  loading: boolean = false;

  alertData!: Alert | null;

  ngOnInit(): void {
    this.authService.authenticatedState$.subscribe((val) => {
      if (val) {
        this.getCard(this.page);
      } else {
        this.items = [];
      }
    });
    this.searchText.valueChanges
      .pipe(
        map((i: any) => i),
        debounceTime(500)
      )
      .subscribe((value: string) => {
        const fieldName = new RegExp(/^\(([^)]+)\)/).exec(value);
        const valOfField = value.replace(/^\([a-zA-Z]*\)/, '');
        if (fieldName != null) {
          this.searchModal.fieldName = fieldName[1];
        } else {
          this.searchModal.fieldName = '';
        }
        this.searchModal.value = valOfField.trim();
        this.page = 1;
        this.items = [];
        this.getCard(this.page);
      });
  }

  getCard(page: number) {
    var params = new HttpParams().set('page', page);
    if (this.searchModal.fieldName != '' && this.searchModal.value != '') {
      params = new HttpParams().set('page', page)
      .set('fieldName', this.searchModal.fieldName)
      .set('value', this.searchModal.value);
    }
    this.loading = true;
    this.cardService.getAll(params).subscribe({
      next: (res) => {
        this.items = [...this.items, ...res.content];
        this.totalPage = res.totalPages;
        if (this.page < this.totalPage) {
          this.page++;
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  handleOpenForm(typeForm: string, cardId?: string) {
    if (cardId != undefined) {
      this.card = this.items.find((c) => c.id == cardId);
    }
    if (typeForm == '') {
      this.isOpenedForm = false;
      this.card = null;
    } else {
      this.isOpenedForm = true;
    }
    this.typeForm = typeForm;
  }

  closeForm() {
    this.typeForm = '';
    this.isOpenedForm = false;
    this.card = null;
  }

  handleDeleteCard(cardId: string) {
    this.items = this.items.filter((i) => i.id != cardId);
  }
  handleCreateCard(card: Card) {
    this.items = [card, ...this.items];
  }
  handleUpdateCard(card: Card) {
    this.items = this.items.map((i) => {
      if (i.id == card.id) {
        return card;
      } else {
        return i;
      }
    });
    this.card = null;
  }
  handleScroll(e: any) {
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    const clientHeight = e.target.clientHeight;

    if (this.loading == false && this.page <= this.totalPage) {
      if (scrollHeight - (scrollTop + clientHeight) < 150) {
        this.getCard(this.page);
      }
    }
  }

  handleAlert(data: Alert) {
    this.alertData = data;
    setTimeout(()=>{
      this.alertData = null;
    },7500)
  }
}
