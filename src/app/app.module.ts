import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Store
import { StoreModule } from '@ngrx/store';
import { ReceiptReducer } from './store/reducers/receipt.reducer';

// Components
import { AppComponent } from './app.component';

// Helpers
import { TaxCalculatorHelper } from './services/tax-calculator/tax-calculator.helper';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ receipt: ReceiptReducer})
  ],
  providers: [TaxCalculatorHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
