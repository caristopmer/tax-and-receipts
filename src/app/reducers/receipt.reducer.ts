import { Action } from '@ngrx/store';
import { IListItem } from '../items/item';

// const test: IListItem[];

export function receiptReducer(state: string = 'Hi There!', action: Action) {
    console.log(action.type, state);

    switch (action.type) {
        case 'something1':
            break;
        case 'something2':
            break;
        default:
            return state;
    }

}
