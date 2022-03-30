
   
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Item } from './item.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Item[] = [];
  itemSelectedEvent: EventEmitter<Item> = new EventEmitter<Item>();
  itemChangedEvent: EventEmitter<Item[]> = new EventEmitter<Item[]>();
  itemListChangedEvent: Subject<Item[]> = new Subject<Item[]>();
  maxItemID: number;

  constructor(private http: HttpClient) {
    this.getItems();
  }

  getItems(): void {
    this
    .http
    .get<{message: string, items: Item[]}>('http://localhost:3000/items')
    .subscribe((response: any) => {
      this.items = response.items;
      this.maxItemID = this.getMaxID();
      this.items.sort(compareItemsByID);
      this.itemListChangedEvent.next(this.items.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getItem(id: string): Item {
    if (!this.items) {
      return null;
    }

    for (let item of this.items) {
      if (item.id === id) {
        return item;
      }
    }

    return null;
  }

  getMaxID(): number {
    let maxID = 0;
    for (let item of this.items) {
      let currentID = +item.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  addItem(item: Item): void {
    if (!item) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    item.id = '';

    this.http
    .post<{message: string, item: Item}>('http://localhost:3000/items', item, {headers: headers})
    .subscribe((response: any) => {
      this.items.push(response.item);
      this.items.sort(compareItemsByID);
      this.itemChangedEvent.next(this.items.slice());
    });
  }

  updateItem(originalItem: Item, newItem: Item): void {
    if (!originalItem || !newItem) {
      return;
    }

    const pos = this.items.findIndex(d => d.id === originalItem.id);

    if(pos < 0) {
      return;
    }

    newItem.id = originalItem.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strItem = JSON.stringify(newItem);

    this.http
    .put<{message: string}>(`http://localhost:3000/items/${originalItem.id}`, strItem, {headers: headers})
    .subscribe((response: any) => {
      this.getItems();
    });
  }

  deleteItem(item: Item): void {
    if (!item) {
      return;
    }

    const index = this.items.indexOf(item);
    if (index < 0) {
      return;
    }

    this.http.delete<{message: String}>(`http://localhost:3000/items/${item.id}`)
    .subscribe((response: any) => {
      this.getItems();
    })
  }

  storeItems(): void {
    let json = JSON.stringify(this.items);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
    .http
    .put<{message: string}>('http://localhost:3000/items', json, {
      headers: header
    }).subscribe(() => {
      this.itemChangedEvent.next(this.items.slice());
    });
  }
}

function compareItemsByID(lhs: Item, rhs: Item): number {
  if (lhs.id < rhs.id) {
    return -1;
  } else if (lhs.id === rhs.id) {
    return 0;
  } else {
    return 1;
  }
}