import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[] = [];
  itemId: string = '';
  private subscription: Subscription;

  constructor(private itemService: ItemService) {}

  ngOnInit(){
    this.itemService.itemChangedEvent.subscribe((items: Item[]) => {
      this.items = items.slice();
    });

    this.subscription = this.itemService.itemListChangedEvent.subscribe(
      (itemsList: Item[]) => {
        this.items = itemsList;
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
