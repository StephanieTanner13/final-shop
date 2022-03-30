import { Component, OnInit } from '@angular/core';

import { Item } from './item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  //providers: [ItemService]
})
export class ItemsComponent implements OnInit {
  selectedItem: Item;
  
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.itemSelectedEvent.subscribe(
      (item: Item) => {
        this.selectedItem = item;
      }
    )
  }

}
