import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReceiptReducer } from './store/reducers/receipt.reducer';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ receipt: ReceiptReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
