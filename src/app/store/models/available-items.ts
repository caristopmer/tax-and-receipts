import { IListItem } from './item.model';

export const availableItems: IListItem[] = [
  {
    name: '1 16lb Bag of Skittles',
    price: 16.00,
    exempt: true,
    imported: false
  },
  {
    name: '1 Walkman',
    price: 99.99,
    exempt: false,
    imported: false
  },
  {
    name: '1 Bag of Microwave Popcorn',
    price: 0.99,
    exempt: true,
    imported: false
  },
  {
    name: '1 Imported Bag of Vanilla-Hazelnut Coffee',
    price: 11.00,
    exempt: true,
    imported: true
  },
  {
    name: '1 Imported Vespa',
    price: 15001.25,
    exempt: false,
    imported: true
  },
  {
    name: '1 Imported Crate of Almond Snickers',
    price: 75.99,
    exempt: true,
    imported: true
  },
  {
    name: '1 Discman',
    price: 55.00,
    exempt: false,
    imported: false
  },
  {
    name: '1 Imported Bottle of Wine',
    price: 10.00,
    exempt: false,
    imported: true
  },
  {
    name: '1 300# Bag of Fair-Trade Coffee',
    price: 997.99,
    exempt: true,
    imported: false
  }
];
