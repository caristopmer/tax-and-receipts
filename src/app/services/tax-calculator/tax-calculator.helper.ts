import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/store/models/app-state.model';
import { IListItem } from 'src/app/store/models/item.model';
import { isNgTemplate } from '@angular/compiler';


@Injectable()
export class TaxCalculatorHelper {
    private SalesTaxRate = .10;
    private ImportDutyRate = .05;

    constructor(private store: Store<AppState>) {}

    computeTotalSalesTax(): number {
        let cart;
        let totalTax = 0;
        this.store.pipe(select('receipt'), take(1)).subscribe( val => cart = val );
        cart.forEach(item => {
            totalTax += this.computeSalesTax(item);
            totalTax += this.computeImportDuty(item);
        });
        return totalTax;
    }

    computeTotalPrice(): number {
        let cart;
        this.store.pipe(select('receipt'), take(1)).subscribe( val => cart = val );
        const subtotal = cart.reduce((total, current) =>  total + current.price, 0);
        return subtotal + this.computeTotalSalesTax();
    }

    priceWithTax(item: IListItem): number {
        return item.price + this.computeSalesTax(item) + this.computeImportDuty(item);
    }

    computeSalesTax(item: IListItem): number {
        return !item.exempt ? this.roundUp(item.price * this.SalesTaxRate) : 0;
    }

    computeImportDuty(item: IListItem): number {
        return item.imported ? this.roundUp(item.price * this.ImportDutyRate) : 0;
    }

    roundUp(price: number): number {
        const transformedPrice = Math.round(price * 100);
        const remainder = transformedPrice % 5;
        return !remainder ? price : (transformedPrice + (5 - remainder)) / 100;
    }
}
