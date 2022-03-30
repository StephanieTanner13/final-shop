import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';

import { Item } from '../item.model';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  id: string;
  nativeWindow: any;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService : WindRefService
  ) {}

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.item = this.itemService.getItem(this.id);
      }
          );

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    if (this.item.image) {
      this.nativeWindow.open(this.item.image);
    }
  }

  onDelete() {
    this.itemService.deleteItem(this.item);
    this.router.navigate(['/items']);
  }
}
