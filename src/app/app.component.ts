import { Component } from '@angular/core';
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
export class AppComponent {
  selectedItemsList$: Observable<Array<IListItem>>;
  checkedOut = false;
  totalSalesTax: number = null;
  totalPrice: number = null;

  constructor(
    private store: Store<AppState>,
    private taxHelper: TaxCalculatorHelper
  ) {
    this.selectedItemsList$ = this.store.select('receipt');
  }

  /**
   * Returns the list of all availbale items.
   */
  get availableItems() {
    return availableItems;
  }

  /**
   * Returns the total tax amount for current selections, both sales and import duty.
   */
  get totalTaxes() {
    return this.taxHelper.computeTotalSalesTax();
  }

  /**
   * Returns the total cost of all selected item and their sales tax/duty.
   */
  get finalTotal() {
    return this.taxHelper.computeTotalPrice();
  }

  /**
   * Adds an item to the Store of the user's selections.
   * @param selection The item selected.
   */
  selectionMade(selection: IListItem) {
    this.store.dispatch(new ReceiptActions.SelectAction(selection));
  }

  /**
   * Removes an item from the Store of the user's selections.
   * @param selection The item unselected.
   */
  selectionRemoved(selection: IListItem) {
    this.store.dispatch(new ReceiptActions.RemoveAction(selection));
  }

  /**
   * Clears the store of the user's selected items and resets component variables.
   */
  resetSelections() {
    this.store.dispatch(new ReceiptActions.ResetAction());
    this.totalSalesTax = null;
    this.totalPrice = null;
    this.checkedOut = false;
  }

  /**
   * Resets user's selections and automatically selects the contents of
   * the problem's Shopping Basket 1.
   */
  prefillBasketOne() {
    this.resetSelections();
    this.selectionMade(availableItems[0]);
    this.selectionMade(availableItems[1]);
    this.selectionMade(availableItems[2]);
  }

  /**
   * Resets user's selections and automatically selects the contents of
   * the problem's Shopping Basket 2.
   */
  prefillBasketTwo() {
    this.resetSelections();
    this.selectionMade(availableItems[3]);
    this.selectionMade(availableItems[4]);
  }

  /**
   * Resets user's selections and automatically selects the contents of
   * the problem's Shopping Basket 3.
   */
  prefillBasketThree() {
    this.resetSelections();
    this.selectionMade(availableItems[5]);
    this.selectionMade(availableItems[6]);
    this.selectionMade(availableItems[7]);
    this.selectionMade(availableItems[8]);
  }

  /**
   * Returns either the item price or the item price including any tax or duty,
   * depending on if the user has checked out already.
   * @param item The item for which to display price.
   */
  checkoutPrice(item: IListItem): number {
    return this.checkedOut ? this.taxHelper.priceWithTax(item) : item.price ;
  }

  /**
   * Check out the user, computing their tax amounts and figuring the total price.
   */
  checkout() {
    this.totalSalesTax = this.taxHelper.computeTotalSalesTax();
    this.totalPrice = this.taxHelper.computeTotalPrice();
    this.checkedOut = true;
  }
}
