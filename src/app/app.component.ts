import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IListItem } from './items/item';

import { availableItems } from './items/available-items';

interface AppState {
  selectedItems: IListItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  itemsList$: IListItem[];


  get availableItems() {
    return availableItems;
  }

  // constructor(
  //   private store: Store<AppState>
  // )
}
