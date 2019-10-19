import { TestBed, async, inject } from '@angular/core/testing';
import { TaxCalculatorHelper } from './tax-calculator.helper';
import { TestStore } from '../../testing/test-store';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';

const TestSelections1 = {
    receipt: [
        {name: 'Shake', price: 10.00, exempt: false, imported: false},
        {name: 'and', price: 17.99, exempt: false, imported: true},
        {name: 'Bake', price: 99.97, exempt: true, imported: true}
    ]
};

const TestSelections2 = {
    receipt: [
        {name: 'Banana', price: 4390.00, exempt: true, imported: false},
        {name: 'Steak', price: 7.99, exempt: false, imported: true}
    ]
};

describe('TaxCalculatorHelper', () => {
    let store: TestStore<AppState>;
    let taxHelper: TaxCalculatorHelper;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                TaxCalculatorHelper,
                { provide: Store, useClass: TestStore }
            ]
        });
        taxHelper = TestBed.get(TaxCalculatorHelper);
    }));

    beforeEach(inject([Store], (testStore: TestStore<AppState>) => {
        store = testStore;
        store.setState(TestSelections1);
    }));

    it('priceWithTax should correctly compute an item\'s total price with tax', () => {
        expect(taxHelper.priceWithTax(TestSelections1.receipt[0])).toBe(11);
        expect(taxHelper.priceWithTax(TestSelections2.receipt[1])).toBe(9.19);
    });

    it('computeSalesTax should correctly compute an item\'s sales tax', () => {
        expect(taxHelper.computeSalesTax(TestSelections1.receipt[0])).toBe(1);
        expect(taxHelper.computeSalesTax(TestSelections2.receipt[1])).toBe(.8);
        expect(taxHelper.computeSalesTax(TestSelections1.receipt[2])).toBe(0);
    });

    it('computeImportDuty should correctly compute an item\'s import duty', () => {
        expect(taxHelper.computeImportDuty(TestSelections1.receipt[0])).toBe(0);
        expect(taxHelper.computeImportDuty(TestSelections2.receipt[1])).toBe(.4);
        expect(taxHelper.computeImportDuty(TestSelections1.receipt[2])).toBe(5);
    });

    it('roundUp should correctly round cents up to the nearest nickel', () => {
        expect(taxHelper.roundUp(12.34)).toEqual(12.35);
        expect(taxHelper.roundUp(73.20)).toEqual(73.20);
        expect(taxHelper.roundUp(99.99)).toEqual(100);
    });
});
