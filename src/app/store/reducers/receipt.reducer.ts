import { Action } from '@ngrx/store';
import { IListItem } from '../models/item.model';
import { ReceiptAction, ReceiptActionTypes } from '../actions/receipt.actions';

export type Action = ReceiptAction;

const defaultState: Array<IListItem> = [];

export function ReceiptReducer(state: Array<IListItem> = defaultState, action: ReceiptAction) {
  switch (action.type) {
    case ReceiptActionTypes.SELECT:
      return [...state, action.payload];
    case ReceiptActionTypes.RESET:
      return defaultState;
    default:
      return state;
  }
}
