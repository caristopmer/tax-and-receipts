import { Action } from '@ngrx/store';
import { IListItem } from '../models/item.model';
import { availableItems } from '../models/available-items';
import { ReceiptAction, ReceiptActionTypes } from '../actions/receipt.actions';

export type Action = ReceiptAction;

const defaultState: Array<IListItem> = [];

export function ReceiptReducer(state: Array<IListItem> = defaultState, action: ReceiptAction) {
    console.log(action.type, state);


    // return state.push(availableItems.find( (item) => {
    //     return item.name === action.type;
    // }));

    switch (action.type) {
        case ReceiptActionTypes.SELECT:
            // return newState(state, { content: state.content.push(action.payload)});
            // return newState(state, { content: {name: 'sdf'}});
            return [...state, action.payload];
        case ReceiptActionTypes.RESET:
            return defaultState;
        default:
            return state;
    }

}
