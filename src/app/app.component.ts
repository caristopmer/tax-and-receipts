import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IListItem } from './store/models/item.model';

import * as ReceiptActions from './store/actions/receipt.actions';

import { availableItems } from './store/models/available-items';
import { AppState } from './store/models/app-state.model';
import { TaxCalculatorHelper } from './services/tax-calculator/tax-calculator.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedItemsList$: Observable<Array<IListItem>>;
  checkedOut = false;
  totalSalesTax: number;
  totalPrice: number;

  constructor(
    private store: Store<AppState>,
    private taxHelper: TaxCalculatorHelper
  ) {
    this.selectedItemsList$ = this.store.select('receipt');
  }

  get availableItems() {
    return availableItems;
  }

  get totalTaxes() {
    return this.taxHelper.computeTotalSalesTax();
  }

  get finalTotal() {
    return this.taxHelper.computeTotalPrice();
  }

  ngOnInit() {
    this.store.select(store => store.receipt);
  }

  selectionMade(selection: IListItem) {
    this.store.dispatch(new ReceiptActions.SelectAction(selection));
  }

  resetSelections() {
    this.store.dispatch(new ReceiptActions.ResetAction());
    this.totalSalesTax = null;
    this.totalPrice = null;
    this.checkedOut = false;
  }

  prefillBasketOne() {
    this.resetSelections();
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[0]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[1]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[2]));
  }

  prefillBasketTwo() {
    this.resetSelections();
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[3]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[4]));
  }

  prefillBasketThree() {
    this.resetSelections();
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[5]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[6]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[7]));
    this.store.dispatch(new ReceiptActions.SelectAction(availableItems[8]));
  }

  checkoutPrice(item: IListItem): number {
    return this.checkedOut ? this.taxHelper.priceWithTax(item) : item.price ;
  }

  checkout() {
    this.totalSalesTax = this.taxHelper.computeTotalSalesTax();
    this.totalPrice = this.taxHelper.computeTotalPrice();
    this.checkedOut = true;
  }
}
