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

  ngOnInit() {
    this.store.select(store => store.receipt);
  }

  selectionMade(selection: IListItem) {
    this.store.dispatch(new ReceiptActions.SelectAction(selection));
  }

  resetSelections() {
    this.store.dispatch(new ReceiptActions.ResetAction());
  }

  prefillBasketOne() {
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[0]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[1]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[2]));
  }

  prefillBasketTwo() {
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[3]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[4]));
  }

  prefillBasketThree() {
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[5]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[6]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[7]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[8]));
  }
}
