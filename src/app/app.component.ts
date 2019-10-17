import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IListItem } from './store/models/item.model';

import * as ReceiptActions from './store/actions/receipt.actions';

import { availableItems } from './store/models/available-items';
import { AppState } from './store/models/app-state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedItemsList$: Observable<Array<IListItem>>;

  constructor(
    private store: Store<AppState>
  ) {
    this.selectedItemsList$ = this.store.select('receipt');
  }

  get availableItems() {
    return availableItems;
  }

  selectionMade(selection: IListItem) {
    console.log(selection);
    this.store.dispatch(new ReceiptActions.SelectAction(selection));
  }

  resetSelections() {
    this.store.dispatch(new ReceiptActions.ResetAction());
  }

  ngOnInit() {
    this.store.select(store => store.receipt);
    // this.selectedItemsList$.subscribe( (yep) => {
    //   this.theList = yep;
    // });
  }
}
