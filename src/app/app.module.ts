import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { receiptReducer } from './reducers/receipt.reducer';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ receipt: receiptReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
