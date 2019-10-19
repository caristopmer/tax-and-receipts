import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/models/app-state.model';
import { IListItem } from 'src/app/store/models/item.model';


@Injectable()
export class TaxCalculatorHelper {
    private SalesTaxRate = .10;
    private ImportDutyRate = .05;

    constructor(private store: Store<AppState>) {}

    computeTotalSalesTax(): number {
        let cart: Array<IListItem>;
        let totalTax = 0;
        this.store.select('receipt').subscribe( val => cart = val );
        cart.forEach(item => {
            totalTax += this.computeSalesTax(item);
            totalTax += this.computeImportDuty(item);
        });
        return this.priceScrubber(totalTax);
    }

    computeTotalPrice(): number {
        let cart: Array<IListItem>;
        this.store.select('receipt').subscribe( val => cart = val );
        const subtotal = cart.reduce((total, current) =>  total + current.price, 0);
        return subtotal + this.computeTotalSalesTax();
    }

    priceWithTax(item: IListItem): number {
        const priceWithTax = item.price + this.computeSalesTax(item) + this.computeImportDuty(item);
        return this.priceScrubber(priceWithTax);
    }

    computeSalesTax(item: IListItem): number {
        const salesTax = !item.exempt ? this.roundUp(item.price * this.SalesTaxRate) : 0;
        return this.priceScrubber(salesTax);
    }

    computeImportDuty(item: IListItem): number {
        const importDuty = item.imported ? this.roundUp(item.price * this.ImportDutyRate) : 0;
        return this.priceScrubber(importDuty);
    }

    roundUp(price: number): number {
        const transformedPrice = Math.round(price * 100);
        const remainder = transformedPrice % 5;
        const roundedUp = !remainder ? transformedPrice : (transformedPrice + (5 - remainder));
        return roundedUp / 100;
    }

    private priceScrubber(num: number): number {
        return +num.toFixed(2);
    }
}
