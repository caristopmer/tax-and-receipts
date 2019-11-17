import { Action } from '@ngrx/store';
import { IListItem } from '../models/item.model';

export enum ReceiptActionTypes {
  SELECT = '[RECEIPT] Select',
  REMOVE = '[RECEIPT] Remove',
  RESET = '[RECEIPT] Reset'
}

export class SelectAction implements Action {
  readonly type = ReceiptActionTypes.SELECT;

  constructor(public payload: IListItem) {}
}

export class RemoveAction implements Action {
  readonly type = ReceiptActionTypes.REMOVE;

  constructor(public payload: IListItem) {}
}

export class ResetAction implements Action {
  readonly type = ReceiptActionTypes.RESET;
}

export type ReceiptAction = SelectAction | RemoveAction | ResetAction;
