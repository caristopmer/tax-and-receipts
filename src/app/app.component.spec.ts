import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaxCalculatorHelper } from './services/tax-calculator/tax-calculator.helper';
import { Store } from '@ngrx/store';
import { TestStore } from './testing/test-store';
import { IListItem } from './store/models/item.model';
import * as ReceiptActions from './store/actions/receipt.actions';

const MockTaxHelper = {
  computeTotalSalesTax: () => 1,
  computeTotalPrice: () => 1,
  priceWithTax: (item: IListItem) => 1,
  computeSalesTax: (item: IListItem) => 1,
  computeImportDuty: (item: IListItem) => 1
};

const TestItem: IListItem = {
  name: 'Test Item', price: 99, exempt: false, imported: false
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: TaxCalculatorHelper, useValue: MockTaxHelper },
        { provide: Store, useClass: TestStore }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('selectionMade should dispatch an action to the store', inject([Store], (store) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    spyOn(store, 'dispatch');
    app.selectionMade(TestItem);
    expect(store.dispatch).toHaveBeenCalledWith(new ReceiptActions.SelectAction(TestItem));
  }));

  it('checkout should call the taxHelper\'s compute functions and set the component variables',
    inject([TaxCalculatorHelper], (taxHelper) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      spyOn(taxHelper, 'computeTotalSalesTax');
      spyOn(taxHelper, 'computeTotalPrice');

      expect(app.totalSalesTax).toBe(null);
      expect(app.totalPrice).toBe(null);
      expect(app.checkedOut).toBe(false);

      app.checkout();
      expect(app.totalSalesTax).not.toBe(null);
      expect(app.totalPrice).not.toBe(null);
      expect(app.checkedOut).toBe(true);
      expect(taxHelper.computeTotalSalesTax).toHaveBeenCalled();
      expect(taxHelper.computeTotalPrice).toHaveBeenCalled();
  }));

  it('resetSelections should dispatch a reset action to the store and reset component variables',
    inject([Store], (store) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      spyOn(store, 'dispatch');

      app.checkout();
      expect(app.totalSalesTax).not.toBe(null);
      expect(app.totalPrice).not.toBe(null);
      expect(app.checkedOut).toBe(true);

      app.resetSelections();
      expect(app.totalSalesTax).toBe(null);
      expect(app.totalPrice).toBe(null);
      expect(app.checkedOut).toBe(false);
      expect(store.dispatch).toHaveBeenCalledWith(new ReceiptActions.ResetAction());
  }));

  it('checkoutPrice should return the correct price based on if the user has checked out or not', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app.checkoutPrice(TestItem)).toBe(99);
    app.checkout();
    expect(app.checkoutPrice(TestItem)).toBe(1);
  });
});
